package Entity;

import jakarta.persistence.*;

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

    private BigDecimal calorias;
    private BigDecimal proteinas;
    private BigDecimal carboidratos;
    private BigDecimal gordurasTotais;
    private BigDecimal gordurasSaturadas;
    private BigDecimal fibras;
    private BigDecimal sodio;
    private BigDecimal acucares;


    @JoinColumn(name = "outros", unique = false)
    private Map<String, Object> outros;

    public TabelaNutricional() {
    }

    public TabelaNutricional(Long id, Produto produto, BigDecimal calorias, BigDecimal proteinas, BigDecimal carboidratos, BigDecimal gordurasTotais, BigDecimal gordurasSaturadas,
                             BigDecimal fibras, BigDecimal sodio, BigDecimal acucares, Map<String, Object> outros) {
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

    public Map<String, Object> getOutros() {
        return outros;
    }

    public void setOutros(Map<String, Object> outros) {
        this.outros = outros;
    }

}
