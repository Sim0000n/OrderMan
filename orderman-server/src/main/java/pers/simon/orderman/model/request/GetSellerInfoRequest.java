package pers.simon.orderman.model.request;

public class GetSellerInfoRequest {
    private String sellerUuid;

    public GetSellerInfoRequest() {}

    public String getSellerUuid() {
        return sellerUuid;
    }

    public void setSellerUuid(String sellerUuid) {
        this.sellerUuid = sellerUuid;
    }
}
