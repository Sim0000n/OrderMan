package pers.simon.orderman.model.response;

public class UserNameResponse {
    private String userName;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public UserNameResponse(String userName) {
        this.userName = userName;
    }
}
