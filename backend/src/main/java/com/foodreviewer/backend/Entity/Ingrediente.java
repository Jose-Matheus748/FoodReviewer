package com.foodreviewer.backend.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

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

    @NotBlank(message = "Nome não pode estar em branco")
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


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public List<Produto> getProdutos() {
        return produtos;
    }

    public void setProdutos(List<Produto> produtos) {
        this.produtos = produtos;
    }

    public List<Alergenico> getAlergenicos() {
        return alergenicos;
    }

    public void setAlergenicos(List<Alergenico> alergenicos) {
        this.alergenicos = alergenicos;
    }
}

