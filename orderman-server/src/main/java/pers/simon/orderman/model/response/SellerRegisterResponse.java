package pers.simon.orderman.model.response;

public class SellerRegisterResponse {
    //0: register success, 1: same seller name
    private int status;

    public SellerRegisterResponse(int status) {
        this.status = status;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
