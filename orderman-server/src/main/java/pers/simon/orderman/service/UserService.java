package pers.simon.orderman.service;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import pers.simon.orderman.model.request.LoginRequest;
import pers.simon.orderman.model.request.RegisterRequest;
import pers.simon.orderman.model.response.LoginResponse;
import pers.simon.orderman.model.response.RegisterResponse;

@Service
@Component
public interface UserService {
    public LoginResponse login(LoginRequest loginRequest);
    public RegisterResponse register(RegisterRequest registerRequest);
}
