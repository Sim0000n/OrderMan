package pers.simon.orderman.service.impl;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import pers.simon.orderman.mapper.SellerMapper;
import pers.simon.orderman.model.entity.Order;
import pers.simon.orderman.model.request.*;
import pers.simon.orderman.model.response.*;
import pers.simon.orderman.service.SellerService;
import pers.simon.orderman.utils.MyUuid;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;


@Service
@Transactional
public class SellerServiceImpl implements SellerService {

    @Autowired
    SellerMapper sellerMapper;

    @Value("${user.file.path}")
    private String filePath;

    public SellerLoginResponse login(SellerLoginRequest sellerLoginRequest) {
        String password = sellerMapper.getPasswordBySellerId(sellerLoginRequest.getSellerId());
        if(password == null) {
            return new SellerLoginResponse("", 2);
        } else if(!password.equals(sellerLoginRequest.getPassword())) {
            return new SellerLoginResponse("", 3);
        } else {
            String sellerUuid = sellerMapper.getSellerUuidById(sellerLoginRequest.getSellerId());
            return new SellerLoginResponse(sellerUuid, 1);
        }
    }

    public SellerRegisterResponse register(SellerRegisterRequest sellerRegisterRequest) {
        if(sellerMapper.getPasswordBySellerId(sellerRegisterRequest.getSellerId())!=null) {
            return new SellerRegisterResponse(1);
        } else {
            sellerMapper.addNewSeller(sellerRegisterRequest.getSellerId(), sellerRegisterRequest.getSellerName(), sellerRegisterRequest.getPassword(), MyUuid.getUuid());
            return new SellerRegisterResponse(0);
        }
    }

    public String getSellerNameById(String sellerID) {
        return sellerMapper.getSellerNameById(sellerID);
    }

    public void avatarUpload(AvatarUploadRequest avatarUploadRequest) {
//        UUID uuid = UUID.randomUUID();
//        String str = uuid.toString();
        try {
            File file = new File(filePath + avatarUploadRequest.getMultipartFile().getOriginalFilename());
            avatarUploadRequest.getMultipartFile().transferTo(file);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void changeSellerName(ChangeSellerNameRequest changeSellerNameRequest, String sellerUuid) {
        sellerMapper.changeSellerName(changeSellerNameRequest.getNewSellerName(), sellerUuid);
    }

    public ChangeSellerPasswordResponse changeSellerPassword(ChangeSellerPasswordRequest changeSellerPasswordRequest, String sellerUuid) {
        ChangeSellerPasswordResponse changeSellerPasswordResponse = new ChangeSellerPasswordResponse();
        String password = sellerMapper.getPasswordBySellerId(sellerUuid);
        if(!password.equals(changeSellerPasswordRequest.getPassword())) {
            changeSellerPasswordResponse.setStatus(0);
            return changeSellerPasswordResponse;
        }
        sellerMapper.changeSellerPassword(changeSellerPasswordRequest.getNewPassword(), sellerUuid);
        changeSellerPasswordResponse.setStatus(1);
        return changeSellerPasswordResponse;
    }

    public void changeIntroduction(ChangeIntroductionRequest changeIntroductionRequest, String sellerUuid) {
        sellerMapper.changeIntroduction(changeIntroductionRequest.getIntroduction(), sellerUuid);
    }

    public String getSellerUuidById(String sellerId) {
        return sellerMapper.getSellerUuidById(sellerId);
    }

    public void addNewCommodity(MultipartFile multipartFile, String commodityName, String commodityIntroduction, float commodityPrice, String sellerUuid) throws IOException {
        String newFileName = MyUuid.getUuidFileName(multipartFile.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(new File(filePath + "image/" + newFileName));
        IOUtils.copy(multipartFile.getInputStream(), fos);
        fos.close();
        sellerMapper.addNewCommodity(
                MyUuid.getUuid(),
                newFileName,
                commodityName,
                commodityIntroduction,
                commodityPrice,
                sellerUuid
        );
    }

    public void changeSellerAvatar(MultipartFile multipartFile, String sellerUuid) throws IOException{
        String newFileName = MyUuid.getUuidFileName(multipartFile.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(filePath + "image/" + newFileName);
        IOUtils.copy(multipartFile.getInputStream(), fos);
        fos.close();
        sellerMapper.changeSellerAvatar(newFileName, sellerUuid);
    }

    public void changeCommodityName(ChangeCommodityNameRequest changeCommodityNameRequest) {
        sellerMapper.changeCommodityName(changeCommodityNameRequest.getCommodityId(), changeCommodityNameRequest.getCommodityName());
    }

    public void changeCommodityPrice(ChangeCommodityPriceRequest changeCommodityPriceRequest) {
        sellerMapper.changeCommodityPrice(changeCommodityPriceRequest.getCommodityId(), changeCommodityPriceRequest.getCommodityPrice());
    }

    public void changeCommodityIntroduction(ChangeCommodityIntroductionRequest changeCommodityIntroductionRequest) {
        sellerMapper.changeCommodityIntroduction(changeCommodityIntroductionRequest.getCommodityId(), changeCommodityIntroductionRequest.getCommodityIntroduction());
    }

    public void changeCommodityImg(MultipartFile multipartFile, String commodityId) throws IOException{
        String newFileName = MyUuid.getUuidFileName(multipartFile.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(filePath + "image/" + newFileName);
        IOUtils.copy(multipartFile.getInputStream(), fos);
        fos.close();
        sellerMapper.changeCommodityImg(commodityId, newFileName);
    }

    public GetOrdersResponse getOrders(GetOrdersRequest getOrdersRequest, String sellerUuid) {
        int high = getOrdersRequest.getNum();
        int low = getOrdersRequest.getSeq() * high;
        List<Order> orders = sellerMapper.getOrders(sellerUuid, low, high);
        GetOrdersResponse getOrdersResponse = new GetOrdersResponse();
        getOrdersResponse.setOrders(orders);
        return getOrdersResponse;
    }

    public void changeOrderStatus(ChangeOrderStatusRequest changeOrderStatusRequest) {
        sellerMapper.changeOrderStatus(changeOrderStatusRequest.getOrderStatus(), changeOrderStatusRequest.getOrderId());
    }

    public SellerLoginResponse getSellerInfo(String sellerUuid) {
        return sellerMapper.getSellerInfo(sellerUuid);
    }

    public GetCommodityInfoResponse getCommodityInfo(String commodityId) {
        return sellerMapper.getCommodityInfo(commodityId);
    }
}
