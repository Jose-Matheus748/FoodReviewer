package com.foodreviewer.backend.controllers;

import com.foodreviewer.backend.Entity.Alergenico;
import com.foodreviewer.backend.services.AlergenicoService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/alergenicos")
public class AlergenicoController {

    private final AlergenicoService alergenicoService;

    public AlergenicoController(AlergenicoService alergenicoService){
        this.alergenicoService = alergenicoService;
    }

    @PostMapping
    public ResponseEntity<Alergenico> criarAlergenico(@Valid @RequestBody Alergenico alergenico){
        return ResponseEntity.ok(alergenicoService.saveAlergenico(alergenico));
    }

    @GetMapping
    public ResponseEntity<List<Alergenico>> findAll(){
        return ResponseEntity.ok(alergenicoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Alergenico>> findById(Long id){
        try{
            return ResponseEntity.ok(alergenicoService.findById(id));
        }catch (EntityNotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping
    public ResponseEntity<Optional<Alergenico>> updateAlergenico(@PathVariable Long id, @Valid @RequestBody Alergenico alergenico){
        try{
            return ResponseEntity.ok(alergenicoService.updateAlergenico(alergenico, id));
        }catch (EntityNotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping
    public ResponseEntity<Optional<Alergenico>> deleteAlergenico(@PathVariable Long id){
        try{
            alergenicoService.deleteAlergenico(id);
            return ResponseEntity.noContent().build();
        }catch (EntityNotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }

}
