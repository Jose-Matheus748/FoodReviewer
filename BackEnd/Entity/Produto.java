package Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.security.Timestamp;

@Entity
@Table(name = "produtos")
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nome;

    private String descricao;

    @NotNull
    private BigDecimal preco;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoProduto tipo; // ENUM: SOLIDO, LIQUIDO

    private BigDecimal pesoGramas;

    private BigDecimal densidade;

    @Column(name = "data_cadastro", updatable = false)
    @CreationTimestamp
    private Timestamp dataCadastro;

    @OneToOne(mappedBy = "produto", cascade = CascadeType.ALL)
    private TabelaNutricional tabelaNutricional;

    public Produto() {
    }

    public Produto(Long id, String nome, String descricao, BigDecimal preco, TipoProduto tipo, BigDecimal pesoGramas, BigDecimal densidade, Timestamp dataCadastro, TabelaNutricional tabelaNutricional) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.tipo = tipo;
        this.pesoGramas = pesoGramas;
        this.densidade = densidade;
        this.dataCadastro = dataCadastro;
        this.tabelaNutricional = tabelaNutricional;
    }

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

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

    public TipoProduto getTipo() {
        return tipo;
    }

    public void setTipo(TipoProduto tipo) {
        this.tipo = tipo;
    }

    public BigDecimal getPesoGramas() {
        return pesoGramas;
    }

    public void setPesoGramas(BigDecimal pesoGramas) {
        this.pesoGramas = pesoGramas;
    }

    public BigDecimal getDensidade() {
        return densidade;
    }

    public void setDensidade(BigDecimal densidade) {
        this.densidade = densidade;
    }

    public Timestamp getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(Timestamp dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public TabelaNutricional getTabelaNutricional() {
        return tabelaNutricional;
    }

    public void setTabelaNutricional(TabelaNutricional tabelaNutricional) {
        this.tabelaNutricional = tabelaNutricional;
    }
}
