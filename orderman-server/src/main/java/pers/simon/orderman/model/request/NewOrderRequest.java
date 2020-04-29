package pers.simon.orderman.model.request;

import pers.simon.orderman.model.entity.Cart;

import java.util.List;

public class NewOrderRequest {

    private List<Cart> cartList;
    private String sellerUuid;

    public NewOrderRequest() {}

    public List<Cart> getCartList() {
        return cartList;
    }

    public void setCartList(List<Cart> cartList) {
        this.cartList = cartList;
    }

    public String getSellerUuid() {
        return sellerUuid;
    }

    public void setSellerUuid(String sellerUuid) {
        this.sellerUuid = sellerUuid;
    }
}
