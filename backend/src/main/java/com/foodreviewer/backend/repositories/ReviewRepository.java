package com.foodreviewer.backend.repositories;

import com.foodreviewer.backend.Entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByProdutoId(Long produtoId);
}
