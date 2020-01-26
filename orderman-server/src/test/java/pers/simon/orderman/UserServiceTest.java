package pers.simon.orderman;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import pers.simon.orderman.model.response.UserNameResponse;
import pers.simon.orderman.service.UserService;

public class UserServiceTest extends OrdermanApplicationTests{
    @Autowired
    UserService userService;

    @Test
    public void getUserNameById() {
        UserNameResponse userName = userService.getUserNameById("001");
        Assert.assertEquals("Ziong", userName.getUserName());
    }
}
