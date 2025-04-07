package capstone.offflow.User.Repository;

import capstone.offflow.User.Domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {


    //유저 조회
    Optional<User> findByUserId(String userId); //Optional : 값이 없을수있다는것을 의미

    //유저 아이디 중복 확인
    boolean existsByUserId(String userId);

    //유저 삭제
    void deleteUserByUserId(String userId);

}
