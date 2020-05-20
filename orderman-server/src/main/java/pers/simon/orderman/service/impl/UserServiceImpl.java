package pers.simon.orderman.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pers.simon.orderman.mapper.UserMapper;
import pers.simon.orderman.model.entity.Cart;
import pers.simon.orderman.model.entity.Commodity;
import pers.simon.orderman.model.entity.Order;
import pers.simon.orderman.model.entity.Seller;
import pers.simon.orderman.model.request.*;
import pers.simon.orderman.model.response.*;
import pers.simon.orderman.service.UserService;
import pers.simon.orderman.utils.MyUuid;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    UserMapper userMapper;

    public UserLoginResponse login(UserLoginRequest userLoginRequest) {
        String password = userMapper.getPasswordByUserName(userLoginRequest.getUserName());
        if(password == null) {
            return new UserLoginResponse("", 2);
        } else if(!password.equals(userLoginRequest.getPassword())) {
            return new UserLoginResponse(userLoginRequest.getUserName(), 3);
        } else {
            return new UserLoginResponse(userLoginRequest.getUserName(), 1);
        }
    }

    public UserRegisterResponse register(UserRegisterRequest userRegisterRequest) {
        if(userMapper.getPasswordByUserName(userRegisterRequest.getUserName())!=null) {
            return new UserRegisterResponse(1);
        } else {
            userMapper.addNewUser(userRegisterRequest.getUserName(), userRegisterRequest.getPassword());
            return new UserRegisterResponse(0);
        }
    }

    public GetSellersResponse getSellers(GetSellersRequest getSellersRequest) {
        int offset = getSellersRequest.getSeq() * getSellersRequest.getNum();
        List<Seller> sellers = userMapper.getSellers(offset, getSellersRequest.getNum());
        GetSellersResponse getSellersResponse = new GetSellersResponse();
        getSellersResponse.setSellers(sellers);
        return getSellersResponse;
    }

    public GetSellersResponse getSellersOrderBySales(GetSellersRequest getSellersRequest) {
        int offset = getSellersRequest.getSeq() * getSellersRequest.getNum();
        List<Seller> sellers = userMapper.getSellersOrderBySales(offset, getSellersRequest.getNum());
        GetSellersResponse getSellersResponse = new GetSellersResponse();
        getSellersResponse.setSellers(sellers);
        return getSellersResponse;
    }

    public GetCommoditiesResponse getCommodities(GetCommoditesRequest getCommoditesRequest) {
        int offset = getCommoditesRequest.getSeq() * getCommoditesRequest.getNum();
        List<Commodity> commodities = userMapper.getCommodities(getCommoditesRequest.getSellerUuid(), offset, getCommoditesRequest.getNum());
        GetCommoditiesResponse getCommoditiesResponse = new GetCommoditiesResponse();
        getCommoditiesResponse.setCommodities(commodities);
        return getCommoditiesResponse;
    }

    public GetSellerInfoResponse getSellerInfo(GetSellerInfoRequest getSellerInfoRequest) {
        GetSellerInfoResponse getSellerInfoResponse = userMapper.getSellerInfo(getSellerInfoRequest.getSellerUuid());
        return getSellerInfoResponse;
    }

    public NewOrderResponse addNewOrder(NewOrderRequest newOrderRequest, String userName) {
        StringBuilder stringBuilder = new StringBuilder();
        float price = 0;
        String orderId = MyUuid.getUuid();
        for(Cart cart: newOrderRequest.getCartList()) {
            float currPrice = userMapper.getPriceByCommodityId(cart.getCommodityId());
            currPrice = currPrice * cart.getNum();
            price += currPrice;
            stringBuilder.append(cart.getCommodityId());
            stringBuilder.append(":");
            stringBuilder.append(cart.getNum());
            stringBuilder.append(",");
        }
        userMapper.addNewOrder(
                orderId,
                1,
                stringBuilder.toString(),
                price,
                newOrderRequest.getSellerUuid(),
                userName
        );
        for(Cart cart: newOrderRequest.getCartList()) {
            userMapper.addCommoditySales(cart.getCommodityId(),cart.getNum());
        }
        userMapper.addSellerSales(newOrderRequest.getSellerUuid());
        NewOrderResponse newOrderResponse = new NewOrderResponse();
        newOrderResponse.setOrderId(orderId);
        return newOrderResponse;
    }

    public GetOrdersResponse getOrders(GetOrdersRequest getOrdersRequest, String userName) {
        GetOrdersResponse getOrdersResponse = new GetOrdersResponse();
        int high = getOrdersRequest.getNum();
        int low = getOrdersRequest.getSeq() * high;
        getOrdersResponse.setOrders(userMapper.getOrders(
                low,
                high,
                userName
        ));
        return getOrdersResponse;
    }

    public GetOrderInfoResponse getOrderInfo(GetOrderInfoRequest getOrderInfoRequest) {
        Order order = userMapper.getOrderById(getOrderInfoRequest.getOrderId());
        String str = userMapper.getCommoditiesOfOrder(getOrderInfoRequest.getOrderId());
        String tmp[] = str.split(",");
        List<Commodity> commodities = new ArrayList<>(tmp.length);
        for(String s:tmp) {
            if(!s.isEmpty()) {
                String tmp1[] = s.split(":");
                Commodity commodity = userMapper.getCommodityById(tmp1[0]);
                commodity.setNum(MyUuid.stringToInt(tmp1[1]));
                commodities.add(commodity);
            }
        }
        GetOrderInfoResponse getOrderInfoResponse = new GetOrderInfoResponse();
        getOrderInfoResponse.setCommodities(commodities);
        getOrderInfoResponse.setOrder(order);
        return getOrderInfoResponse;
    }

    public ChangePasswordResponse changePassword(ChangePasswordRequest changePasswordRequest, String userName) {
        ChangePasswordResponse changePasswordResponse = new ChangePasswordResponse();
        String realPassword = userMapper.getPasswordByUserName(userName);
        if(!realPassword.equals(changePasswordRequest.getPassword())) {
            changePasswordResponse.setStatus(0);
        } else {
            changePasswordResponse.setStatus(1);
            userMapper.changePassword(userName, changePasswordRequest.getNewPassword());
        }
        return changePasswordResponse;
    }

    public GetSellersResponse getSellersByKeyword(GetSellersByKeywordRequest getSellersByKeywordRequest) {
        int high = getSellersByKeywordRequest.getNum();
        int low = getSellersByKeywordRequest.getSeq() * high;
        List<Seller> sellers = userMapper.getSellersByKeyword(getSellersByKeywordRequest.getKeyword(), low, high);
        GetSellersResponse getSellersResponse = new GetSellersResponse();
        getSellersResponse.setSellers(sellers);
        return getSellersResponse;
    }


}
