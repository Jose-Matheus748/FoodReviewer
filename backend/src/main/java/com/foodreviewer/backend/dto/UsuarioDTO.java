package com.foodreviewer.backend.dto;

public class UsuarioDTO {

    private Long id;
    private String apelido;
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
