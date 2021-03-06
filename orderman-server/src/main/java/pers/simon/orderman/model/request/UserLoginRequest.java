package pers.simon.orderman.model.request;

public class UserLoginRequest {
    private String userName;
    private String password;

    public UserLoginRequest(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }

    public UserLoginRequest() {
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
