package com.foodreviewer.backend.controllers;

import com.foodreviewer.backend.Entity.Review;
import com.foodreviewer.backend.Entity.Produto;
import com.foodreviewer.backend.services.ReviewService;
import com.foodreviewer.backend.services.ProdutoService;
import jakarta.persistence.EntityNotFoundException;
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

// DTO de entrada para criação de review
record ReviewRequest(String comentario, int nota, Long usuarioId) {}

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "http://localhost:3000") // ✅ necessário para o frontend local
public class ReviewController {

    private final ReviewService reviewService;
    private final ProdutoService produtoService; // ✅ adicionamos o ProdutoService

    public ReviewController(ReviewService reviewService, ProdutoService produtoService) {
        this.reviewService = reviewService;
        this.produtoService = produtoService;
    }

    // ✅ GET — Buscar todas as avaliações de um produto específico
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

    // ✅ POST — Criar uma nova review associada a um produto
    @PostMapping("/produto/{produtoId}")
    public ResponseEntity<ReviewDTO> criarReview(
            @PathVariable Long produtoId,
            @RequestBody ReviewRequest request
    ) {
        try {
            // Buscar o produto alvo
            Produto produto = produtoService.findById(produtoId)
                    .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado"));

            // Criar e popular a entidade Review
            Review review = new Review();
            review.setProduto(produto);
            review.setNota(request.nota());
            review.setComentario(request.comentario());

            // ⚙️ Aqui futuramente você pode associar o usuário autenticado
            // review.setUsuario(usuarioRepository.findById(request.usuarioId()).orElse(null));

            // Salvar a avaliação
            Review saved = reviewService.save(review);

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
