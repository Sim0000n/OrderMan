package pers.simon.orderman.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import pers.simon.orderman.model.request.LoginRequest;
import pers.simon.orderman.model.request.RegisterRequest;
import pers.simon.orderman.model.response.LoginResponse;
import pers.simon.orderman.model.response.RegisterResponse;
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
        LoginResponse loginResponse = userService.login(loginRequest);
        if(loginResponse.getStatus() == 1)
            session.setAttribute("userName", loginResponse.getUserName());
        return new ResponseWrapper(OK, loginResponse);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/api/register")
    ResponseWrapper register(@RequestBody RegisterRequest registerRequest, HttpSession session) {
        RegisterResponse registerResponse = userService.register(registerRequest);
        if(registerResponse.getStatus() == 0)
            session.setAttribute("userName", registerRequest.getUserName());
        return new ResponseWrapper(OK, registerResponse);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/api/logout")
    void logout(HttpSession session) {
        session.removeAttribute("userName");
    }

}