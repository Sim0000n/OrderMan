package pers.simon.orderman.model.entity;

public class Order {
    private String order_id;
    private String order_status;
    private float spend;
    private String seller_uuid;
    private String img_name;
    private String seller_name;
    private String create_time;
    private String mod_time;
    private String user_name;

    public Order() {}

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getCreate_time() {
        return create_time;
    }

    public void setCreate_time(String create_time) {
        this.create_time = create_time;
    }

    public String getMod_time() {
        return mod_time;
    }

    public void setMod_time(String mod_time) {
        this.mod_time = mod_time;
    }

    public float getSpend() {
        return spend;
    }

    public void setSpend(float spend) {
        this.spend = spend;
    }

    public String getOrder_id() {
        return order_id;
    }

    public void setOrder_id(String order_id) {
        this.order_id = order_id;
    }

    public String getOrder_status() {
        return order_status;
    }

    public void setOrder_status(String order_status) {
        this.order_status = order_status;
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
}
