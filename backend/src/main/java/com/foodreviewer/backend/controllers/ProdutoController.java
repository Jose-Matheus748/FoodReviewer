package com.foodreviewer.backend.controllers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.foodreviewer.backend.Entity.Ingrediente;
import com.foodreviewer.backend.Entity.Produto;
import com.foodreviewer.backend.Entity.TabelaNutricional;
import com.foodreviewer.backend.services.ProdutoService;
import com.foodreviewer.backend.services.IngredienteService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.*;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoService produtoService;
    private final IngredienteService ingredienteService;
    private final ObjectMapper objectMapper;

    public ProdutoController(ProdutoService produtoService, IngredienteService ingredienteService) {
        this.produtoService = produtoService;
        this.ingredienteService = ingredienteService;
        this.objectMapper = new ObjectMapper();
    }

    // ============================================================
    // CRIAÇÃO DE PRODUTO (multipart/form-data ✓)
    // ============================================================
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> criarProduto(
            @RequestParam("nome") String nome,
            @RequestParam(value = "descricao", required = false) String descricao,
            @RequestParam(value = "marca", required = false) String marca,
            @RequestParam("preco") BigDecimal preco,
            @RequestParam(value = "tipo", required = false) String tipo,
            @RequestParam(value = "pesoGramas", required = false) BigDecimal pesoGramas,
            @RequestParam(value = "densidade", required = false) BigDecimal densidade,
            @RequestParam(value = "ingredientes", required = false) String ingredientesJson,
            @RequestParam(value = "tabelaNutricional", required = false) String tabelaNutricionalJson,
            @RequestPart(value = "imagem", required = false) MultipartFile imagem
    ) {
        try {
            Produto produto = new Produto();
            produto.setNome(nome);
            produto.setDescricao(descricao);
            produto.setMarca(marca);
            produto.setPreco(preco);
            produto.setTipo(tipo);
            produto.setPesoGramas(pesoGramas);
            produto.setDensidade(densidade);

            // ============================================================
            // PROCESSAR INGREDIENTES (frontend envia somente nomes)
            // ============================================================
            if (ingredientesJson != null && !ingredientesJson.isBlank()) {

                List<Map<String, String>> ingredientesList =
                        objectMapper.readValue(ingredientesJson, new TypeReference<>() {});

                List<Ingrediente> resultado = new ArrayList<>();

                for (Map<String, String> ing : ingredientesList) {
                    String nomeIng = ing.get("nome");

                    Ingrediente ingrediente = ingredienteService
                            .findByNome(nomeIng)
                            .orElseGet(() -> ingredienteService.saveIngrediente(new Ingrediente(nomeIng)));

                    resultado.add(ingrediente);
                }

                produto.setIngredientes(resultado);
            }

            // ============================================================
            // TABELA NUTRICIONAL JSON
            // ============================================================
            if (tabelaNutricionalJson != null && !tabelaNutricionalJson.isBlank()) {
                TabelaNutricional tabela =
                        objectMapper.readValue(tabelaNutricionalJson, TabelaNutricional.class);

                tabela.setProduto(produto);
                produto.setTabelaNutricional(tabela);
            }

            // ============================================================
            // IMAGEM
            // ============================================================
            if (imagem != null && !imagem.isEmpty()) {
                produto.setImagem(imagem.getBytes());
            }

            Produto salvo = produtoService.saveProduto(produto);
            return ResponseEntity.ok(salvo);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Erro ao cadastrar produto: " + e.getMessage());
        }
    }

    // ============================================================
    // CRIAÇÃO POR JSON (sem imagem)
    // ============================================================
    @PostMapping(value = "/json", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> criarProdutoViaJson(@Valid @RequestBody Produto produto) {

        try {
            // Ingredientes enviados como nomes → buscar ou criar
            if (produto.getIngredientes() != null) {

                List<Ingrediente> tratados = new ArrayList<>();

                for (Ingrediente ing : produto.getIngredientes()) {
                    Ingrediente existente = ingredienteService
                            .findByNome(ing.getNome())
                            .orElseGet(() -> ingredienteService.saveIngrediente(new Ingrediente(ing.getNome())));

                    tratados.add(existente);
                }

                produto.setIngredientes(tratados);
            }

            if (produto.getTabelaNutricional() != null) {
                produto.getTabelaNutricional().setProduto(produto);
            }

            Produto salvo = produtoService.saveProduto(produto);
            return ResponseEntity.ok(salvo);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Erro ao cadastrar produto via JSON: " + e.getMessage());
        }
    }

    // ============================================================
    // CRUD BÁSICO
    // ============================================================

    @GetMapping
    public ResponseEntity<List<Produto>> findAll() {
        return ResponseEntity.ok(produtoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> findById(@PathVariable Long id) {
        return produtoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody Produto produto) {

        try {

            if (produto.getIngredientes() != null) {
                List<Ingrediente> tratados = new ArrayList<>();

                for (Ingrediente ing : produto.getIngredientes()) {
                    Ingrediente existe = ingredienteService
                            .findByNome(ing.getNome())
                            .orElseGet(() -> ingredienteService.saveIngrediente(new Ingrediente(ing.getNome())));

                    tratados.add(existe);
                }

                produto.setIngredientes(tratados);
            }

            if (produto.getTabelaNutricional() != null) {
                produto.getTabelaNutricional().setProduto(produto);
            }

            return produtoService.updateProduto(produto, id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Erro ao atualizar produto: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            produtoService.deleteProduto(id);
            return ResponseEntity.noContent().build();

        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Buscar por nome
    @GetMapping("/search")
    public ResponseEntity<List<Produto>> buscar(@RequestParam String nome) {
        return ResponseEntity.ok(produtoService.buscarPorNome(nome));
    }

    // Retornar imagem
    @GetMapping("/{id}/imagem")
    public ResponseEntity<byte[]> getImagem(@PathVariable Long id) {
        Produto produto = produtoService.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado"));

        if (produto.getImagem() == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok()
                .header("Content-Type", "image/jpeg")
                .body(produto.getImagem());
    }
}
