package com.foodreviewer.backend.services;

import com.foodreviewer.backend.Entity.TabelaNutricional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.foodreviewer.backend.repositories.TabelaNutricionalRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TabelaNutricionalService {

    @Autowired
    private TabelaNutricionalRepository tabelaNutricionalRepository;

    public TabelaNutricional saveTabelaNutricional(TabelaNutricional tabelaNutricional){
        return tabelaNutricionalRepository.save(tabelaNutricional);
    }

    public List<TabelaNutricional> findAll(){
        return tabelaNutricionalRepository.findAll();
    }

    public Optional<TabelaNutricional> findById(Long id){
        return tabelaNutricionalRepository.findById(id);
    }

    public void deleteIngrediente(Long id){
        tabelaNutricionalRepository.deleteById(id);
    }
}
