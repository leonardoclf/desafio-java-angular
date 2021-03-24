package com.desafioangularjava.restaurante;

import com.desafioangularjava.restaurante.model.Item;
import com.desafioangularjava.restaurante.repository.Itens;
import org.apache.catalina.Store;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RestauranteApplication {

    public static void main(String[] args) {

        SpringApplication.run(RestauranteApplication.class, args);


    }



}
