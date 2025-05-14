package capstone.offflow.User.Service;

import capstone.offflow.User.Domain.User;

public interface UserService {

    //회원정보 조회
    User getUserById(String userId);

    //회원정보 등록
    User registerUser(User user);

    //회원정보 삭제
    void deleteUser(String userId);

}
