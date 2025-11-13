package com.foodreviewer.backend.repositories;

import com.foodreviewer.backend.Entity.Produto;
import com.foodreviewer.backend.Entity.Review;
import com.foodreviewer.backend.Entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    boolean existsByUsuarioAndProduto(Usuario usuario, Produto produto);
    List<Review> findByProduto_Id(Long produtoId);
}
