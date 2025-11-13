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
import java.util.List;

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
}
