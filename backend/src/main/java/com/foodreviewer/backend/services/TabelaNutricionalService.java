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

    public void deleteTabelaNutricional(Long id){
        tabelaNutricionalRepository.deleteById(id);
    }

    public Optional<TabelaNutricional> updateTabelaNutricional(TabelaNutricional updateTabelaNutricional, Long id){
        return Optional.of(tabelaNutricionalRepository.findById(id).map(tabelaNutricional -> {
            tabelaNutricional.setAcucares(updateTabelaNutricional.getAcucares());
            tabelaNutricional.setCalorias(updateTabelaNutricional.getCalorias());
            tabelaNutricional.setCarboidratos(updateTabelaNutricional.getCarboidratos());
            tabelaNutricional.setFibras(updateTabelaNutricional.getFibras());
            tabelaNutricional.setProduto(updateTabelaNutricional.getProduto());
            tabelaNutricional.setSodio(updateTabelaNutricional.getSodio());
            tabelaNutricional.setGordurasSaturadas(updateTabelaNutricional.getGordurasSaturadas());
            tabelaNutricional.setGordurasTotais(updateTabelaNutricional.getGordurasTotais());
            tabelaNutricional.setProteinas(updateTabelaNutricional.getProteinas());
            tabelaNutricional.setOutros(updateTabelaNutricional.getOutros());
            return tabelaNutricionalRepository.save(tabelaNutricional);
        }).orElseThrow(()-> new RuntimeException("Essa tabela nutricional não existe")));
    }
}
