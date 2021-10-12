package net.javaguides.springboot.model;

import javax.persistence.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Inheritance
//@DiscriminatorColumn(name = "Order_Type")
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long orderId;

    @Column(name = "content")
    private String content;

    @Column(name = "status")
    private String status;

    public Order() {

    }

    public Order(String content, String status) {
        super();
        this.content = content;
        this.status = status;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public long getId() {
        return orderId;
    }

    public void setId(long id) {
        this.orderId = id;
    }
}

