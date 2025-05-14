package capstone.offflow.Common;


import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;


@Getter
@AllArgsConstructor
public class ExceptionResponse {

    private String message;
    private int status;
    private LocalDateTime timestamp;

    /**
     * Error Message 담는 method
     */
    public static ExceptionResponse of(String message, int status){
        return new ExceptionResponse(message, status, LocalDateTime.now());
    }
}
