package pers.simon.orderman.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pers.simon.orderman.mapper.UserMapper;
import pers.simon.orderman.model.request.LoginRequest;
import pers.simon.orderman.model.request.RegisterRequest;
import pers.simon.orderman.model.response.LoginResponse;
import pers.simon.orderman.model.response.RegisterResponse;
import pers.simon.orderman.service.UserService;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    UserMapper userMapper;

    public LoginResponse login(LoginRequest loginRequest) {
        String password = userMapper.getPasswordByUserName(loginRequest.getUserName());
        if(password == null) {
            return new LoginResponse("", 2);
        } else if(!password.equals(loginRequest.getPassword())) {
            return new LoginResponse(loginRequest.getUserName(), 3);
        } else {
            return new LoginResponse(loginRequest.getUserName(), 1);
        }
    }

    public RegisterResponse register(RegisterRequest registerRequest) {

    }
}
