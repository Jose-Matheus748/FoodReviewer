package com.foodreviewer.backend.controllers;

import com.foodreviewer.backend.Entity.Review;
import com.foodreviewer.backend.Entity.Usuario;
import com.foodreviewer.backend.repositories.ReviewRepository;
import org.springframework.web.bind.annotation.*;

@RestController
public class ReviewController {
    private final ReviewRepository reviewRepository;

    public ReviewController(ReviewRepository reviewRepository){
        this.reviewRepository = reviewRepository;
    }

    @PostMapping("/reviewPost")
    public Review criarReview(@RequestBody Review review){
        System.out.println("Recebido Usuario: " + review.getComentario());
        return reviewRepository.save(review);
    }

}
