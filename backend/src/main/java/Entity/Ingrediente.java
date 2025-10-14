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

    // Getters, setters, construtores
}

