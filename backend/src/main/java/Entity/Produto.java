package Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.CreationTimestamp;
import java.util.List;

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

    private String marca;

    @NotNull
    private BigDecimal preco;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoProduto tipo; // //deletar isso aqui
    //private String tipo; // ENUM: SOLIDO, LIQUIDO, PÓ

    private BigDecimal pesoGramas;

    private BigDecimal densidade;

    @Column(name = "data_cadastro", updatable = false)
    @CreationTimestamp
    private Timestamp dataCadastro;

    @OneToOne(mappedBy = "produto", cascade = CascadeType.ALL)
    private TabelaNutricional tabelaNutricional;

    private List<String> ingredientes; //add marca e ingrediente ao construtor

    private List<String> alergenicos; //add ao construtor

    public Produto() {
    }

    public Produto(Long id, String nome, String descricao, String marca, BigDecimal preco, TipoProduto tipo, BigDecimal pesoGramas, BigDecimal densidade, Timestamp dataCadastro, TabelaNutricional tabelaNutricional) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.marca = marca;
        this.preco = preco;
        this.tipo = tipo;
        this.pesoGramas = pesoGramas;
        this.densidade = densidade;
        this.dataCadastro = dataCadastro;
        this.tabelaNutricional = tabelaNutricional;
    }
}
