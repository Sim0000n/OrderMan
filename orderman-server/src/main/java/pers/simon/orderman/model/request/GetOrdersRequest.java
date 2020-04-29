package pers.simon.orderman.model.request;

public class GetOrdersRequest {

    private int seq;
    private int num;

    public GetOrdersRequest() {}

    public GetOrdersRequest(int seq, int num) {
        this.seq = seq;
        this.num = num;
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
