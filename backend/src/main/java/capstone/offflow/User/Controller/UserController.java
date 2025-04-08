package capstone.offflow.User.Controller;


import capstone.offflow.User.Repository.UserRepository;
import capstone.offflow.User.Domain.User;
import capstone.offflow.User.Service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/users")
@Slf4j
public class UserController {

    private UserService userService;
    private UserRepository userRepository;

    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }


    //회원등록
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
            @RequestBody User user, BindingResult result){
        if (result.hasErrors()){
            Map<String, String> errors = new HashMap<>();
            result.getFieldErrors().forEach(error -> errors.put(error.getField(),
                    error.getDefaultMessage()));
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        try{
            User registeredUser = userService.registerUser(user);
            Map<String, String> response = new HashMap<>();
            response.put("message", "User registered successfully");
            return new ResponseEntity<>(registeredUser, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    //회원조회
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUser(
            @PathVariable (name = "userId") String userId){

        try{
            User user = userService.getUserById(userId);
            Map<String, String> response = new HashMap<>();
            response.put("userId", user.getUserId());
            response.put("companyName", user.getCompanyName());
            response.put("managerName", user.getManagerName());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    //회원삭제
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(
            @PathVariable(name = "userId") String userId){
        if (!userRepository.existsByUserId(userId)){
            Map<String, String> errors = new HashMap<>();
            errors.put("userId", "userId doen't exist");
            return new ResponseEntity<>(errors, HttpStatus.NOT_FOUND);
        }
        try{
            userService.deleteUser(userId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "User deleted successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}




