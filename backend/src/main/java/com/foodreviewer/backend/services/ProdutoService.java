package com.foodreviewer.backend.services;
import com.foodreviewer.backend.Entity.Produto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.foodreviewer.backend.repositories.ProdutoRepository;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional(readOnly = true)
    public Optional<Produto> findById(Long id) {
        Optional<Produto> produtoOpt = produtoRepository.findById(id);
        produtoOpt.ifPresent(produto -> {
            if (produto.getReviews() != null) produto.getReviews().size();
            if (produto.getIngredientes() != null) produto.getIngredientes().size();
        });
        return produtoOpt;
    }

    public void deleteProduto(Long id){
        produtoRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<Produto> buscarPorNome(String nome){
        return produtoRepository.findByNomeContainingIgnoreCase(nome);
    }

    @Transactional
    public Optional<Produto> updateProduto(Produto updateProduto, Long id){

        return Optional.of(
                produtoRepository.findById(id).map(produto -> {
                    //atributos normais
                    produto.setNome(updateProduto.getNome());
                    produto.setMarca(updateProduto.getMarca());
                    produto.setTipo(updateProduto.getTipo());
                    produto.setPreco(updateProduto.getPreco());
                    produto.setAlergenicos(updateProduto.getAlergenicos());
                    produto.setDensidade(updateProduto.getDensidade());
                    produto.setDescricao(updateProduto.getDescricao());
                    produto.setPesoGramas(updateProduto.getPesoGramas());

                    //ingredientes
                    produto.getIngredientes().clear();
                    if (updateProduto.getIngredientes() != null) {
                        produto.getIngredientes().addAll(updateProduto.getIngredientes());
                    }

                    // tabela nutricional
                    if (produto.getTabelaNutricional() != null && updateProduto.getTabelaNutricional() != null) {

                        var tabela = produto.getTabelaNutricional();
                        var nova = updateProduto.getTabelaNutricional();

                        tabela.setCalorias(nova.getCalorias());
                        tabela.setProteinas(nova.getProteinas());
                        tabela.setCarboidratos(nova.getCarboidratos());
                        tabela.setGordurasTotais(nova.getGordurasTotais());
                        tabela.setGordurasSaturadas(nova.getGordurasSaturadas());
                        tabela.setFibras(nova.getFibras());
                        tabela.setSodio(nova.getSodio());
                        tabela.setAcucares(nova.getAcucares());
                        tabela.setOutros(nova.getOutros());
                    }

                    // aq a gente nao atualiza as reviews pq isso é responsabilidade do ReviewService

                    return produtoRepository.save(produto);

                }).orElseThrow(() -> new RuntimeException("Produto não existe"))
        );
    }
}
