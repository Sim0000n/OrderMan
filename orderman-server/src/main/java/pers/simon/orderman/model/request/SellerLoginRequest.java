package pers.simon.orderman.model.request;

public class SellerLoginRequest {
    private String SellerId;
    private String password;

    public SellerLoginRequest() {}

    public String getSellerId() {
        return SellerId;
    }

    public void setSellerId(String sellerId) {
        SellerId = sellerId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
