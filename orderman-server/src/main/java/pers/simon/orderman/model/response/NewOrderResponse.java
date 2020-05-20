package pers.simon.orderman.model.response;

public class NewOrderResponse {
      private String orderId;
      public NewOrderResponse() {}

      public void setOrderId(String orderId) {
            this.orderId = orderId;
      }

      public String getOrderId() {
            return orderId;
      }
}
