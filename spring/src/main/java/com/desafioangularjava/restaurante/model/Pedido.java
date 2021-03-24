package com.desafioangularjava.restaurante.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Getter
@Setter
@Entity
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String  item;
    private Integer quantidade;
    private Integer valor;
    private Integer mesa;
    private String  status;
}
