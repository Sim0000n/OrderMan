package pers.simon.orderman.model.request;

public class AddNewCommodityRequest {
    private String commodityName;
    private float commodityPrice;
    private String commodityIntroduction;

    public AddNewCommodityRequest() {}

    public String getCommodityName() {
        return commodityName;
    }

    public void setCommodityName(String commodityName) {
        this.commodityName = commodityName;
    }

    public float getCommodityPrice() {
        return commodityPrice;
    }

    public void setCommodityPrice(float commodityPrice) {
        this.commodityPrice = commodityPrice;
    }

    public String getCommodityIntroduction() {
        return commodityIntroduction;
    }

    public void setCommodityIntroduction(String commodityIntroduction) {
        this.commodityIntroduction = commodityIntroduction;
    }
}
