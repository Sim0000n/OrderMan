package pers.simon.orderman.model.entity;

public class Cart {
    private String commodityId;
    private int num;

    public Cart() {}

    public String getCommodityId() {
        return commodityId;
    }

    public void setCommodityId(String commodityId) {
        this.commodityId = commodityId;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }
}
