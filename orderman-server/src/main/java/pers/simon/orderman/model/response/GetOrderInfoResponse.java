package pers.simon.orderman.model.response;

import pers.simon.orderman.model.entity.Commodity;
import pers.simon.orderman.model.entity.Order;
import pers.simon.orderman.model.request.GetOrderInfoRequest;

import java.util.List;

public class GetOrderInfoResponse {
    private List<Commodity> commodities;
    private Order order;

    public GetOrderInfoResponse() {}

    public List<Commodity> getCommodities() {
        return commodities;
    }

    public void setCommodities(List<Commodity> commodities) {
        this.commodities = commodities;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
}
