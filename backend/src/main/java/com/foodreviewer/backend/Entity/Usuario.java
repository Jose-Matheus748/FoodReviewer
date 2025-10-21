package com.foodreviewer.backend.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String username;

    @Email
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank
    private String senha;

    @CreationTimestamp
    @Column(name = "data_criacao", updatable = false)
    private LocalDateTime dataCriacao;

    public Usuario(){

    }

    public Usuario(Long id, String username, String email, String senha, LocalDateTime dataCriacao) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.senha = senha;
        this.dataCriacao = dataCriacao;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getuserName() {
        return username;
    }

    public void setuserName(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    // Getters e setters...
}
