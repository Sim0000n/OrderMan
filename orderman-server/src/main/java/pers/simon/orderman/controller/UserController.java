package pers.simon.orderman.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import pers.simon.orderman.model.entity.Cart;
import pers.simon.orderman.model.request.*;
import pers.simon.orderman.model.response.UserLoginResponse;
import pers.simon.orderman.model.response.UserRegisterResponse;
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
        UserLoginResponse userLoginResponse = new UserLoginResponse();
        if(userName != null) {
            userLoginResponse.setStatus(1);
            userLoginResponse.setUserName((String)userName);
        } else {
            userLoginResponse.setStatus(0);
        }
        return new ResponseWrapper(OK, userLoginResponse);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/api/login")
    ResponseWrapper login(@RequestBody UserLoginRequest userLoginRequest, HttpSession session) {
        UserLoginResponse userLoginResponse = userService.login(userLoginRequest);
        if(userLoginResponse.getStatus() == 1)
            session.setAttribute("userName", userLoginResponse.getUserName());
        return new ResponseWrapper(OK, userLoginResponse);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/api/register")
    ResponseWrapper register(@RequestBody UserRegisterRequest userRegisterRequest, HttpSession session) {
        UserRegisterResponse userRegisterResponse = userService.register(userRegisterRequest);
        if(userRegisterResponse.getStatus() == 0)
            session.setAttribute("userName", userRegisterRequest.getUserName());
        return new ResponseWrapper(OK, userRegisterResponse);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/api/logout")
    void logout(HttpSession session) {
        session.removeAttribute("userName");
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/api/getSellers")
    ResponseWrapper getSellers(@RequestBody GetSellersRequest getSellersRequest) {
        return new ResponseWrapper(OK, userService.getSellers(getSellersRequest));
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/api/getCommodities")
    ResponseWrapper getCommodities(@RequestBody GetCommoditesRequest getCommoditesRequest) {
        return new ResponseWrapper(OK, userService.getCommodities(getCommoditesRequest)) ;
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/api/getSellerInfo")
    ResponseWrapper getSellerInfo(@RequestBody GetSellerInfoRequest getSellerInfoRequest) {
        return new ResponseWrapper(OK, userService.getSellerInfo(getSellerInfoRequest));
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/api/newOrder")
    void addNewOrder(@RequestBody NewOrderRequest newOrderRequest, HttpSession session) {
        userService.addNewOrder(newOrderRequest, (String)session.getAttribute("userName"));
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/api/getOrders")
    ResponseWrapper getOrders(@RequestBody GetOrdersRequest getOrdersRequest, HttpSession session) {
        return new ResponseWrapper(OK, userService.getOrders(getOrdersRequest, (String)session.getAttribute("userName")));
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/api/getOrderInfo")
    ResponseWrapper getOrderInfo(@RequestBody GetOrderInfoRequest getOrderInfoRequest) {
        return new ResponseWrapper(OK, userService.getOrderInfo(getOrderInfoRequest));
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/api/changePassword")
    ResponseWrapper changePassword(@RequestBody ChangePasswordRequest changePasswordRequest, HttpSession session) {
        return new ResponseWrapper(OK, userService.changePassword(changePasswordRequest, (String)session.getAttribute("userName")));
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/api/getSellersByKeyword")
    ResponseWrapper getSellersByKeyword(@RequestBody GetSellersByKeywordRequest getSellersByKeywordRequest) {
        return new ResponseWrapper(OK, userService.getSellersByKeyword(getSellersByKeywordRequest));
    }
}