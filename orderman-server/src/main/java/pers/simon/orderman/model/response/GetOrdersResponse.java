package pers.simon.orderman.model.response;

import pers.simon.orderman.model.entity.Order;

import java.util.List;

public class GetOrdersResponse {
    private List<Order> orders;

    public GetOrdersResponse() {}

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }
}
