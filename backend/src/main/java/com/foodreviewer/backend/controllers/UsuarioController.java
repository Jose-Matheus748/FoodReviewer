package com.foodreviewer.backend.controllers;

import com.foodreviewer.backend.Entity.UserRole;
import com.foodreviewer.backend.Entity.Usuario;
import com.foodreviewer.backend.dto.UsuarioDTO;
import com.foodreviewer.backend.dto.LoginRequest; // Novo import
import com.foodreviewer.backend.repositories.UsuarioRepository;
import com.foodreviewer.backend.services.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService){
        this.usuarioService = usuarioService;
    }

    // Criar usuário normal
    @PostMapping
    public ResponseEntity<UsuarioDTO> criarUsuario(@Valid @RequestBody Usuario usuario){
        return ResponseEntity.ok(usuarioService.saveUsuario(usuario));
    }

    // Criar ADMIN (exclusivo)
    @PostMapping("/admin")
    public ResponseEntity<UsuarioDTO> criarAdmin(@Valid @RequestBody Usuario usuario) {
        usuario.setRole(UserRole.ADMIN); // força ADMIN
        return ResponseEntity.ok(usuarioService.saveUsuario(usuario));
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<UsuarioDTO> login(@Valid @RequestBody LoginRequest loginRequest) {
        return usuarioService.login(loginRequest.email(), loginRequest.senha())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(401).build());
    }
}
