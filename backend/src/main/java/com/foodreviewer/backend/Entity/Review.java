package com.foodreviewer.backend.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "Review")
@Getter
@Setter
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String comentario;

    @NotBlank(message = "Nota não pode estar vazia")
    @DecimalMin(value = "1")
    private int nota; //vale de 0 a 5,incremental de 0,5 pontos, ou seja, um int de 0 a 10

    @ManyToOne
    private Usuario usuario;

    @ManyToOne
    private Produto produto;

    @CreationTimestamp
    @Column(name = "data_criacao", updatable = false)
    private LocalDateTime dataCriacao;

    public Review(){

    }

    public Review(Long id, String comentario, int nota, Usuario usuario, Produto produto) {
        this.id = id;
        this.comentario = comentario;
        this.nota = nota;
        this.usuario = usuario;
        this.produto = produto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public int getNota() {
        return nota;
    }

    public void setNota(int nota) {
        this.nota = nota;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }


    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
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
