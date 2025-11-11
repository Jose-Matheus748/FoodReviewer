package com.foodreviewer.backend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "review")
@Getter
@Setter
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String comentario;

    @DecimalMin(value = "1")
    private int nota; // de 1 a 10

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "produto_id", nullable = false)
    @JsonBackReference
    private Produto produto;

    @CreationTimestamp
    @Column(name = "data_criacao", updatable = false)
    private LocalDateTime dataCriacao;

    public Review() {}

    public Review(String comentario, int nota, Usuario usuario, Produto produto) {
            this.comentario = comentario;
            this.nota = nota;
            this.usuario = usuario;
            this.produto = produto;
        }
     public static class ReviewBuilder{
        private String comentario;
        private int nota;
        private Usuario usuario;
        private Produto produto;

        public ReviewBuilder comentario(String Comentario){
            this.comentario = comentario;
            return this;
        }
        public ReviewBuilder nota(int nota){
            this.nota = nota;
            return this;
        }
        public ReviewBuilder usuario(Usuario usuario){
            this.usuario = usuario;
            return this;
        }
        public ReviewBuilder produto(Produto produto){
            this.produto = produto;
            return this;
        }

        public Review build() {
            Review review = new Review();
            review.setComentario(comentario);
            review.setNota(nota);
            review.setUsuario(usuario);
            review.setProduto(produto);
            return review;
        }
    }
}
