package pers.simon.orderman.model.request;

public class ChangeCommodityPriceRequest {
    private String commodityId;
    private float commodityPrice;

    public ChangeCommodityPriceRequest() {}

    public String getCommodityId() {
        return commodityId;
    }

    public void setCommodityId(String commodityId) {
        this.commodityId = commodityId;
    }

    public float getCommodityPrice() {
        return commodityPrice;
    }

    public void setCommodityPrice(float commodityPrice) {
        this.commodityPrice = commodityPrice;
    }
}
