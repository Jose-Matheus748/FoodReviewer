package com.foodreviewer.backend.dto;

import com.foodreviewer.backend.Entity.Usuario;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class UsuarioDTO {

    private Long id;

    @NotBlank(message = "Apelido não pode ficar em branco")
    private String apelido;

    @Email(message = "Email inválido")
    @NotBlank(message = "Email é obrigatório")
    private String email;

    public UsuarioDTO() {}

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

    public static UsuarioDTO toDTO(Usuario usuario) {
        return new UsuarioDTO(
                usuario.getId(),
                usuario.getApelido(),
                usuario.getEmail()
        );
    }

    public static Usuario toEntity(UsuarioDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setId(dto.getId());
        usuario.setApelido(dto.getApelido());
        usuario.setEmail(dto.getEmail());

        return usuario;
    }
}
