package com.foodreviewer.backend.dto;

public record UsuarioDTO(
        Long id,
        String apelido,
        String email
) {
    // Conversor de entidade → DTO
    public static UsuarioDTO fromEntity(com.foodreviewer.backend.Entity.Usuario usuario) {
        return new UsuarioDTO(
                usuario.getId(),
                usuario.getUsername(), // ou getApelido(), conforme o nome real do campo
                usuario.getEmail()
        );
    }
}
