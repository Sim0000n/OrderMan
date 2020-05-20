package pers.simon.orderman.model.response;

public class SellerLoginResponse {
    private String sellerName;
    private String sellerUuid;
    private String sellerImg;
    private String sellerIntroduction;
    //0: not login, 1: login success, 2: seller name !exist, 3: wrong password
    private int status = 0;

    public String getSellerImg() {
        return sellerImg;
    }

    public void setSellerImg(String sellerImg) {
        this.sellerImg = sellerImg;
    }

    public String getSellerIntroduction() {
        return sellerIntroduction;
    }

    public void setSellerIntroduction(String sellerIntroduction) {
        this.sellerIntroduction = sellerIntroduction;
    }

    public int getStatus() {
        return status;
    }

    public SellerLoginResponse(String sellerUuid, int status) {
        this.sellerUuid = sellerUuid;
        this.status = status;
    }

    public SellerLoginResponse() {
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getSellerName() {
        return sellerName;
    }

    public void setSellerName(String sellerName) {
        this.sellerName = sellerName;
    }

    public String getSellerUuid() {
        return sellerUuid;
    }

    public void setSellerUuid(String sellerUuid) {
        this.sellerUuid = sellerUuid;
    }
}
