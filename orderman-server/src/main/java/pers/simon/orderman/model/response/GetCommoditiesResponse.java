package pers.simon.orderman.model.response;

import pers.simon.orderman.model.entity.Commodity;

import java.util.List;

public class GetCommoditiesResponse {
    private  List<Commodity> commodities;

    public GetCommoditiesResponse() {}

    public List<Commodity> getCommodities() {
        return commodities;
    }

    public void setCommodities(List<Commodity> commodities) {
        this.commodities = commodities;
    }
}
