package pers.simon.orderman.model.response;

public class LoginResponse {

    private String userName;
    //0: not login, 1: login success, 2: user name !exist, 3: wrong password
    private int status = 0;

    public int getStatus() {
        return status;
    }

    public LoginResponse(String userName, int status) {
        this.userName = userName;
        this.status = status;
    }

    public LoginResponse() {
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

}
