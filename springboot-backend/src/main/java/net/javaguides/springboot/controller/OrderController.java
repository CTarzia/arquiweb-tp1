package net.javaguides.springboot.controller;

import java.util.HashMap;

import java.util.Map;

import net.javaguides.springboot.model.PickupOrder;
import net.javaguides.springboot.model.TableOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.Order;
import net.javaguides.springboot.repository.OrderRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/orders/")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    // get one order by id
    @GetMapping("/{orderid}")
    public ResponseEntity<Order> getTableOrder(@PathVariable Long orderid){
        Order order = orderRepository.findById(orderid)
                .orElseThrow(() -> new ResourceNotFoundException("Order not exist with id :" + orderid));
        return ResponseEntity.ok(order);
    }

    // create order
    @PostMapping("/table/{restoid}")
    public Order createTableOrder(@RequestBody TableOrder order, @PathVariable Long restoid) {
        order.setRestoId(restoid);
        return orderRepository.save(order);
    }

    @PostMapping("/pickup/{restoid}")
    public Order createPickupOrder(@RequestBody PickupOrder order, @PathVariable Long restoid) {
        order.setRestoId(restoid);
        return orderRepository.save(order);
    }

    // update order rest api

    @PutMapping("/{orderid}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long orderid, @RequestBody Order newOrder){
        Order order = orderRepository.findById(orderid)
                .orElseThrow(() -> new ResourceNotFoundException("Order not exist with id :" + orderid));

        order.setStatus(newOrder.getStatus());
        order.setContent(newOrder.getContent());

        Order updatedOrder = orderRepository.save(order);
        return ResponseEntity.ok(updatedOrder);
    }

    // delete order rest api
    @DeleteMapping("/{orderid}")
    public ResponseEntity<Map<String, Boolean>> deleteOrder(@PathVariable Long orderid){
        Order order = orderRepository.findById(orderid)
                .orElseThrow(() -> new ResourceNotFoundException("Order not exist with id :" + orderid));

        orderRepository.delete(order);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
