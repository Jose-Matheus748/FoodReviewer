package com.foodreviewer.backend.controllers;

import com.foodreviewer.backend.Entity.Review;
import com.foodreviewer.backend.Entity.Produto;
import com.foodreviewer.backend.dto.ReviewDTO;
import com.foodreviewer.backend.dto.ReviewRequest;
import com.foodreviewer.backend.services.ReviewService;
import com.foodreviewer.backend.services.ProdutoService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {

    private final ReviewService reviewService;
    private final ProdutoService produtoService;

    public ReviewController(ReviewService reviewService, ProdutoService produtoService) {
        this.reviewService = reviewService;
        this.produtoService = produtoService;
    }

    @GetMapping("/produto/{produtoId}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByProduto(@PathVariable Long produtoId) {
        try {
            List<ReviewDTO> dtos = reviewService.findByProdutoId(produtoId)
                    .stream()
                    .map(ReviewDTO::fromEntity)
                    .toList();

            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/produto/{produtoId}")
    public ResponseEntity<ReviewDTO> criarReview(
            @PathVariable Long produtoId,
            @RequestBody ReviewRequest request
    ) {
        try {
            Produto produto = produtoService.findById(produtoId)
                    .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado"));

            Review review = new Review();
            review.setProduto(produto);
            review.setNota(request.nota());
            review.setComentario(request.comentario());

            //futuramente a gente pode pode associar o usuário autenticado
            // review.setUsuario(usuarioRepository.findById(request.usuarioId()).orElse(null));

            // Salvar a avaliação
            Review saved = reviewService.save(review);

            List<Review> todasReviews = reviewService.findByProdutoId(produtoId);
            double media = todasReviews.stream()
                    .mapToInt(Review::getNota)
                    .average()
                    .orElse(0.0);

            produto.setAverageRating(BigDecimal.valueOf(media / 2));
            produtoService.saveProduto(produto);

            // Retornar DTO para o front
            return ResponseEntity.ok(ReviewDTO.fromEntity(saved));

        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
