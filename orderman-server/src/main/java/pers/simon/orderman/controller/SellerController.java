package pers.simon.orderman.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import pers.simon.orderman.model.request.*;
import pers.simon.orderman.model.response.ChangeSellerPasswordResponse;
import pers.simon.orderman.model.response.SellerLoginResponse;
import pers.simon.orderman.model.response.SellerRegisterResponse;
import pers.simon.orderman.service.SellerService;
import pers.simon.orderman.service.UserService;
import pers.simon.orderman.utils.MyUuid;
import pers.simon.orderman.utils.ResponseWrapper;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


import java.io.IOException;

import static pers.simon.orderman.utils.ResponseStatus.OK;

@EnableWebMvc
@RestController
public class SellerController {
    @Autowired
    SellerService sellerService;

    @Autowired
    UserService userService;

    @Value("${user.file.path}")
    String filePath;

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/api/seller/login")
    ResponseWrapper isLogin(HttpSession session) {
        Object sellerUuid = session.getAttribute("sellerUuid");
        SellerLoginResponse sellerLoginResponse = new SellerLoginResponse();
        if(sellerUuid != null) {
            sellerLoginResponse.setStatus(1);
            sellerLoginResponse.setSellerUuid((String)sellerUuid);
            sellerLoginResponse.setSellerName(sellerService.getSellerUuidById((String)sellerUuid));
        } else {
            sellerLoginResponse.setStatus(0);
        }
        return new ResponseWrapper(OK, sellerLoginResponse);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/api/seller/login")
    ResponseWrapper login(@RequestBody SellerLoginRequest sellerLoginRequest, HttpSession session) {
        SellerLoginResponse sellerLoginResponse = sellerService.login(sellerLoginRequest);
        if(sellerLoginResponse.getStatus() == 1) {
            session.setAttribute("sellerUuid", sellerLoginResponse.getSellerUuid());
        }
        return new ResponseWrapper(OK, sellerLoginResponse);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/api/seller/register")
    ResponseWrapper register(@RequestBody SellerRegisterRequest sellerRegisterRequest, HttpSession session) {
        SellerRegisterResponse sellerRegisterResponse = sellerService.register(sellerRegisterRequest);
        if(sellerRegisterResponse.getStatus() == 0)
            session.setAttribute("sellerUuid", sellerService.getSellerUuidById(sellerRegisterRequest.getSellerId()));
        return new ResponseWrapper(OK, sellerRegisterResponse);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/api/seller/logout")
    void logout(HttpSession session) {
        session.removeAttribute("sellerUuid");
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/api/seller/avatarUpload")
    void avatarUpload(@RequestBody AvatarUploadRequest avatarUploadRequest, HttpSession session) {
        sellerService.avatarUpload(avatarUploadRequest);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/api/seller/changeSellerName")
    void changeSellerName(@RequestBody ChangeSellerNameRequest changeSellerNameRequest, HttpSession session) {
        sellerService.changeSellerName(changeSellerNameRequest, (String)session.getAttribute("sellerUuid"));
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/api/seller/changeSellerPassword")
    ResponseWrapper changeSellerPassword(@RequestBody ChangeSellerPasswordRequest changeSellerPasswordRequest, HttpSession session) {
        ChangeSellerPasswordResponse changeSellerPasswordResponse = sellerService.changeSellerPassword(changeSellerPasswordRequest, (String)session.getAttribute("sellerId"));
        return new ResponseWrapper(OK, changeSellerPasswordResponse);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/api/seller/changeIntroduction")
    void changeIntroduction(@RequestBody ChangeIntroductionRequest changeIntroductionRequest, HttpSession session) {
        sellerService.changeIntroduction(changeIntroductionRequest, (String)session.getAttribute("sellerUuid"));
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @RequestMapping("/api/seller/newCommodity")
    @ResponseBody
    void addCommodity(@RequestParam("commodityName") String commodityName,
                      @RequestParam("commodityPrice") float commodityPrice,
                      @RequestParam("commodityIntroduction") String commodityIntroduction,
                      @RequestParam("file") MultipartFile multipartFile,
                      HttpSession session) throws IOException {
        sellerService.addNewCommodity(multipartFile, commodityName, commodityIntroduction, commodityPrice, (String)session.getAttribute("sellerUuid"));;
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @RequestMapping("/api/seller/changeSellerAvatar")
    @ResponseBody
    void changeSellerAvatar(@RequestParam("file") MultipartFile multipartFile, HttpSession session) throws IOException{
        sellerService.changeSellerAvatar(multipartFile, (String)session.getAttribute("sellerUuid"));
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/api/seller/getSellerUuid")
    ResponseWrapper getSellerUuid(HttpSession session) {
        return new ResponseWrapper(OK, (String)session.getAttribute("sellerUuid"));
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/api/seller/getCommodities")
    ResponseWrapper getCommodities(@RequestBody GetCommoditesRequest getCommoditesRequest, HttpSession session) {
        getCommoditesRequest.setSellerUuid((String)session.getAttribute("sellerUuid"));
        return new ResponseWrapper(OK, userService.getCommodities(getCommoditesRequest));
    }


    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/api/seller/changeCommodityName")
    void changeCommodityName(@RequestBody ChangeCommodityNameRequest changeCommodityNameRequest) {
        sellerService.changeCommodityName(changeCommodityNameRequest);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/api/seller/changeCommodityPrice")
    void changeCommodityPrice(@RequestBody ChangeCommodityPriceRequest changeCommodityPriceRequest) {
        sellerService.changeCommodityPrice(changeCommodityPriceRequest);
    }
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/api/seller/changeCommodityIntroduction")
    void changeCommodityIntroduction(ChangeCommodityIntroductionRequest changeCommodityIntroductionRequest) {
        sellerService.changeCommodityIntroduction(changeCommodityIntroductionRequest);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/api/seller/changeCommodityImg")
    @ResponseBody
    void changeCommodityImg(@RequestParam("file") MultipartFile multipartFile, @RequestParam("commodityId") String commodityId) throws IOException {
       sellerService.changeCommodityImg(multipartFile, commodityId);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/api/seller/getOrders")
    ResponseWrapper getOrders(@RequestBody GetOrdersRequest getOrdersRequest, HttpSession session) {
        return new ResponseWrapper(OK, sellerService.getOrders(getOrdersRequest, (String)session.getAttribute("sellerUuid")));
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/api/seller/changeOrderStatus")
    void changeOrderStatus(@RequestBody ChangeOrderStatusRequest changeOrderStatusRequest) {
        sellerService.changeOrderStatus(changeOrderStatusRequest);
    }
}
