package services;

import Entity.Ingrediente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repositories.IngredienteRepository;

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

    public Optional<Ingrediente> findById(Integer id){
        return ingredienteRepository.findById(id);
    }

    public void deleteIngrediente(Integer id){
        ingredienteRepository.deleteById(id);
    }
}
