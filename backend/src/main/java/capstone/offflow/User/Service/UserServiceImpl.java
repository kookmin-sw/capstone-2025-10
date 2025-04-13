package capstone.offflow.User.Service;

import capstone.offflow.User.Domain.User;
import capstone.offflow.User.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;



@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;


    //해당 userId가 존재하는지 검증 method
    //로직상 실패 VS 시스템 오류를 구분해서 예외처리 필요
    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId )); //throw -> 상황이 실패임을 보여줌
        return new UserPrincipal(user);
    }


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