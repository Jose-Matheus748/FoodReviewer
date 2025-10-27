package com.foodreviewer.backend.services;
import com.foodreviewer.backend.Entity.Produto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.foodreviewer.backend.repositories.ProdutoRepository;
import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public Produto saveProduto(Produto produto){
        return produtoRepository.save(produto);
    }

    public List<Produto> findAll(){
        return produtoRepository.findAll();
    }

    public Optional<Produto> findById(Long id){
        return produtoRepository.findById(id);
    }

    public void deleteProduto(Long id){
        produtoRepository.deleteById(id);
    }

    public Optional<Produto> updateProduto(Produto updateProduto, Long id){
        return Optional.of(produtoRepository.findById(id).map(produto -> {
            produto.setNome(updateProduto.getNome());
            produto.setMarca(updateProduto.getMarca());
            produto.setTipo(updateProduto.getTipo());
            produto.setPreco(updateProduto.getPreco());
            produto.setAlergenicos(updateProduto.getAlergenicos());
            produto.setDensidade(updateProduto.getDensidade());
            produto.setDescricao(updateProduto.getDescricao());
            produto.setDataCadastro(updateProduto.getDataCadastro());
            produto.setIngredientes(updateProduto.getIngredientes());
            produto.setPesoGramas(updateProduto.getPesoGramas());
            produto.setTabelaNutricional(updateProduto.getTabelaNutricional());
            return produtoRepository.save(produto);
        }).orElseThrow(()-> new RuntimeException("Produto não existe")));
    }
}
