package capstone.offflow.User.Service;

import capstone.offflow.User.Domain.User;
import capstone.offflow.User.Repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;


@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    //회원 조회
    @Override
    public User getUserById(String userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
    }

    //회원 등록
    @Override
    public User registerUser(User user){
        //이미 존재할 경우 409 conflict error
        if (userRepository.existsByUserId(user.getUserId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        log.info("User {} registered", user);
        return userRepository.save(user);
    }

    //회원 삭제
    @Override
    public void deleteUser(String userId) {
        userRepository.deleteUserByUserId(userId);
    }
}