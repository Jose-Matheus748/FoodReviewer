package com.foodreviewer.backend.factory;

import com.foodreviewer.backend.Entity.Produto;
import com.foodreviewer.backend.Entity.Review;
import com.foodreviewer.backend.Entity.Usuario;

public class ReviewFactory {
    public static Review criarReview(String comentario, int nota, Usuario usuario, Produto produto) {
        if (nota < 1 || nota > 10) {
            throw new IllegalArgumentException("A nota deve estar entre 1 e 10");
        }

        return new Review(comentario, nota, usuario, produto);
    }
}
