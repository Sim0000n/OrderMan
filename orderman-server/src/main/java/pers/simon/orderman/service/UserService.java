package pers.simon.orderman.service;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import pers.simon.orderman.model.request.UserNameRequest;
import pers.simon.orderman.model.response.UserNameResponse;

@Service
@Component
public interface UserService {
    public UserNameResponse getUserNameById(String userId);
}
