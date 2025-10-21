package com.foodreviewer.backend.services;

import com.foodreviewer.backend.Entity.Alergenico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.foodreviewer.backend.repositories.AlergenicoRepository;
import java.util.List;
import java.util.Optional;

@Service

public class AlergenicoService {

    @Autowired
    private AlergenicoRepository alergenicoRepository;

    public Alergenico saveAlergenico(Alergenico alergenico){
        return alergenicoRepository.save(alergenico);
    }

    public List<Alergenico> findAll(){
        return alergenicoRepository.findAll();
    }

    public Optional<Alergenico> findById(Long id){
        return alergenicoRepository.findById(id);
    }

    public void deleteAlergenico(Long id){
        alergenicoRepository.deleteById(id);
    }
}
