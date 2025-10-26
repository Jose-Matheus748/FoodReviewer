package com.foodreviewer.backend.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.CreationTimestamp;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

import java.math.BigDecimal;
import java.security.Timestamp;

@Entity
@Table(name = "produtos")
@Getter
@Setter
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nome;

    private String descricao;

    private String marca;

    private BigDecimal preco;


    private String tipo;
    /*@Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoProduto tipo; // //deletar isso aqui
    //private String tipo; // ENUM: SOLIDO, LIQUIDO, PÓ*/

    private BigDecimal pesoGramas;

    private BigDecimal densidade;

    @Column(name = "data_cadastro", updatable = false)
    @CreationTimestamp
    private LocalDateTime dataCadastro;
    /*    @Column(name = "data_cadastro", updatable = false)
    @CreationTimestamp
    private Timestamp dataCadastro;*/

    @OneToOne(mappedBy = "produto", cascade = CascadeType.ALL)
    private TabelaNutricional tabelaNutricional;

    @ElementCollection
    private List<String> ingredientes; //add marca e ingrediente ao construtor

    @ElementCollection
    private List<String> alergenicos; //add ao construtor

    public Produto() {
    }

    public Produto(Long id, String nome, String descricao, String marca, BigDecimal preco, String tipo, BigDecimal pesoGramas, BigDecimal densidade, TabelaNutricional tabelaNutricional) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.marca = marca;
        this.preco = preco;
        this.tipo = tipo;
        this.pesoGramas = pesoGramas;
        this.densidade = densidade;
        //this.dataCadastro = dataCadastro; tirei o dataCadastro daqui e dos argumentos, ele ta 100% cuidado pelo hibernate
        this.tabelaNutricional = tabelaNutricional;
    }

    public String getNome() {
        return nome;
    }

    public String getMarca() {
        return marca;
    }
}
