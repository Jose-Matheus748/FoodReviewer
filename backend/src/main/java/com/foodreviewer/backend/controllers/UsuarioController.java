package com.foodreviewer.backend.controllers;

import com.foodreviewer.backend.Entity.Usuario;
import com.foodreviewer.backend.dto.UsuarioDTO;
import com.foodreviewer.backend.dto.LoginRequest; // Novo import
import com.foodreviewer.backend.repositories.UsuarioRepository;
import com.foodreviewer.backend.services.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios" )
public class UsuarioController {
    private UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService){
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public ResponseEntity<UsuarioDTO> criarUsuario(@Valid @RequestBody Usuario usuario){
        System.out.println("Recebido Usuario: " + usuario.getEmail());
        return ResponseEntity.ok(usuarioService.saveUsuario(usuario));
    }

    // Novo endpoint de login
    @PostMapping("/login")
    public ResponseEntity<UsuarioDTO> login(@Valid @RequestBody LoginRequest loginRequest) {
        return usuarioService.login(loginRequest.getEmail(), loginRequest.getSenha())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(401).build()); // 401 Unauthorized
    }
}