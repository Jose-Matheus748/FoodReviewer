package com.foodreviewer.backend.controllers;

import com.foodreviewer.backend.Entity.Review;
import com.foodreviewer.backend.services.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// DTO para retorno seguro (sem loops de serialização)
record ReviewDTO(Long id, String comentario, int nota, String usuarioNome) {
    static ReviewDTO fromEntity(Review r) {
        return new ReviewDTO(
                r.getId(),
                r.getComentario(),
                r.getNota(),
                r.getUsuario() != null ? r.getUsuario().getUsername() : "Usuário Anônimo"
        );
    }
}

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "http://localhost:3000") // ✅ libera acesso do front local
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // ✅ Endpoint que o front consome
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

    // ✅ Criação de nova review
    @PostMapping
    public ResponseEntity<ReviewDTO> createReview(@RequestBody Review review) {
        try {
            Review saved = reviewService.save(review);
            ReviewDTO dto = ReviewDTO.fromEntity(saved);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
