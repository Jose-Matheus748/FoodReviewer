package com.foodreviewer.backend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "ingredientes")
@Getter
@Setter
public class Ingrediente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome não pode estar em branco")
    @Column(unique = true, nullable = false)
    private String nome;

    @ManyToMany(mappedBy = "ingredientes")
    @JsonBackReference
    private List<Produto> produtos;

    public Ingrediente() {}

    public Ingrediente(String nome) {
        this.nome = nome;
    }
}
