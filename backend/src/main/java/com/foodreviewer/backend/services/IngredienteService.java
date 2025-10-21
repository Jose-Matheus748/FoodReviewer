package com.foodreviewer.backend.services;

import com.foodreviewer.backend.Entity.Ingrediente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.foodreviewer.backend.repositories.IngredienteRepository;

import java.util.List;
import java.util.Optional;

@Service
public class IngredienteService {

    @Autowired
    private IngredienteRepository ingredienteRepository;

    public Ingrediente saveIngrediente(Ingrediente ingrediente){
        return ingredienteRepository.save(ingrediente);
    }

    public List<Ingrediente> findAll(){
        return ingredienteRepository.findAll();
    }

    public Optional<Ingrediente> findById(Long id){
        return ingredienteRepository.findById(id);
    }

    public void deleteIngrediente(Long id){
        ingredienteRepository.deleteById(id);
    }
}
