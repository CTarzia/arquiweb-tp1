package net.javaguides.springboot.model;

import javax.persistence.*;

@Entity
@Table(name = "restaurant_tables")
public class RestaurantTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    // Es necesario poner Column? No lo pone automáticamente?
    // Puede ser que sea para especificar el nombre.
    @Column(name = "table_status")
    private Boolean status;

    @Column(name = "table_calling_server")
    private Boolean calling_server;

    /*
    Dejo esto acá pero hay que agregarlo cuando armemos el modelo para el restaurant
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="restaurant_id")
    private Restaurant restaurant;

     */

    public RestaurantTable() {

    }

    public RestaurantTable(Boolean status, Boolean calling_server) {
        super();
        this.status = status;
        this.calling_server = calling_server;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Boolean getCalling_server() {
        return calling_server;
    }

    public void setCalling_server(Boolean calling_server) {
        this.calling_server = calling_server;
    }

}
