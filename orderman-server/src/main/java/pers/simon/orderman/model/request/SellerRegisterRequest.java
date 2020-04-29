package pers.simon.orderman.model.request;

public class SellerRegisterRequest {
    private String sellerId;
    private String password;
    private String sellerName;

    public String getSellerName() {
        return sellerName;
    }

    public void setSellerName(String sellerName) {
        this.sellerName = sellerName;
    }

    public SellerRegisterRequest() {}

    public String getSellerId() {
        return sellerId;
    }

    public void setSellerId(String sellerId) {
        this.sellerId = sellerId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String sellerPassword) {
        this.password = sellerPassword;
    }
}
