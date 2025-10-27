package com.foodreviewer.backend.services;

import com.foodreviewer.backend.Entity.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.foodreviewer.backend.repositories.ReviewRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public Review saveReview(Review review){
        return reviewRepository.save(review);
    }

    public List<Review> findAll(){
        return reviewRepository.findAll();
    }

    public Optional<Review> findById(Long id){
        return reviewRepository.findById(id);
    }

    public void deleteReview(Long id){
        reviewRepository.deleteById(id);
    }

    public Optional<Review> updateReview(Review updateReview , Long id){
        return Optional.of(findById(id).map(review -> {
            review.setComentario(updateReview.getComentario());
            review.setNota(updateReview.getNota());
            review.setDataCriacao(updateReview.getDataCriacao());
            review.setProduto(updateReview.getProduto());
            review.setUsuario(updateReview.getUsuario());
            return reviewRepository.save(review);
        }).orElseThrow(() -> new RuntimeException("Review não existe")));
    }
}
