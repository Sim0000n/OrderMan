package pers.simon.orderman.model.request;

public class GetSellersByKeywordRequest {
    private String keyword;
    private int seq;
    private int num;

    public GetSellersByKeywordRequest() {}

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
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
