package pers.simon.orderman.model.request;

public class ChangePasswordRequest {
    private String password;
    private String newPassword;

    public ChangePasswordRequest() {}

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
