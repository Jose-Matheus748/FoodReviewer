package com.foodreviewer.backend.Entity;

import jakarta.persistence.*;

import java.util.List;


//ingredientes é uma classe que a gente vai manter mas dps usa ela completa, por enquanto, os ingredientes de um produto
//vai ficar apenas como string na classe dele, vou deixar algumas coisas dessa classe inativa mas não comentar ela completamente
//para evitar conflito

@Entity
@Table(name = "ingredientes")
public class Ingrediente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String nome;

//    @ManyToMany(mappedBy = "ingredientes")
    @Transient
    private List<Produto> produtos;

    /*@ManyToMany
    @JoinTable(
            name = "ingrediente_alergenico",
            joinColumns = @JoinColumn(name = "ingrediente_id"),
            inverseJoinColumns = @JoinColumn(name = "alergenico_id")
    )*/
    @Transient
    private List<Alergenico> alergenicos;

    // Getters, setters, construtores
}

