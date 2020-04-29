package pers.simon.orderman.mapper;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;
import pers.simon.orderman.model.entity.Commodity;
import pers.simon.orderman.model.entity.Order;
import pers.simon.orderman.model.entity.Seller;
import pers.simon.orderman.model.response.GetSellerInfoResponse;

import java.util.List;

@Mapper
@Component
public interface UserMapper {
    @Select("SELECT user_name FROM users WHERE user_id = #{userId}")
    String getUserNameById(String userId);

    @Select("SELECT password FROM users WHERE user_name = #{userName}")
    String getPasswordByUserName(String userName);

    @Select("INSERT INTO users(user_name, password)value(#{userName}, #{password})")
    String addNewUser(String userName, String password);

    @Select("SELECT img_name, seller_name, seller_introduction, seller_uuid FROM sellers ORDER BY seq LIMIT #{low},#{high}")
    List<Seller> getSellers(int low, int high);

    @Select("SELECT COUNT(*) FROM sellers")
    int getSellersNums();

    @Select("SELECT img_name, commodity_name, commodity_id, commodity_price, commodity_introduction FROM commodities " +
            "WHERE seller_uuid=#{sellerUuid} LIMIT #{low}, #{high}")
    List<Commodity> getCommodities(String sellerUuid, int low, int high);

    @Results({
            @Result(property = "sellerName", column = "seller_name"),
            @Result(property = "sellerImg", column = "img_name"),
            @Result(property = "sellerIntroduction", column = "seller_introduction")
    })
    @Select({"SELECT seller_name, seller_introduction, img_name FROM sellers WHERE seller_uuid=#{sellerUuid}"})
    GetSellerInfoResponse getSellerInfo(String sellerUuid);

    @Select("SELECT commodity_price FROM commodities WHERE commodity_id=#{commodityId}")
    int getPriceByCommodityId(String commodityId);

    @Insert("INSERT INTO orders(order_id, order_status, commodities, spend, seller_uuid, user_name) " +
            "value (#{orderId}, #{orderStatus}, #{commodities}, #{spend}, #{sellerUuid}, #{userName})")
    void addNewOrder(String orderId, int orderStatus, String commodities, float spend, String sellerUuid, String userName);

    @Select("SELECT user_name, create_time, mod_time, spend, order_id, order_status, orders.seller_uuid, img_name, seller_name FROM orders, sellers WHERE " +
            "user_name=#{userName} AND orders.seller_uuid=sellers.seller_uuid LIMIT #{low}, #{high}")
    List<Order> getOrders(int low, int high, String userName);

    @Select("SELECT spend, order_id, order_status, orders.seller_uuid, img_name, seller_name, create_time, mod_time FROM orders, sellers " +
            "WHERE order_id=#{orderId} AND orders.seller_uuid=sellers.seller_uuid")
    Order getOrderById(String orderId);

    @Select("SELECT commodities FROM orders WHERE order_id=#{orderId}")
    String getCommoditiesOfOrder(String orderId);

    @Select("SELECT img_name, commodity_name, commodity_introduction, commodity_price, commodity_id FROM commodities WHERE commodity_id=#{commodityId}")
    Commodity getCommodityById(String commodityId);

    @Update(("UPDATE users SET password=#{password} WHERE user_name=#{userName}"))
    void changePassword(String userName, String password);

    @Select("SELECT img_name, seller_name, seller_introduction, seller_uuid FROM sellers WHERE  `seller_name` REGEXP #{keyword} ORDER BY seq LIMIT #{low},#{high}")
    List<Seller> getSellersByKeyword(String keyword, int low, int high);

}
