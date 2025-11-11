package com.foodreviewer.backend.dto;

import com.foodreviewer.backend.Entity.Review;
import com.foodreviewer.backend.Entity.Produto;
import com.foodreviewer.backend.services.ReviewService;
import com.foodreviewer.backend.services.ProdutoService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

// DTO para retorno seguro (sem loops de serialização)
public record ReviewDTO(Long id, String comentario, int nota, String usuarioNome) {
    public static ReviewDTO fromEntity(Review r) {
        return new ReviewDTO(
                r.getId(),
                r.getComentario(),
                r.getNota(),
                r.getUsuario() != null ? r.getUsuario().getUsername() : "Usuário Anônimo"
        );
    }
}
