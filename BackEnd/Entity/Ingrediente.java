package Entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "ingredientes")
public class Ingrediente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String nome;

    @ManyToMany(mappedBy = "ingredientes")
    private List<Produto> produtos;

    @ManyToMany
    @JoinTable(
            name = "ingrediente_alergenico",
            joinColumns = @JoinColumn(name = "ingrediente_id"),
            inverseJoinColumns = @JoinColumn(name = "alergenico_id")
    )
    private List<Alergenico> alergenicos;

    public Ingrediente(){

    }

    public Ingrediente(Long id, String nome, List<Produto> produtos, List<Alergenico> alergenicos) {
        this.id = id;
        this.nome = nome;
        this.produtos = produtos;
        this.alergenicos = alergenicos;
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
