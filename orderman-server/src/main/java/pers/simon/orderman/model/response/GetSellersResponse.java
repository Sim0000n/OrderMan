package pers.simon.orderman.model.response;

import pers.simon.orderman.model.entity.Seller;

import java.util.List;

public class GetSellersResponse {
    private List<Seller> sellers;

    public GetSellersResponse() {}

    public List<Seller> getSellers() {
        return sellers;
    }

    public void setSellers(List<Seller> sellers) {
        this.sellers = sellers;
    }
}
