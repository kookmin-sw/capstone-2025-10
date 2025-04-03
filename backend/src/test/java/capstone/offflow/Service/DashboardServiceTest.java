package capstone.offflow.Service;

import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Dashboard.Domain.DashboardMetadata;
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
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
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
    @DisplayName("대시보드 조회 테스트 - 성공 (메타데이터 포함)")
    void getDashboardTest() {
        // given
        DashboardMetadata metadata = new DashboardMetadata(
                "testPopup",
                "서울시 강남구",
                "트렌드",
                "홍보용"
        );

        Dashboard dashboard = new Dashboard();
        dashboard.setId(1L);
        dashboard.setDashboardName("testname");
        dashboard.setStartDate(new Date());
        dashboard.setMetadata(metadata);
        dashboard.setUser(testUser); // user도 꼭 넣어줘야 findByIdAndUser 매칭됨

        when(dashboardRepository.findByIdAndUser(1L, testUser))
                .thenReturn(Optional.of(dashboard));

        // when
        DashboardDto result = dashboardService.getDashboardById(1L, testUser);

        // then
        assertThat(result).isNotNull();
        assertThat(result.getDashboardName()).isEqualTo("testname");
        assertThat(result.getMetadataDto()).isNotNull();
        assertThat(result.getMetadataDto().getPopupName()).isEqualTo("testPopup");

        log.info("조회된 DTO: {}", result);
    }


    @Test
    @DisplayName("대시보드 조회 실패 - 존재하지 않는 ID")
    void getDashboard_NotFound() {
        // given
        when(dashboardRepository.findByIdAndUser(999L, testUser))
                .thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> dashboardService.getDashboardById(999L, testUser))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("해당 id의 유저를 찾을 수 없습니다.");
    }


    @Test
    @DisplayName("대시보드 조회 실패 - 다른 유저의 대시보드 접근")
    void getDashboard_WrongUserTest() {
        // given
        when(dashboardRepository.findByIdAndUser(1L, testUser))
                .thenReturn(Optional.empty()); // user 조건 안 맞음

        // when & then
        assertThatThrownBy(() -> dashboardService.getDashboardById(1L, testUser))
                .isInstanceOf(RuntimeException.class);
    }


    @Test
    @DisplayName("대시보드 삭제 테스트 - 성공")
    void deleteDashboardTest() {
        // given
        Dashboard dashboard = new Dashboard();
        dashboard.setId(1L);
        dashboard.setDashboardName("삭제할 대시보드");
        dashboard.setUser(testUser);

        when(dashboardRepository.findByIdAndUser(1L, testUser))
                .thenReturn(Optional.of(dashboard));

        // when
        dashboardService.deleteDashboard(1L, testUser);

        // then
        verify(dashboardRepository, times(1)).delete(dashboard);
    }


    @Test
    @DisplayName("대시보드 삭제 테스트 - 실패 : 다른 사용자 대시보드 삭제시도")
    void deleteDashboard_WrongUserTest() {
        // given
        when(dashboardRepository.findByIdAndUser(1L, testUser))
                .thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> dashboardService.deleteDashboard(1L, testUser))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("삭제할 대시보드를 찾을 수 없습니다");
    }


}
