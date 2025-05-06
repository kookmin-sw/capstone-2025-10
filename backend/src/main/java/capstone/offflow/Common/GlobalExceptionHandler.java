package capstone.offflow.Common;


import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Map;


@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    /**
     * 잘못된 요청 파라미터나 비즈니스 로직 예외 처리 -> 서비스 , 도메인 로직 내부예외
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ExceptionResponse> handleIllegalArg(IllegalArgumentException e){
        log.warn("잘못된 요청: {}", e.getMessage());
        return ResponseEntity
                .badRequest()
                .body(ExceptionResponse.of(e.getMessage(), HttpStatus.BAD_REQUEST.value()));
    }


    /**
     * Entity가 DB에 존재하지 않을떄 (ex: 대시보드 없음)
     */
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleNotFound(EntityNotFoundException e){
        log.warn("Entity 찾을 수 없음: {}", e.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ExceptionResponse.of(e.getMessage(), HttpStatus.NOT_FOUND.value()));
    }

    /**
     * @Validate 실패시 발생하는 예외
     * (예 : DTO에서 @NotBlank, @Size등 유효성 검증 실패)
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleValidationException(MethodArgumentNotValidException e){
        StringBuilder sb = new StringBuilder();
        e.getBindingResult().getFieldErrors().forEach(error ->
                sb.append(String.format("[%s]: %s. ", error.getField(), error.getDefaultMessage()))
        );

        log.warn("유효성 검증 실패: {}", sb);
        return ResponseEntity
                .badRequest()
                .body(ExceptionResponse.of("요청 값이 유효하지않습니다 : " + sb, HttpStatus.BAD_REQUEST.value()));
    }

    /**
     * 권한 거부 예외처리
     */
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ExceptionResponse> handleAccessDenied(AccessDeniedException e) {
        log.warn("권한 거부: {}", e.getMessage());
        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(ExceptionResponse.of(e.getMessage(), HttpStatus.FORBIDDEN.value()));
    }


    /**
     * 아이디, 비밀번호 틀렸을 때 로그인 예외처리
     */
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<?> handleResponseStatusException(ResponseStatusException ex) {
        return ResponseEntity.status(ex.getStatusCode())
                .body(Map.of(
                        "message", ex.getReason(),
                        "status", ex.getStatusCode().value(),
                        "timestamp", LocalDateTime.now()
                ));
    }


    /**
     * 그 외 모든 예외 처리 (예상 못한 서버 오류)
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse> handleGeneral(Exception e){
        log.error("서버 내부 오류 발생", e);
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ExceptionResponse.of("서버 내부 오류 발생", 500));
    }


}
