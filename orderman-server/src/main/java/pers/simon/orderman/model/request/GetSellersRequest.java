package pers.simon.orderman.model.request;

public class GetSellersRequest {
    private int seq;
    private int num;

    public GetSellersRequest() {}

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
