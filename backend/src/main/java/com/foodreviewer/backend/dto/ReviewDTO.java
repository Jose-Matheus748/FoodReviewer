package com.foodreviewer.backend.dto;

import com.foodreviewer.backend.Entity.Review;

public record ReviewDTO(
        Long id,
        String comentario,
        int nota,
        String usuarioNome
) {
    public static ReviewDTO fromEntity(Review review) {
        return new ReviewDTO(
                review.getId(),
                review.getComentario(),
                review.getNota(),
                review.getUsuario() != null ? review.getUsuario().getUsername() : "Usuário Anônimo"
        );
    }
}
