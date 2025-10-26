package com.foodreviewer.backend.controllers;

import com.foodreviewer.backend.Entity.Produto;
import com.foodreviewer.backend.repositories.ProdutoRepository;
import org.springframework.web.bind.annotation.*;

@RestController
public class ProdutoController {
    private final ProdutoRepository produtoRepository;

    public ProdutoController(ProdutoRepository produtoRepository){
        this.produtoRepository = produtoRepository;
    }

    @PostMapping("/produto")
    public Produto criarProduto(@RequestBody Produto produto) {
        System.out.println("Recebido produto: " + produto.getNome());
        System.out.println("Da marca: " + produto.getMarca());
        return produtoRepository.save(produto);
    }

    //@GetMapping("/icecream")

}
