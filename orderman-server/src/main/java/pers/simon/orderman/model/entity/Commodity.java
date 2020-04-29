package pers.simon.orderman.model.entity;

public class Commodity {
    private String img_name;
    private String commodity_name;
    private String commodity_introduction;
    private String commodity_price;
    private String commodity_id;
    private int num;

    public Commodity() {}

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    public String getImg_name() {
        return img_name;
    }

    public void setImg_name(String img_name) {
        this.img_name = img_name;
    }

    public String getCommodity_name() {
        return commodity_name;
    }

    public void setCommodity_name(String commodity_name) {
        this.commodity_name = commodity_name;
    }

    public String getCommodity_introduction() {
        return commodity_introduction;
    }

    public void setCommodity_introduction(String commodity_introduction) {
        this.commodity_introduction = commodity_introduction;
    }

    public String getCommodity_price() {
        return commodity_price;
    }

    public void setCommodity_price(String commodity_price) {
        this.commodity_price = commodity_price;
    }

    public String getCommodity_id() {
        return commodity_id;
    }

    public void setCommodity_id(String commodity_id) {
        this.commodity_id = commodity_id;
    }
}
