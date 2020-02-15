package pers.simon.orderman.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import pers.simon.orderman.model.request.LoginRequest;
import pers.simon.orderman.model.response.LoginResponse;
import pers.simon.orderman.service.UserService;
import pers.simon.orderman.utils.ResponseWrapper;

import javax.servlet.http.HttpSession;

import static pers.simon.orderman.utils.ResponseStatus.OK;

@EnableWebMvc
@RestController
public class UserController {
    @Autowired
    UserService userService;

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/api/login")
    ResponseWrapper isLogin(HttpSession session) {

        System.out.println(session.getId());

        Object userName = session.getAttribute("userName");
        LoginResponse loginResponse = new LoginResponse();
        if(userName != null) {
            loginResponse.setStatus(1);
            loginResponse.setUserName((String)userName);
        } else {
            loginResponse.setStatus(0);
        }
        return new ResponseWrapper(OK, loginResponse);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/api/login")
    ResponseWrapper login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        System.out.println(session.getId());

        LoginResponse loginResponse = userService.login(loginRequest);
        if(loginResponse.getStatus() == 1)
            session.setAttribute("userName", loginResponse.getUserName());
        return new ResponseWrapper(OK, loginResponse);
    }




}