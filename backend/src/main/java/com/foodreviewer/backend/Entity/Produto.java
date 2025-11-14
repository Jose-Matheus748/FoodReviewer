package com.foodreviewer.backend.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.annotations.CreationTimestamp;
import lombok.Getter;
import lombok.Setter;
import java.util.ArrayList;

import java.time.LocalDateTime;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "produtos")
@Getter
@Setter
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome não pode estar em branco")
    @Column(nullable = false, length = 100)
    private String nome;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(columnDefinition = "TEXT")
    private String marca;

    @DecimalMin(value = "0.01", message = "Valor não pode ser negativo")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal preco;

    @Column(nullable = true)
    private String tipo;

    @DecimalMin(value = "0.01", message = "Valor não pode ser negativo")
    @Column(nullable = true, precision = 10, scale = 2)
    private BigDecimal pesoGramas;

    @Column(precision = 10, scale = 2)
    private BigDecimal densidade;

    @Column(name = "data_cadastro", updatable = false)
    @CreationTimestamp
    private LocalDateTime dataCadastro;

    //relacionamento 1:1 com tabela nutricional
    @OneToOne(mappedBy = "produto", cascade = CascadeType.ALL)
    @JsonManagedReference
    private TabelaNutricional tabelaNutricional;

    //relacionamento n:n com ingredientes
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "produto_ingrediente",
            joinColumns = @JoinColumn(name = "produto_id"),
            inverseJoinColumns = @JoinColumn(name = "ingrediente_id")
    )
    @JsonManagedReference
    private List<Ingrediente> ingredientes;

    @ElementCollection
    private List<String> alergenicos;

    @Lob
    @Column(name = "imagem")
    @Basic(fetch = FetchType.LAZY)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private byte[] imagem;

    @OneToMany(mappedBy = "produto", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Review> reviews = new ArrayList<>();

    @Column(name = "average_rating", precision = 3, scale = 2)
    private BigDecimal averageRating = BigDecimal.ZERO;

    public Produto() {}

    public Produto(Long id, String nome, String descricao, String marca, BigDecimal preco,
                   String tipo, BigDecimal pesoGramas, BigDecimal densidade,
                   TabelaNutricional tabelaNutricional, List<Ingrediente> ingredientes) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.marca = marca;
        this.preco = preco;
        this.tipo = tipo;
        this.pesoGramas = pesoGramas;
        this.densidade = densidade;
        this.tabelaNutricional = tabelaNutricional;
        this.ingredientes = ingredientes;
    }

    //metoodos opcionais que o chat recomendou
    public void addIngrediente(Ingrediente ingrediente) {
        this.ingredientes.add(ingrediente);
    }

    public void removeIngrediente(Ingrediente ingrediente) {
        this.ingredientes.remove(ingrediente);
    }
}
