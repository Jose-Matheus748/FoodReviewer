package com.foodreviewer.backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProdutoController {
    @GetMapping("/icecream")
    public String Hello(){
        return "hello";
    }
}
