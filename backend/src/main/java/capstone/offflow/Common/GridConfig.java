package capstone.offflow.Common;

import org.springframework.stereotype.Component;

import java.util.List;


/**
 * 좌표범위 - 도메인 규칙이자 설정값
 * 컴포넌트로 분리
 */
@Component
public class GridConfig {
    private final int gridRows = 10;
    private final int gridCols = 10;

    public int getMaxPosition(){
        return gridRows * gridCols;
    }

    public boolean isValidPosition(int position){
        return position >= 1 && position <= getMaxPosition();
    }

    // 유효한 좌표 범위 체크 -> isValidPosition활용
    // 실제 Service class 에서 사용할 Method
    public boolean areAllPositionsValid(List<String> positions) {
        return positions.stream().allMatch(pos -> {
            try {
                int val = Integer.parseInt(pos);
                return isValidPosition(val);
            } catch (NumberFormatException e) {
                return false;
            }
        });
    }

    //중복 좌표 체크
    public boolean hasDuplicate(List<String> positions) {
        return positions.size() != positions.stream().distinct().count();
    }
}
