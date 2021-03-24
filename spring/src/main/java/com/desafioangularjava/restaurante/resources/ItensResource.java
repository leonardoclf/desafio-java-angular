package com.desafioangularjava.restaurante.resources;


import com.desafioangularjava.restaurante.model.Item;
import com.desafioangularjava.restaurante.repository.Itens;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api
@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api/itens")
public class ItensResource {

    @Autowired
    private Itens itensRepository;

    @ApiOperation("Coleta todos os itens do menu")
    @GetMapping
    public ResponseEntity<List<Item>> getAll() {
        List<Item> itens = itensRepository.findAll();
        return new ResponseEntity<>(itens, HttpStatus.OK);
    }

    @ApiOperation("Adiciona novo pedido ao menu")
    @PostMapping
    public ResponseEntity<Item> save(@RequestBody Item item){
        itensRepository.save(item);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }


}
