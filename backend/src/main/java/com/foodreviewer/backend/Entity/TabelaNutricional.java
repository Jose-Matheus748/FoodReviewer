package com.foodreviewer.backend.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
@Getter
@Setter
@Entity
@Table(name = "tabela_nutricional")
public class TabelaNutricional {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "produto_id", unique = true)
    @JsonIgnore // evita loop
    private Produto produto;

    @NotNull @DecimalMin("0.00")
    private BigDecimal calorias;

    @NotNull @DecimalMin("0.00")
    private BigDecimal proteinas;

    @NotNull @DecimalMin("0.00")
    private BigDecimal carboidratos;

    @NotNull @DecimalMin("0.00")
    private BigDecimal gordurasTotais;

    @NotNull @DecimalMin("0.00")
    private BigDecimal gordurasSaturadas;

    @NotNull @DecimalMin("0.00")
    private BigDecimal fibras;

    @NotNull @DecimalMin("0.00")
    private BigDecimal sodio;

    @NotNull @DecimalMin("0.00")
    private BigDecimal acucares;

    @NotNull @DecimalMin("0.00")
    private BigDecimal outros;

    // Getters e setters omitidos por brevidade
}
