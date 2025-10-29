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

    public IngredienteController(IngredienteService ingredienteService){
        this.ingredienteService = ingredienteService;
    }

    @PostMapping
    public ResponseEntity<Ingrediente> criarIngrediente( @RequestBody Ingrediente ingrediente){
        return ResponseEntity.ok(ingredienteService.saveIngrediente(ingrediente));
    }

    @GetMapping
    public ResponseEntity<List<Ingrediente>> findAll(){
        return ResponseEntity.ok(ingredienteService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Ingrediente>> findById(Long id){
        try{
            return ResponseEntity.ok(ingredienteService.findById(id));
        }catch (EntityNotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping
    public ResponseEntity<Optional<Ingrediente>> updateIngrediente(@PathVariable Long id,  @RequestBody Ingrediente ingrediente){
        try{
            return ResponseEntity.ok(ingredienteService.updateIngrediente(ingrediente, id));
        }catch (EntityNotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping
    public ResponseEntity<Optional<Ingrediente>> deleteIngrediente(@PathVariable Long id){
        try{
            ingredienteService.deleteIngrediente(id);
            return ResponseEntity.noContent().build();
        }catch (EntityNotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }

}