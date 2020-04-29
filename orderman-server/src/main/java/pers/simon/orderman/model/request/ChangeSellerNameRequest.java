package pers.simon.orderman.model.request;

public class ChangeSellerNameRequest {
    private String newSellerName;

    public ChangeSellerNameRequest() {}

    public String getNewSellerName() {
        return newSellerName;
    }

    public void setNewSellerName(String newSellerName) {
        this.newSellerName = newSellerName;
    }
}
