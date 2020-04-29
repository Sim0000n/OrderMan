package pers.simon.orderman.model.request;

public class ChangeCommodityIntroductionRequest {
    private String commodityId;
    private String commodityIntroduction;

    public ChangeCommodityIntroductionRequest() {}

    public String getCommodityId() {
        return commodityId;
    }

    public void setCommodityId(String commodityId) {
        this.commodityId = commodityId;
    }

    public String getCommodityIntroduction() {
        return commodityIntroduction;
    }

    public void setCommodityIntroduction(String commodityIntroduction) {
        this.commodityIntroduction = commodityIntroduction;
    }
}
