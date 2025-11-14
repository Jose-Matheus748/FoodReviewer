package com.foodreviewer.backend.services;

import com.foodreviewer.backend.Entity.Usuario;
import com.foodreviewer.backend.dto.UsuarioDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.foodreviewer.backend.repositories.UsuarioRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private UsuarioDTO toDto(Usuario usuario){
        return new UsuarioDTO(usuario.getId(), usuario.getUsername(), usuario.getEmail());
    }

    @Autowired
    private UsuarioRepository usuarioRepository;

    public UsuarioDTO saveUsuario(Usuario usuario){
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
    public Optional<UsuarioDTO> login(String email, String senha) {
        return usuarioRepository.findByEmail(email)
                // Comparação de senha simples (sem criptografia)
                .filter(usuario -> usuario.getSenha().equals(senha))
                .map(this::toDto);
    }
}
