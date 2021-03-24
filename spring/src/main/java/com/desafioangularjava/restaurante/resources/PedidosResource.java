package com.desafioangularjava.restaurante.resources;

import com.desafioangularjava.restaurante.model.Pedido;
import com.desafioangularjava.restaurante.repository.Pedidos;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Api
@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api/pedidos")
public class PedidosResource {

    @Autowired
    private Pedidos pedidosRepository;

    @ApiOperation("Coletar todos os pedidos em processamento")
    @GetMapping
    public ResponseEntity<List<Pedido>> getAll() {
        List<Pedido> pedidos = pedidosRepository.findAll();
        return new ResponseEntity<>(pedidos, HttpStatus.OK);
    }

    @ApiOperation("Retorna somente um pedido")
    @GetMapping(path = "/{id}")
    public ResponseEntity<Optional<Pedido>> getById(@PathVariable Long id){
        Optional<Pedido> pedido;
        try {
            pedido = pedidosRepository.findById(id);
            return new ResponseEntity<>(pedido, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @ApiOperation("Retorna somente um pedido")
    @GetMapping(path = "mesa/{mesa}")
    public ResponseEntity<Optional<List<Pedido>>> getByMesa(@PathVariable Integer mesa){
        Optional<List<Pedido>> pedido;
        try {
            pedido = Optional.ofNullable(pedidosRepository.findAllByMesa(mesa));
            return new ResponseEntity<>(pedido, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @ApiOperation("Cancelar um pedido pelo id")
    @PutMapping(path = "/mesa/cancelar-pedido/{id}")
    public ResponseEntity<Pedido> updateCancelar(@PathVariable Long id) {
        return pedidosRepository.findById(id)
                .map(pedido -> {
                    pedido.setStatus("cancelado");
                    pedidosRepository.save(pedido);
                    return ResponseEntity.ok().body(pedido);
                }).orElse(ResponseEntity.notFound().build());
    }

    @ApiOperation("Concluir um pedido pelo id")
    @PutMapping(path = "/mesa/concluir-pedido/{id}")
    public ResponseEntity<Pedido> updateConcluir(@PathVariable Long id) {
        return pedidosRepository.findById(id)
                .map(pedido -> {
                    pedido.setStatus("concluído");
                    pedidosRepository.save(pedido);
                    return ResponseEntity.ok().body(pedido);
                }).orElse(ResponseEntity.notFound().build());
    }

    @ApiOperation("Retorna somente um pedido")
    @PutMapping(path = "mesa/fechar-mesa/{mesa}")
    public void fecharMesa(@PathVariable Integer mesa){
        var pedidosMesa = pedidosRepository.findAllByMesa(mesa);
        pedidosMesa.forEach(pedido -> {
            if(pedido.getStatus().equals("novo") || pedido.getStatus().equals("concluído")) {
                pedido.setStatus("finalizado");
            }
        });
        pedidosRepository.saveAll(pedidosMesa);
    }


    @ApiOperation("Novo pedido feito pelo cliente")
    @PostMapping
    public ResponseEntity<Pedido> save(@RequestBody Pedido pedido){
        pedidosRepository.save(pedido);
        return new ResponseEntity<>(pedido, HttpStatus.OK);
    }

    @ApiOperation("Alterar um pedido")
    @PutMapping("mesa/alterar-pedido/{id}")
    public ResponseEntity<Pedido> alterarPedido(@PathVariable Long id, @RequestBody Pedido pedidoNovo) {
        return pedidosRepository.findById(id).map(pedido -> {
            pedido.setItem(pedidoNovo.getItem());
            pedido.setQuantidade(pedidoNovo.getQuantidade());
            pedido.setValor(pedidoNovo.getValor());
            Pedido pedidoAtual = pedidosRepository.save(pedido);
            return ResponseEntity.ok().body(pedidoAtual);
        }).orElse(ResponseEntity.notFound().build());
    }



    @ApiOperation("Exclui o pedido da lista")
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Optional<Pedido>> deleteById(@PathVariable Long id) {
        try {
            pedidosRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
