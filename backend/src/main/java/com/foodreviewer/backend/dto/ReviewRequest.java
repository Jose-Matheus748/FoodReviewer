package com.foodreviewer.backend.dto;

// DTO de entrada para criação de review
public record ReviewRequest(String comentario, int nota, Long usuarioId) {}
