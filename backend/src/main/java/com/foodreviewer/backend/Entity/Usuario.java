package com.foodreviewer.backend.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;


import java.time.LocalDateTime;
import java.util.Map;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Username não pode ficar em branco")
    private String username; // Seria bom corrigir isso de userName para apelido dps

    @Email
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank(message = "Senha não pode estar em branco")
    private String senha;

    @CreationTimestamp
    @Column(name = "data_criacao", updatable = false)
    private LocalDateTime dataCriacao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role = UserRole.USER;

    public Usuario(){
    }

    public Usuario(Long id, String username, String email, String senha, LocalDateTime dataCriacao, UserRole role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.senha = senha;
        this.dataCriacao = dataCriacao;
        this.role = role;
    }

    //vou deixar os gets e sets mas n precisa pois o @getters e @setters acima do construtor já fazem ele automaticamente
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getApelido() {
        return username;
    }

    public void setApelido(String apelido) {
        this.username = apelido;
    } //é importante que seja getUsername, e setUsername, com U maiusculo, pois da erro de leitura

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

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role){
        this.role = role;
    }

    // Getters e setters...
}
