package Entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "alergenicos")
public class Alergenico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String nome;

    @ManyToMany(mappedBy = "alergenicos")
    private List<Ingrediente> ingredientes;

    public Alergenico(){

    }

    public Alergenico(Long id, String nome, List<Ingrediente> ingredientes) {
        this.id = id;
        this.nome = nome;
        this.ingredientes = ingredientes;
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

    public List<Ingrediente> getIngredientes() {
        return ingredientes;
    }

    public void setIngredientes(List<Ingrediente> ingredientes) {
        this.ingredientes = ingredientes;
    }
}
