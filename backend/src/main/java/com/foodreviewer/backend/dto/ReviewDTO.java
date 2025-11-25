package com.foodreviewer.backend.dto;

import com.foodreviewer.backend.Entity.Review;

public record ReviewDTO(
        Long id,
        int nota,
        String comentario,
        Long usuarioId,
        String usuarioNome
) {
    public static ReviewDTO fromEntity(Review review) {
        return new ReviewDTO(
                review.getId(),
                review.getNota(),
                review.getComentario(),
                review.getUsuario() != null ? review.getUsuario().getId() : null,
                review.getUsuario().getApelido()
        );
    }
}
