package pers.simon.orderman.model.request;

public class GetOrderInfoRequest {
    private String orderId;

    public GetOrderInfoRequest() {}

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }
}
