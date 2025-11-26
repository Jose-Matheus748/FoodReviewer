package com.foodreviewer.backend.dto;

import com.foodreviewer.backend.Entity.UserRole;
import com.foodreviewer.backend.Entity.Usuario;

public record UsuarioDTO(
        Long id,
        String apelido,
        String email,
        UserRole role
) {
    public static UsuarioDTO fromEntity(Usuario usuario) {
        return new UsuarioDTO(
                usuario.getId(),
                usuario.getUsername(),
                usuario.getEmail(),
                usuario.getRole()
        );
    }
}