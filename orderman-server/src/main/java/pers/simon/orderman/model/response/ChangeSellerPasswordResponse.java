package pers.simon.orderman.model.response;


public class ChangeSellerPasswordResponse {
    // 0: password wrong //1:success
    private int status;

    public ChangeSellerPasswordResponse() {}

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
