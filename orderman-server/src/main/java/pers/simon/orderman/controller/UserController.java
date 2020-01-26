package pers.simon.orderman.controller;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import pers.simon.orderman.model.request.UserNameRequest;
import pers.simon.orderman.service.UserService;
import pers.simon.orderman.utils.ResponseStatus;
import pers.simon.orderman.utils.ResponseWrapper;

@EnableWebMvc
@RestController
public class UserController {
    @Autowired
    UserService userService;

    @CrossOrigin(origins = "*")
    @GetMapping("/api/userdata")
    ResponseWrapper getUserName(@RequestParam("userId")String userId) {
        return new ResponseWrapper(ResponseStatus.OK, userService.getUserNameById(userId));
    }

}