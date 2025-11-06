package com.foodreviewer.backend.controllers;

import com.foodreviewer.backend.Entity.Produto;
import com.foodreviewer.backend.services.ProdutoService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {
    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @PostMapping
    public ResponseEntity<Produto> criarProduto(
            @RequestParam("nome") String nome,
            @RequestParam(value = "descricao", required = false) String descricao,
            @RequestParam(value = "marca", required = false) String marca,
            @RequestParam("preco") BigDecimal preco,
            @RequestParam(value = "tipo", required = false) String tipo,
            @RequestParam(value = "pesoGramas", required = false) BigDecimal pesoGramas,
            @RequestParam(value = "densidade", required = false) BigDecimal densidade,
            @RequestParam(value = "imagem", required = false) MultipartFile imagem,
            @RequestParam(value = "ingredientes", required = false) List<String> ingredientes,
            @RequestParam(value = "alergenicos", required = false) List<String> alergenicos
    ) {
        Produto produto = new Produto();
        produto.setNome(nome);
        produto.setDescricao(descricao);
        produto.setMarca(marca);
        produto.setPreco(preco);
        produto.setTipo(tipo);
        produto.setPesoGramas(pesoGramas);
        produto.setDensidade(densidade);
        produto.setIngredientes(ingredientes);
        produto.setAlergenicos(alergenicos);

        try {
            if (imagem != null && !imagem.isEmpty()) {
                produto.setImagem(imagem.getBytes());
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
        System.out.println("IMAGEM RECEBIDA: " + (imagem != null ? imagem.getOriginalFilename() : "nula"));
        System.out.println("TAMANHO: " + (imagem != null ? imagem.getSize() : 0));

        Produto salvo = produtoService.saveProduto(produto);
        return ResponseEntity.ok(salvo);
    }


    @GetMapping
    public ResponseEntity<List<Produto>> findAll() {
        return ResponseEntity.ok(produtoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Produto>> findById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(produtoService.findById(id));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Optional<Produto>> updateProduto(@PathVariable Long id, @Valid @RequestBody Produto produto) {
        try {
            return ResponseEntity.ok(produtoService.updateProduto(produto, id));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduto(@PathVariable Long id){
        try{
            produtoService.deleteProduto(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }
}
