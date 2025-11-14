package com.foodreviewer.backend.services;

import com.foodreviewer.backend.Entity.Ingrediente;
import com.foodreviewer.backend.repositories.IngredienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IngredienteService {

    @Autowired
    private IngredienteRepository ingredienteRepository;

    public List<Ingrediente> findAll() {
        return ingredienteRepository.findAll();
    }

    public Optional<Ingrediente> findById(Long id) {
        return ingredienteRepository.findById(id);
    }

    //Adicionando busca por nome do ingrediente
    public Optional<Ingrediente> findByNome(String nome) {
        return ingredienteRepository.findByNome(nome);
    }

    public Ingrediente saveIngrediente(Ingrediente ingrediente) {
        if (!ingredienteRepository.existsByNome(ingrediente.getNome())) {
            return ingredienteRepository.save(ingrediente);
        }
        return ingredienteRepository.findByNome(ingrediente.getNome()).orElseThrow(() ->
                new RuntimeException("Ingrediente já cadastrado e não encontrado ao recuperar."));
    }

    public void deleteIngrediente(Long id) {
        ingredienteRepository.deleteById(id);
    }
}
