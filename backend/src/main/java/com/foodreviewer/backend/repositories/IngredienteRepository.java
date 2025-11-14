package com.foodreviewer.backend.repositories;

import com.foodreviewer.backend.Entity.Ingrediente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IngredienteRepository extends JpaRepository<Ingrediente, Long> {
    boolean existsByNome(String nome);

    Optional<Ingrediente> findByNome(String nome);
}
