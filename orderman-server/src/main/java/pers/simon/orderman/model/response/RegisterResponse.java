package pers.simon.orderman.model.response;

public class RegisterResponse {
    //0: register success, 1: same user name
    private int status;

    public RegisterResponse(int status) {
        this.status = status;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
