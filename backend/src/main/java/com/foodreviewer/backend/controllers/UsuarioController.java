package com.foodreviewer.backend.controllers;

import com.foodreviewer.backend.Entity.Usuario;
import com.foodreviewer.backend.repositories.UsuarioRepository;
import org.springframework.web.bind.annotation.*;

@RestController
public class UsuarioController {
    private final UsuarioRepository usuarioRepository;

    public UsuarioController(UsuarioRepository usuarioRepository){
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/usuarioPost")
    public Usuario criarUsuario(@RequestBody Usuario usuario){
        System.out.println("Recebido Usuario: " + usuario.getEmail());
        return usuarioRepository.save(usuario);
    }

}