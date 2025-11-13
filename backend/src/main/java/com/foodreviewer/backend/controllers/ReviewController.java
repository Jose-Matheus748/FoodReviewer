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

    @PostMapping("/produto/{produtoId}")
    public ResponseEntity<?> criarReview(
            @PathVariable Long produtoId,
            @RequestBody ReviewRequest request
    ) {
        try {
            // ✅ 1. Buscar o produto
            Produto produto = produtoService.findById(produtoId)
                    .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado"));

            // ✅ 2. Verificar se o usuário está autenticado
            if (request.usuarioId() == null) {
                return ResponseEntity.status(401).body("Usuário não autenticado. Faça login para avaliar.");
            }

            Usuario usuario = usuarioRepository.findById(request.usuarioId())
                    .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));

            // ✅ 3. Impedir avaliações duplicadas (mesmo usuário + mesmo produto)
            boolean jaAvaliou = reviewService.existsByUsuarioAndProduto(usuario, produto);
            if (jaAvaliou) {
                return ResponseEntity.badRequest().body("Você já avaliou este produto.");
            }

            // ✅ 4. Criar a nova avaliação
            Review review = new Review();
            review.setProduto(produto);
            review.setUsuario(usuario);
            review.setNota(request.nota());
            review.setComentario(request.comentario());

            Review saved = reviewService.save(review);

            // ✅ 5. Atualizar a média das avaliações do produto
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
