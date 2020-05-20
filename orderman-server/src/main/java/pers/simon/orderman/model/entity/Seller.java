package pers.simon.orderman.model.entity;

public class Seller {
    private String img_name;
    private String seller_name;
    private String seller_introduction;
    private String seller_uuid;
    private int sales;

    public Seller() {}

    public int getSales() {
        return sales;
    }

    public void setSales(int sales) {
        this.sales = sales;
    }

    public String getSeller_uuid() {
        return seller_uuid;
    }

    public void setSeller_uuid(String seller_uuid) {
        this.seller_uuid = seller_uuid;
    }

    public String getImg_name() {
        return img_name;
    }

    public void setImg_name(String img_name) {
        this.img_name = img_name;
    }

    public String getSeller_name() {
        return seller_name;
    }

    public void setSeller_name(String seller_name) {
        this.seller_name = seller_name;
    }

    public String getSeller_introduction() {
        return seller_introduction;
    }

    public void setSeller_introduction(String seller_introduction) {
        this.seller_introduction = seller_introduction;
    }
}
