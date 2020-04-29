package pers.simon.orderman.model.request;

public class ChangeOrderStatusRequest {
    private String orderId;
    private int orderStatus;

    public ChangeOrderStatusRequest() {}

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public int getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(int orderStatus) {
        this.orderStatus = orderStatus;
    }
}
