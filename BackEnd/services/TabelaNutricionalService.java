package services;

import Entity.Ingrediente;
import Entity.TabelaNutricional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repositories.IngredienteRepository;
import repositories.TabelaNutricionalRepository;

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

    public Optional<TabelaNutricional> findById(Integer id){
        return tabelaNutricionalRepository.findById(id);
    }

    public void deleteIngrediente(Integer id){
        tabelaNutricionalRepository.deleteById(id);
    }
}
