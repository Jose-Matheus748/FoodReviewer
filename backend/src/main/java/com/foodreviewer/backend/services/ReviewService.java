package com.foodreviewer.backend.services;

import com.foodreviewer.backend.Entity.Review;
import com.foodreviewer.backend.repositories.ReviewRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @Transactional(readOnly = true)
    public List<Review> findByProdutoId(Long produtoId) {
        return reviewRepository.findByProdutoId(produtoId);
    }

    public Review save(Review review) {
        return reviewRepository.save(review);
    }
}
