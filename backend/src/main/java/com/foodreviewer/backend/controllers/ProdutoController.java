package com.foodreviewer.backend.controllers;

import com.foodreviewer.backend.Entity.Produto;
import com.foodreviewer.backend.services.ProdutoService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {
    private ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @PostMapping
    public ResponseEntity<Produto> criarProduto(@RequestBody Produto produto) {
        System.out.println("Recebido produto: " + produto.getNome());
        System.out.println("Da marca: " + produto.getMarca());
        return ResponseEntity.ok(produtoService.saveProduto(produto));
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
    public ResponseEntity<Optional<Produto>> updateProduto(@PathVariable Long id, @RequestBody Produto produto) {
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
