package com.foodreviewer.backend.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
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
    @JsonIgnore // evita recursão Produto → Ingrediente → Produto
    private List<Produto> produtos = new ArrayList<>();

    public Ingrediente() {}

    public Ingrediente(String nome) {
        this.nome = nome;
    }
}
