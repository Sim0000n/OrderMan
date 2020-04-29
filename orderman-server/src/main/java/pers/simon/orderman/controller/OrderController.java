package pers.simon.orderman.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import pers.simon.orderman.model.request.GetOrdersRequest;
import pers.simon.orderman.service.OrderService;
import pers.simon.orderman.utils.ResponseWrapper;

import javax.servlet.http.HttpSession;

@EnableWebMvc
@RestController
public class OrderController {
    @Autowired
    OrderService orderService;

//    @PostMapping
//    ResponseWrapper getOrders(@RequestBody GetOrdersRequest getOrdersRequest, HttpSession session) {
//
//    }
}
