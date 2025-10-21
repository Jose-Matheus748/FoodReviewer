package com.foodreviewer.backend.Entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "alergenicos")
public class Alergenico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String nome;

    @ManyToMany(mappedBy = "alergenicos")
    private List<Ingrediente> ingredientes;

    // Getters, setters, construtores
}

