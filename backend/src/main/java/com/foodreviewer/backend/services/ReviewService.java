package com.foodreviewer.backend.services;

import com.foodreviewer.backend.Entity.Produto;
import com.foodreviewer.backend.Entity.Review;
import com.foodreviewer.backend.Entity.Usuario;
import com.foodreviewer.backend.factory.ReviewFactory;
import com.foodreviewer.backend.repositories.ProdutoRepository;
import com.foodreviewer.backend.repositories.ReviewRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProdutoRepository produtoRepository;

    public ReviewService(ReviewRepository reviewRepository, ProdutoRepository produtoRepository) {
        this.reviewRepository = reviewRepository;
        this.produtoRepository = produtoRepository;
    }

    public boolean existsByUsuarioAndProduto(Usuario usuario, Produto produto) {
        return reviewRepository.existsByUsuarioAndProduto(usuario, produto);
    }


    @Transactional(readOnly = true)
    public List<Review> findByProdutoId(Long produtoId) {
        return reviewRepository.findByProduto_Id(produtoId);
    }

    @Transactional
    public Review saveForProduto(Long produtoId, String comentario, int nota, Usuario usuario) {
        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado"));

        // Criação via Factory
        Review review = ReviewFactory.criarReview(comentario, nota, usuario, produto);

        return reviewRepository.save(review);
    }

    @Transactional
    public Review save(Review review) {
        return reviewRepository.save(review);
    }

    public Optional<Review> findById(Long id) {
        return reviewRepository.findById(id);
    }

    @Transactional
    public void deleteByIdAndRecalculate(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new EntityNotFoundException("Review não encontrada"));

        Produto produto = review.getProduto();
        Long produtoId = produto.getId();

        reviewRepository.deleteById(reviewId);

        List<Review> restantes = reviewRepository.findByProduto_Id(produtoId);
        double media = restantes.stream()
                .mapToInt(Review::getNota)
                .average()
                .orElse(0.0);

        produto.setAverageRating(BigDecimal.valueOf(media / 2));

        produtoRepository.save(produto);
    }
}
