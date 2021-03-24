package com.desafioangularjava.restaurante.repository;

import com.desafioangularjava.restaurante.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Itens extends JpaRepository<Item, Long> {


}
