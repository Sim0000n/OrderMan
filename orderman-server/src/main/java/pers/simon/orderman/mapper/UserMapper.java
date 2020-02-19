package pers.simon.orderman.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

@Mapper
@Component
public interface UserMapper {
    @Select("SELECT user_name FROM users WHERE user_id = #{userId}")
    String getUserNameById(String userId);

    @Select("SELECT password FROM users WHERE user_name = #{userName}")
    String getPasswordByUserName(String userName);

    @Select("INSERT INTO users(user_name, password)value(#{userName}, #{password})")
    String addNewUser(String userName, String password);
}
