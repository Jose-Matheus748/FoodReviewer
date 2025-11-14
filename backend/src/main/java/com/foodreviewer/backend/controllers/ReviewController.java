package com.foodreviewer.backend.controllers;

import com.foodreviewer.backend.Entity.Review;
import com.foodreviewer.backend.Entity.Produto;
import com.foodreviewer.backend.Entity.Usuario;
import com.foodreviewer.backend.dto.ReviewDTO;
import com.foodreviewer.backend.dto.ReviewRequest;
import com.foodreviewer.backend.repositories.UsuarioRepository;
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
    private final UsuarioRepository usuarioRepository; // ✅ Adicione esta linha

    // ✅ Construtor para injeção
    public ReviewController(ReviewService reviewService, ProdutoService produtoService, UsuarioRepository usuarioRepository) {
        this.reviewService = reviewService;
        this.produtoService = produtoService;
        this.usuarioRepository = usuarioRepository;
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

    @GetMapping("/{id}")
    public ResponseEntity<ReviewDTO> getReviewById(@PathVariable Long id) {
        try {
            Review review = reviewService.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Avaliação não encontrada"));

            return ResponseEntity.ok(ReviewDTO.fromEntity(review));

        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<?> updateReview(
            @PathVariable Long reviewId,
            @RequestBody ReviewRequest request
    ) {
        try {
            Review review = reviewService.findById(reviewId)
                    .orElseThrow(() -> new EntityNotFoundException("Review não encontrada"));

            // Atualiza campos
            review.setComentario(request.comentario());
            review.setNota(request.nota());

            Review saved = reviewService.save(review);

            // Agora recalcula a média do produto
            Produto produto = review.getProduto();

            List<Review> todas = reviewService.findByProdutoId(produto.getId());
            double media = todas.stream()
                    .mapToInt(Review::getNota)
                    .average()
                    .orElse(0.0);

            // Lembre que sua nota vai até 10 — por isso divide por 2
            produto.setAverageRating(BigDecimal.valueOf(media / 2));
            produtoService.saveProduto(produto);

            return ResponseEntity.ok(ReviewDTO.fromEntity(saved));

        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<?> deleteReview(
            @PathVariable Long reviewId,
            @RequestParam(required = false) Long usuarioId // opcional: id do usuário que tenta deletar
    ) {
        try {
            // buscar review para verificar dono (opcional)
            Review review = reviewService.findById(reviewId)
                    .orElseThrow(() -> new EntityNotFoundException("Review não encontrada"));

            // Se quiser checar que só o dono pode deletar:
            if (usuarioId != null) {
                if (review.getUsuario() == null || !review.getUsuario().getId().equals(usuarioId)) {
                    return ResponseEntity.status(403).body("Você não tem permissão para excluir essa avaliação.");
                }
            }
            // chama service que deleta e recalcula média
            reviewService.deleteByIdAndRecalculate(reviewId);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Erro ao deletar avaliação");
        }
    }


    @PostMapping("/produto/{produtoId}")
    public ResponseEntity<?> criarReview(
            @PathVariable Long produtoId,
            @RequestBody ReviewRequest request
    ) {
        try {
            Produto produto = produtoService.findById(produtoId)
                    .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado"));

            if (request.usuarioId() == null) {
                return ResponseEntity.status(401).body("Usuário não autenticado. Faça login para avaliar.");
            }

            Usuario usuario = usuarioRepository.findById(request.usuarioId())
                    .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));

            // teste pra impedir avaliações duplicadas (mesmo usuário + mesmo produto)
            boolean jaAvaliou = reviewService.existsByUsuarioAndProduto(usuario, produto);
            if (jaAvaliou) {
                return ResponseEntity.badRequest().body("Você já avaliou este produto.");
            }

            //Cria a nova avaliação
            Review review = new Review();
            review.setProduto(produto);
            review.setUsuario(usuario);
            review.setNota(request.nota());
            review.setComentario(request.comentario());

            Review saved = reviewService.save(review);

            //atualiza a média das avaliações do produto
            List<Review> todasReviews = reviewService.findByProdutoId(produtoId);
            double media = todasReviews.stream()
                    .mapToInt(Review::getNota)
                    .average()
                    .orElse(0.0);

            produto.setAverageRating(BigDecimal.valueOf(media / 2));
            produtoService.saveProduto(produto);

            return ResponseEntity.ok(ReviewDTO.fromEntity(saved));

        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

}
