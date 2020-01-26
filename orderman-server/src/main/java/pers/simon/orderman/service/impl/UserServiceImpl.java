package pers.simon.orderman.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pers.simon.orderman.mapper.UserMapper;
import pers.simon.orderman.model.request.UserNameRequest;
import pers.simon.orderman.model.response.UserNameResponse;
import pers.simon.orderman.service.UserService;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    UserMapper userMapper;

    public UserNameResponse getUserNameById(String userId) {
        String userName = userMapper.getUserNameById(userId);
        return new UserNameResponse(userName);
    }
}
