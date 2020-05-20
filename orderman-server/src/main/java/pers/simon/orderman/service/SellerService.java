package pers.simon.orderman.service;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pers.simon.orderman.model.request.*;
import pers.simon.orderman.model.response.*;

import javax.servlet.http.HttpSession;
import java.io.IOException;

@Service
@Component
public interface SellerService {
    public SellerLoginResponse login(SellerLoginRequest sellerLoginRequest);
    public SellerRegisterResponse register(SellerRegisterRequest sellerRegisterRequest);
    public SellerLoginResponse getSellerInfo(String sellerUuid);
    public String getSellerUuidById(String sellerId);
    public void avatarUpload(AvatarUploadRequest avatarUploadRequest);
    public void changeSellerName(ChangeSellerNameRequest changeSellerNameRequest, String sellerUuid);
    public ChangeSellerPasswordResponse changeSellerPassword(ChangeSellerPasswordRequest changeSellerPasswordRequest, String sellerUuid);
    public void changeIntroduction(ChangeIntroductionRequest changeIntroductionRequest, String sellerUuid);
    public void addNewCommodity(MultipartFile multipartFile, String commodityName, String commodityIntroduction, float commodity_price, String sellerUuid) throws IOException;
    public void changeSellerAvatar(MultipartFile multipartFile, String sellerUuid) throws IOException;
    public void changeCommodityName(ChangeCommodityNameRequest changeCommodityNameRequest);
    public void changeCommodityPrice(ChangeCommodityPriceRequest changeCommodityPriceRequest);
    public void changeCommodityIntroduction(ChangeCommodityIntroductionRequest changeCommodityIntroductionRequest);
    public void changeCommodityImg(MultipartFile multipartFile, String commodityId) throws IOException;
    public GetOrdersResponse getOrders(GetOrdersRequest getOrdersRequest, String sellerUuid);
    public void changeOrderStatus(ChangeOrderStatusRequest changeOrderStatusRequest);
    public GetCommodityInfoResponse getCommodityInfo(String commodityId);
}