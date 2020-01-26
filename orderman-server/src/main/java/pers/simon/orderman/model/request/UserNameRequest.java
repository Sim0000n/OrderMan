package pers.simon.orderman.model.request;

import org.springframework.stereotype.Component;

@Component
public class UserNameRequest {
    private String userId;

    public UserNameRequest() {}

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
