package capstone.offflow.Service;

import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Dashboard.Dto.DashboardDto;
import capstone.offflow.Dashboard.Dto.MetadataDto;
import capstone.offflow.Dashboard.Repository.DashboardRepository;
import capstone.offflow.Dashboard.Service.DashboardServiceImpl;
import capstone.offflow.User.Domain.User;
import capstone.offflow.User.Repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Date;
import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@Slf4j
public class DashboardServiceTest {

    @InjectMocks
    private DashboardServiceImpl dashboardService;

    @Mock
    private DashboardRepository dashboardRepository;

    @Mock
    private UserRepository userRepository;

    //공통 테스트 유저
    private final User testUser = new User();


    @BeforeEach
    void setUp(){
        testUser.setUserId("user1");
    }

    @Test
    @DisplayName("대시보드 생성 테스트 - 성공")
    void createDashboardTest(){
        //given
        MetadataDto metadataDto = MetadataDto.builder()
                .popupName("testPopup")
                .address("서울시 강남구")
                .topic("트렌드")
                .popupPurpose("홍보용")
                .build();

        DashboardDto dto  = DashboardDto.builder()
                .dashboardName("testname")
                .startDate(new Date())
                .metadataDto(metadataDto) //메타데이터 추가
                .build();

        when(dashboardRepository.save(any(Dashboard.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        //when
        dashboardService.createDashboard(dto, testUser);

        //then
        verify(dashboardRepository, times(1)).save(any(Dashboard.class));

    }

    @Test
    @DisplayName("대시보드 조회 테스트 - 성공")
    void getDashboardTest(){
        //given

        //when

        //then


    }


    @Test
    @DisplayName("대시보드 조회 테스트 - 실패 : 존재하지않음")
    void getDashboard_NotfoundTest(){
        //given

        //when

        //then


    }

    @Test
    @DisplayName("대시보드 조회 테스트 - 실패 : 다른 사용자 대시보드접근")
    void getDashboard_WrongUserTest(){
        //given

        //when

        //then


    }

    @Test
    @DisplayName("대시보드 삭제 테스트 - 성공")
    void deleteDashboardTest(){
        //given

        //when

        //then


    }

    @Test
    @DisplayName("대시보드 삭제 테스트 - 실패 : 다른사용자 대시보드 삭제")
    void deleteDashboard_WrongUserTest(){
        //given

        //when

        //then


    }

}
