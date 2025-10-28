package com.foodreviewer.backend.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;

import java.math.BigDecimal;
import java.util.Map;

@Entity
@Table(name = "tabela_nutricional")
public class TabelaNutricional {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "produto_id", unique = true)
    private Produto produto;

    @NotBlank(message = "Valor não pode estar em branco")
    @DecimalMin(value = "0.01", message = "Valor não pode ser negativo")
    @Column(nullable = false, precision = 10,scale = 2)
    private BigDecimal calorias;

    @NotBlank(message = "Valor não pode estar em branco")
    @DecimalMin(value = "0.01", message = "Valor não pode ser negativo")
    @Column(nullable = false, precision = 10,scale = 2)
    private BigDecimal proteinas;

    @NotBlank(message = "Valor não pode estar em branco")
    @DecimalMin(value = "0.01", message = "Valor não pode ser negativo")
    @Column(nullable = false, precision = 10,scale = 2)
    private BigDecimal carboidratos;

    @NotBlank(message = "Valor não pode estar em branco")
    @DecimalMin(value = "0.01", message = "Valor não pode ser negativo")
    @Column(nullable = false, precision = 10,scale = 2)
    private BigDecimal gordurasTotais;

    @NotBlank(message = "Valor não pode estar em branco")
    @DecimalMin(value = "0.01", message = "Valor não pode ser negativo")
    @Column(nullable = false, precision = 10,scale = 2)
    private BigDecimal gordurasSaturadas;

    @NotBlank(message = "Valor não pode estar em branco")
    @DecimalMin(value = "0.01", message = "Valor não pode ser negativo")
    @Column(nullable = false, precision = 10,scale = 2)
    private BigDecimal fibras;

    @NotBlank(message = "Valor não pode estar em branco")
    @DecimalMin(value = "0.01", message = "Valor não pode ser negativo")
    @Column(nullable = false, precision = 10,scale = 2)
    private BigDecimal sodio;

    @NotBlank(message = "Valor não pode estar em branco")
    @DecimalMin(value = "0.01", message = "Valor não pode ser negativo")
    @Column(nullable = false, precision = 10,scale = 2)
    private BigDecimal acucares;

    @NotBlank(message = "Valor não pode estar em branco")
    @DecimalMin(value = "0.01", message = "Valor não pode ser negativo")
    @Column(nullable = false, precision = 10,scale = 2)
    private BigDecimal outros;

    /*@JoinColumn(name = "outros", unique = false)
    private Map<String, Object> outros; */ //deletando pq deu muitos erros

    public TabelaNutricional() {
    }

    public TabelaNutricional(Long id, Produto produto, BigDecimal calorias, BigDecimal proteinas, BigDecimal carboidratos, BigDecimal gordurasTotais, BigDecimal gordurasSaturadas,
                             BigDecimal fibras, BigDecimal sodio, BigDecimal acucares, BigDecimal outros) {
        this.id = id;
        this.produto = produto;
        this.calorias = calorias;
        this.proteinas = proteinas;
        this.carboidratos = carboidratos;
        this.gordurasTotais = gordurasTotais;
        this.gordurasSaturadas = gordurasSaturadas;
        this.fibras = fibras;
        this.sodio = sodio;
        this.acucares = acucares;
        this.outros = outros;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public BigDecimal getCalorias() {
        return calorias;
    }

    public void setCalorias(BigDecimal calorias) {
        this.calorias = calorias;
    }

    public BigDecimal getProteinas() {
        return proteinas;
    }

    public void setProteinas(BigDecimal proteinas) {
        this.proteinas = proteinas;
    }

    public BigDecimal getCarboidratos() {
        return carboidratos;
    }

    public void setCarboidratos(BigDecimal carboidratos) {
        this.carboidratos = carboidratos;
    }

    public BigDecimal getGordurasTotais() {
        return gordurasTotais;
    }

    public void setGordurasTotais(BigDecimal gordurasTotais) {
        this.gordurasTotais = gordurasTotais;
    }

    public BigDecimal getGordurasSaturadas() {
        return gordurasSaturadas;
    }

    public void setGordurasSaturadas(BigDecimal gordurasSaturadas) {
        this.gordurasSaturadas = gordurasSaturadas;
    }

    public BigDecimal getFibras() {
        return fibras;
    }

    public void setFibras(BigDecimal fibras) {
        this.fibras = fibras;
    }

    public BigDecimal getSodio() {
        return sodio;
    }

    public void setSodio(BigDecimal sodio) {
        this.sodio = sodio;
    }

    public BigDecimal getAcucares() {
        return acucares;
    }

    public void setAcucares(BigDecimal acucares) {
        this.acucares = acucares;
    }

    public BigDecimal getOutros() {
        return outros;
    }

    public void setOutros(BigDecimal outros) {
        this.outros = outros;
    }

}

