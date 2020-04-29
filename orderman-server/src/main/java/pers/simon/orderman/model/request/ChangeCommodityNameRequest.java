package pers.simon.orderman.model.request;

public class ChangeCommodityNameRequest {
    private String commodityId;
    private String commodityName;

    public ChangeCommodityNameRequest() {}

    public String getCommodityId() {
        return commodityId;
    }

    public void setCommodityId(String commodityId) {
        this.commodityId = commodityId;
    }

    public String getCommodityName() {
        return commodityName;
    }

    public void setCommodityName(String commodityName) {
        this.commodityName = commodityName;
    }
}
