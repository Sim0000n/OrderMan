package pers.simon.orderman.model.request;

public class GetCommoditesRequest {
    private String sellerUuid;
    private int seq;
    private int num;

    public GetCommoditesRequest() {}

    public String getSellerUuid() {
        return sellerUuid;
    }

    public void setSellerUuid(String sellerUuid) {
        this.sellerUuid = sellerUuid;
    }

    public int getSeq() {
        return seq;
    }

    public void setSeq(int seq) {
        this.seq = seq;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }
}
