package capstone.offflow.User.Service;

import capstone.offflow.User.Domain.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

/**
 * Spring Security가
 * User Entity를 알 수 있도록
 * UserDetails 형태로 감싸주는 중간 래퍼 클래스 (시큐리티가 이해할 수 있는 사용자 형태 변환)
 */

@RequiredArgsConstructor
@Getter
@Setter
public class UserPrincipal implements UserDetails {

    private final User user;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        return user.getPassword(); //인코딩된 비밀번호
    }

    @Override
    public String getUsername() {
        return user.getUserId(); //로그인에 사용할 ID
    }

    //계정상태 관련 설정
    @Override public boolean isAccountNonExpired(){
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }

    
}
