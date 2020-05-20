package pers.simon.orderman.model.request;

public class GetCommodityInfoRequest {
    private String commodityId;

    public GetCommodityInfoRequest() {}

    public String getCommodityId() {
        return commodityId;
    }

    public void setCommodityId(String commodityId) {
        this.commodityId = commodityId;
    }
}
