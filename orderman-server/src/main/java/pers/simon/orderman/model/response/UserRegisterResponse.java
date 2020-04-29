package pers.simon.orderman.model.response;

public class UserRegisterResponse {
    //0: register success, 1: same user name
    private int status;

    public UserRegisterResponse(int status) {
        this.status = status;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
