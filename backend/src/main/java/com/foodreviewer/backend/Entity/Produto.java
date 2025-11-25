package com.foodreviewer.backend.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.math.BigDecimal;
import java.util.ArrayList;
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

    @DecimalMin("0.01")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal preco;

    private String tipo;

    @DecimalMin("0.01")
    @Column(precision = 10, scale = 2)
    private BigDecimal pesoGramas;

    @Column(precision = 10, scale = 2)
    private BigDecimal densidade;

    @CreationTimestamp
    @Column(name = "data_cadastro", updatable = false)
    private LocalDateTime dataCadastro;

    // tabela nutricional
    @OneToOne(mappedBy = "produto", cascade = CascadeType.ALL)
    private TabelaNutricional tabelaNutricional;

    // ingredientes(relaçao N:N)
    @ManyToMany
    @JoinTable(
            name = "produto_ingrediente",
            joinColumns = @JoinColumn(name = "produto_id"),
            inverseJoinColumns = @JoinColumn(name = "ingrediente_id")
    )
    private List<Ingrediente> ingredientes = new ArrayList<>();

    // -------- ALERGÊNICOS --------
    @ElementCollection
    private List<String> alergenicos = new ArrayList<>();

    // imagem
    @Lob
    @Basic(fetch = FetchType.LAZY)
    @JsonIgnore
    private byte[] imagem;

    // reviews do produto
    @OneToMany(mappedBy = "produto", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Review> reviews = new ArrayList<>();

    @Column(name = "average_rating", precision = 3, scale = 2)
    private BigDecimal averageRating = BigDecimal.ZERO;

    public void addIngrediente(Ingrediente ingrediente) {
        this.ingredientes.add(ingrediente);
    }

    public void removeIngrediente(Ingrediente ingrediente) {
        this.ingredientes.remove(ingrediente);
    }
}
