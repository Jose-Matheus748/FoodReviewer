package com.foodreviewer.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ReviewRequest(
        @NotBlank(message = "Comentário não pode estar vazio")
        String comentario,

        @Min(1) @Max(5)
        int nota,

        @NotNull(message = "Usuário deve ser informado")
        Long usuarioId
) {}
