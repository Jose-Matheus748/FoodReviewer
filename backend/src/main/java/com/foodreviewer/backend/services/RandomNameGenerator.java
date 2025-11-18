package com.foodreviewer.backend.services;


import java.util.List;
import java.util.Random;

public class RandomNameGenerator {
    private static final List<String> ANIMAIS = List.of("Capivara", "Girafa", "Lhama", "Coruja", "Gato", "Camaleão", "Cachorro", "Tartaruga", "Pavão", "Morcego", "Panda", "Foca", "Pinguim", "Leão", "Tigre", "Pantera", "Lobo", "Pato", "Coelho");

    private static final List<String> Cores = List.of("Vermelho", "Laranja", "Amarelo", "Verde", "Azul", "Roxo", "Rosa", "Branco", "Preto", "Transparente", "Rosa", "Esverdeado", "Turquesa", "Roseado", "Alaranjado", "Avermelhado", "Arroxeado", "Amarelado", "Marrom", "Bege", "Anil", "Cinza", "Limão", "Pastel", "Bordô", "Ciano", "Prateado", "Dourado", "Escarlate", "Lilás");

    private static final Random random = new Random();


    public static String gerarUsername(){
        String animal = ANIMAIS.get(random.nextInt(ANIMAIS.size()));
        String cores = Cores.get(random.nextInt(Cores.size()));
        int numero = random.nextInt(1000);

        return animal + " " + cores + " " + numero;


    }
}
