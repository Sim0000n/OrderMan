package pers.simon.orderman.model.response;

public class GetSellerInfoResponse {
    private String sellerName;
    private String sellerImg;
    private String sellerIntroduction;

    public GetSellerInfoResponse() {}

    public String getSellerName() {
        return sellerName;
    }

    public void setSellerName(String sellerName) {
        this.sellerName = sellerName;
    }

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
}
