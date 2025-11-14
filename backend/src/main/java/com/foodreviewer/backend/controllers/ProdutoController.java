package com.foodreviewer.backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.foodreviewer.backend.Entity.Ingrediente;
import com.foodreviewer.backend.Entity.Produto;
import com.foodreviewer.backend.Entity.TabelaNutricional;
import com.foodreviewer.backend.services.ProdutoService;
import com.foodreviewer.backend.services.IngredienteService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoService produtoService;
    private final IngredienteService ingredienteService;
    private final ObjectMapper objectMapper = new ObjectMapper(); // usado para converter JSON

    public ProdutoController(ProdutoService produtoService, IngredienteService ingredienteService) {
        this.produtoService = produtoService;
        this.ingredienteService = ingredienteService;
    }

    // OPÇÃO 1 — Criação com imagem + JSON (multipart/form-data)
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Produto> criarProdutoComImagem(
            @RequestParam("nome") String nome,
            @RequestParam(value = "descricao", required = false) String descricao,
            @RequestParam(value = "marca", required = false) String marca,
            @RequestParam("preco") BigDecimal preco,
            @RequestParam(value = "tipo", required = false) String tipo,
            @RequestParam(value = "pesoGramas", required = false) BigDecimal pesoGramas,
            @RequestParam(value = "densidade", required = false) BigDecimal densidade,
            @RequestParam(value = "imagem", required = false) MultipartFile imagem,
            // ingredientes como JSON string: ex: '[{"nome":"Aveia"},{"nome":"Mel"}]'
            @RequestParam(value = "ingredientes", required = false) String ingredientesJson,
            @RequestParam(value = "alergenicos", required = false) List<String> alergenicos,
            @RequestParam(value = "tabelaNutricional", required = false) String tabelaNutricionalJson
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
            produto.setAlergenicos(alergenicos);

            // Ingredientes JSON -> lista de Ingrediente (persist ou reuse)
            if (ingredientesJson != null && !ingredientesJson.isEmpty()) {
                Ingrediente[] ingredientesArray = objectMapper.readValue(ingredientesJson, Ingrediente[].class);
                List<Ingrediente> ingredientesPersistidos = new ArrayList<>();

                for (Ingrediente ingr : ingredientesArray) {
                    Optional<Ingrediente> existente = ingredienteService.findByNome(ingr.getNome());
                    Ingrediente toAdd = existente.orElseGet(() -> ingredienteService.saveIngrediente(ingr));
                    ingredientesPersistidos.add(toAdd);
                }

                produto.setIngredientes(ingredientesPersistidos);
            }

            // Tabela nutricional JSON -> object
            if (tabelaNutricionalJson != null && !tabelaNutricionalJson.isEmpty()) {
                TabelaNutricional tabelaNutricional =
                        objectMapper.readValue(tabelaNutricionalJson, TabelaNutricional.class);
                tabelaNutricional.setProduto(produto);
                produto.setTabelaNutricional(tabelaNutricional);
            }

            // imagem
            if (imagem != null && !imagem.isEmpty()) {
                produto.setImagem(imagem.getBytes());
            }

            Produto salvo = produtoService.saveProduto(produto);
            return ResponseEntity.ok(salvo);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    // OPÇÃO 2 — Criação via JSON puro (sem imagem)
    @PostMapping(value = "/json", consumes = "application/json")
    public ResponseEntity<Produto> criarProdutoViaJson(@Valid @RequestBody Produto produto) {
        try {
            if (produto.getTabelaNutricional() != null) {
                produto.getTabelaNutricional().setProduto(produto);
            }

            // persiste/recupera ingredientes para evitar duplicados
            if (produto.getIngredientes() != null && !produto.getIngredientes().isEmpty()) {
                List<Ingrediente> persistidos = new ArrayList<>();
                for (Ingrediente ingr : produto.getIngredientes()) {
                    Optional<Ingrediente> existente = ingredienteService.findByNome(ingr.getNome());
                    persistidos.add(existente.orElseGet(() -> ingredienteService.saveIngrediente(ingr)));
                }
                produto.setIngredientes(persistidos);
            }

            Produto salvo = produtoService.saveProduto(produto);
            return ResponseEntity.ok(salvo);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    // endpoints restantes...
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
    public ResponseEntity<Produto> updateProduto(
            @PathVariable Long id,
            @Valid @RequestBody Produto produto
    ) {
        try {
            Optional<Produto> atualizado = produtoService.updateProduto(produto, id);
            return atualizado.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduto(@PathVariable Long id) {
        try {
            produtoService.deleteProduto(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Produto>> buscarPorNome(@RequestParam String nome) {
        List<Produto> produtos = produtoService.buscarPorNome(nome);
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/{id}/imagem")
    public ResponseEntity<byte[]> getImagem(@PathVariable Long id) {
        Produto produto = produtoService.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado"));

        if (produto.getImagem() == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity
                .ok()
                .header("Content-Type", "image/jpeg")
                .body(produto.getImagem());
    }
}
