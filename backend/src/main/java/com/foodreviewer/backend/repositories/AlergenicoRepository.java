package com.foodreviewer.backend.repositories;

import com.foodreviewer.backend.Entity.Alergenico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlergenicoRepository extends JpaRepository<Alergenico, Long> {
}
