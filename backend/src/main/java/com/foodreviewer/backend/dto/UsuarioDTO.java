package com.foodreviewer.backend.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class UsuarioDTO {

    @Id
    @GeneratedValue
    private Long id;

    @NotBlank(message = "Username não pode ficar em branco")
    private String apelido;

    @Email
    @Column(nullable = false, unique = true)
    private String email;

    public UsuarioDTO() {
    }

    public UsuarioDTO(Long id, String apelido, String email) {
        this.id = id;
        this.apelido = apelido;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getApelido() {
           return apelido;
    }

    public void setApelido(String apelido) {
        this.apelido = apelido;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
