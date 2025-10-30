package com.foodreviewer.backend.controllers;

import com.foodreviewer.backend.Entity.TabelaNutricional;
import com.foodreviewer.backend.services.TabelaNutricionalService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tabelasNutricionais")
public class TabelaNutricionalController {

    private final TabelaNutricionalService tabelaNutricionalService;

    public TabelaNutricionalController(TabelaNutricionalService tabelaNutricionalService){
        this.tabelaNutricionalService = tabelaNutricionalService;
    }

    @PostMapping
    public ResponseEntity<TabelaNutricional> criarTabelaNutricional(@Valid @RequestBody TabelaNutricional tabelaNutricional){
        return ResponseEntity.ok(tabelaNutricionalService.saveTabelaNutricional(tabelaNutricional));
    }

    @GetMapping
    public ResponseEntity<List<TabelaNutricional>> findAll(){
        return ResponseEntity.ok(tabelaNutricionalService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<TabelaNutricional>> findById(Long id){
        try{
            return ResponseEntity.ok(tabelaNutricionalService.findById(id));
        }catch (EntityNotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping
    public ResponseEntity<Optional<TabelaNutricional>> updateTabelaNutricional(@PathVariable Long id, @Valid @RequestBody TabelaNutricional tabelaNutricional){
        try{
            return ResponseEntity.ok(tabelaNutricionalService.updateTabelaNutricional(tabelaNutricional, id));
        }catch (EntityNotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping
    public ResponseEntity<Optional<TabelaNutricional>> deleteTabelaNutricional(@PathVariable long id){
        try{
            tabelaNutricionalService.deleteTabelaNutricional(id);
            return ResponseEntity.noContent().build();
        }catch (EntityNotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }

}

