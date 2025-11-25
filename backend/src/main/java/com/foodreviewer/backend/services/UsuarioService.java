package com.foodreviewer.backend.services;

import com.foodreviewer.backend.Entity.UserRole;
import com.foodreviewer.backend.Entity.Usuario;
import com.foodreviewer.backend.dto.UsuarioDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.foodreviewer.backend.repositories.UsuarioRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UsuarioService {

    private UsuarioDTO toDto(Usuario usuario){
        return UsuarioDTO.fromEntity(usuario);
    }

    @Autowired
    private UsuarioRepository usuarioRepository;

    public UsuarioDTO saveUsuario(Usuario usuario){
        if (usuario.getRole() == null) {
            usuario.setRole(UserRole.USER);
        }
        if (usuario.getUsername() == null || usuario.getUsername().isBlank()) {
            usuario.setUsername(RandomNameGenerator.gerarUsername());
        }

        return toDto(usuarioRepository.save(usuario));
    }

    public List<UsuarioDTO> findAll(){
        return usuarioRepository.findAll()
                .stream()
                .map(this::toDto)
                .toList();
    }

    public Optional<UsuarioDTO> findById(Long id){
        return usuarioRepository.findById(id)
                .map(this::toDto);
    }

    public void deleteUsuario(Long id){
        usuarioRepository.deleteById(id);
    }

    public Optional<UsuarioDTO> updateUsuario(Usuario updateUsuario, Long id){
        return Optional.of(usuarioRepository.findById(id).map(usuario ->
        {
            usuario.setUsername(updateUsuario.getUsername());
            usuario.setEmail(updateUsuario.getEmail());
            usuario.setSenha(updateUsuario.getSenha());
            usuario.setDataCriacao(updateUsuario.getDataCriacao());
            return toDto(usuarioRepository.save(usuario));

        }).orElseThrow(() -> new RuntimeException("Usuário não existe")));
    }

    // método de login
    public ResponseEntity<?> login(String email, String senha) {

        return usuarioRepository.findByEmail(email)
                .map(usuario -> {
                    if (!usuario.getSenha().equals(senha)) {
                        return ResponseEntity.status(401).body(Map.of(
                                "message", "Senha incorreta"
                        ));
                    }

                    return ResponseEntity.ok(UsuarioDTO.fromEntity(usuario));
                })
                .orElseGet(() -> ResponseEntity.status(404).body(Map.of(
                        "message", "Usuário não encontrado"
                )));
    }
}
