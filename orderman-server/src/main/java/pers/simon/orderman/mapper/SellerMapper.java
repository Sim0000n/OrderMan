package pers.simon.orderman.mapper;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;
import pers.simon.orderman.model.entity.Order;
import pers.simon.orderman.model.response.GetCommodityInfoResponse;
import pers.simon.orderman.model.response.GetSellerInfoResponse;
import pers.simon.orderman.model.response.SellerLoginResponse;

import java.util.List;

@Mapper
@Component
public interface SellerMapper {
    @Select("SELECT password FROM sellers WHERE seller_id = #{sellerId}")
    String getPasswordBySellerId(String sellerId);

    @Select("INSERT INTO sellers(seller_id, seller_name, password, seller_uuid) value (#{sellerId}, #{sellerName}, #{password}, #{sellerUuid})")
    String addNewSeller(String sellerId, String sellerName, String password, String sellerUuid);

    @Select("SELECT seller_name FROM sellers WHERE seller_id = #{sellerId}")
    String getSellerNameById(String sellerId);

    @Select("SELECT seller_uuid FROM sellers WHERE seller_id = #{sellerId}")
    String getSellerUuidById(String sellerId);

    @Update("UPDATE sellers SET seller_name=#{sellerName} WHERE seller_uuid=#{sellerUuid}")
    void changeSellerName(String sellerName, String sellerUuid);

    @Update("UPDATE sellers SET password=#{password} WHERE seller_uuid=#{sellerUuid}")
    void changeSellerPassword(String password, String sellerUuid);

    @Update("UPDATE sellers SET seller_introduction=#{introduction} WHERE seller_uuid=#{sellerUuid}")
    void changeIntroduction(String introduction, String sellerUuid);

    @Insert("INSERT INTO commodities(commodity_id, img_name, commodity_name, commodity_introduction, commodity_price, seller_uuid, sales) " +
            "value (#{commodityId}, #{image}, #{commodityName}, #{commodityIntroduction}, #{commodityPrice}, #{sellerUuid}, 0)")
    void addNewCommodity(String commodityId, String image, String commodityName, String commodityIntroduction, float commodityPrice, String sellerUuid);

    @Update("UPDATE sellers SET img_name=#{newFileName} WHERE seller_uuid = #{sellerUuid}")
    void changeSellerAvatar(String newFileName, String sellerUuid);

    @Update("UPDATE commodities SET commodity_name=#{commodityName} WHERE commodity_id=#{commodityId}")
    void changeCommodityName(String commodityId, String commodityName);

    @Update("UPDATE commodities SET commodity_price=#{commodityPrice} WHERE commodity_id=#{commodityId}")
    void changeCommodityPrice(String commodityId, float commodityPrice);

    @Update("UPDATE commodities SET commodity_Introduction=#{commodityIntroduction} WHERE commodity_id=#{commodityId}")
    void changeCommodityIntroduction(String commodityId, String commodityIntroduction);

    @Update("UPDATE commodities SET img_name=#{commodityImg} WHERE commodity_id=#{commodityId}")
    void changeCommodityImg(String commodityId, String commodityImg);

    @Select("SELECT user_name, order_id, order_status, spend, orders.seller_uuid, img_name, seller_name, create_time, mod_time FROM orders, sellers " +
            "WHERE orders.seller_uuid=#{sellerUuid} AND orders.seller_uuid=sellers.seller_uuid LIMIT #{low}, #{high}")
    List<Order> getOrders(String sellerUuid, int low, int high);

    @Update("UPDATE orders SET order_status=#{orderStatus} WHERE order_id=#{orderId}")
    void changeOrderStatus(int orderStatus, String orderId);

    @Results({
            @Result(property = "sellerName", column = "seller_name"),
            @Result(property = "sellerImg", column = "img_name"),
            @Result(property = "sellerIntroduction", column = "seller_introduction")
    })
    @Select({"SELECT seller_name, seller_introduction, img_name FROM sellers WHERE seller_uuid=#{sellerUuid}"})
    SellerLoginResponse getSellerInfo(String sellerUuid);

    @Select("SELECT commodity_name, commodity_price, commodity_introduction, img_name FROM commodities WHERE commodity_id=#{commodityId}")
    GetCommodityInfoResponse getCommodityInfo(String commodityId);
}
