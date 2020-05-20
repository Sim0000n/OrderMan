package pers.simon.orderman.service;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import pers.simon.orderman.model.request.*;
import pers.simon.orderman.model.response.*;

@Service
@Component
public interface UserService {
    public UserLoginResponse login(UserLoginRequest userLoginRequest);
    public UserRegisterResponse register(UserRegisterRequest userRegisterRequest);
    public GetSellersResponse getSellers(GetSellersRequest getSellersRequest);
    public GetCommoditiesResponse getCommodities(GetCommoditesRequest getCommoditesRequest);
    public GetSellerInfoResponse getSellerInfo(GetSellerInfoRequest getSellerInfoRequest);
    public NewOrderResponse addNewOrder(NewOrderRequest newOrderRequest, String userName);
    public GetOrdersResponse getOrders(GetOrdersRequest getOrdersRequest, String userName);
    public GetOrderInfoResponse getOrderInfo(GetOrderInfoRequest getOrderInfoRequest);
    public ChangePasswordResponse changePassword(ChangePasswordRequest changePasswordRequest, String userName);
    public GetSellersResponse getSellersByKeyword(GetSellersByKeywordRequest getSellersByKeywordRequest);
    public GetSellersResponse getSellersOrderBySales(GetSellersRequest getSellersRequest);
}
