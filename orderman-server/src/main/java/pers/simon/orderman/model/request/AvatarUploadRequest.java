package pers.simon.orderman.model.request;

import org.springframework.web.multipart.MultipartFile;

public class AvatarUploadRequest {
    private MultipartFile multipartFile;

    public MultipartFile getMultipartFile() {
        return multipartFile;
    }

    public void setMultipartFile(MultipartFile multipartFile) {
        this.multipartFile = multipartFile;
    }
}
