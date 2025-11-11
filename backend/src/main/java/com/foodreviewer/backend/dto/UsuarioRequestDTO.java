package com.foodreviewer.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UsuarioRequestDTO(
        @NotBlank(message = "Apelido não pode ficar em branco")
        String apelido,

        @Email(message = "E-mail inválido")
        @NotBlank(message = "E-mail é obrigatório")
        String email,

        @Size(min = 6, message = "A senha deve ter pelo menos 6 caracteres")
        String senha
) {}
