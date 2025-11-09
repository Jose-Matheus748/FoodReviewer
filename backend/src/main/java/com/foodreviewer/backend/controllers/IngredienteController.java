package com.foodreviewer.backend.controllers;

import com.foodreviewer.backend.Entity.Ingrediente;
import com.foodreviewer.backend.services.IngredienteService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ingredientes")
public class IngredienteController {

    private final IngredienteService ingredienteService;

    public IngredienteController(IngredienteService ingredienteService) {
        this.ingredienteService = ingredienteService;
    }

    @GetMapping
    public ResponseEntity<List<Ingrediente>> listar() {
        return ResponseEntity.ok(ingredienteService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Ingrediente>> buscarPorId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(ingredienteService.findById(id));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Ingrediente> criarIngrediente(@Valid @RequestBody Ingrediente ingrediente) {
        return ResponseEntity.ok(ingredienteService.saveIngrediente(ingrediente));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirIngrediente(@PathVariable Long id) {
        ingredienteService.deleteIngrediente(id);
        return ResponseEntity.noContent().build();
    }
}
