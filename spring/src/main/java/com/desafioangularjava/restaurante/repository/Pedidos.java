package com.desafioangularjava.restaurante.repository;

import com.desafioangularjava.restaurante.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;


public interface Pedidos extends JpaRepository<Pedido, Long> {
    List<Pedido> findAllByMesa(int mesa);
}
