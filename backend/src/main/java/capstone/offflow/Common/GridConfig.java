package capstone.offflow.Common;

import capstone.offflow.Dashboard.Domain.Section;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Set;


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
                int val = Integer.parseInt(pos.trim()); //trim으로 공백 제거
                return isValidPosition(val);
            } catch (NumberFormatException e) {
                return false;
            }
        });
    }

    //body안에 중복 좌표 체크
    public boolean hasDuplicate(List<String> positions) {
        Set<String> seen = new HashSet<>();
        for (String pos : positions) {
            String trimmed = pos.trim();
            if (!seen.add(trimmed)) {
                return true; // 이미 본 값이면 중복 발견
            }
        }
        return false;
    }

    //대시보드 내 좌표 중복 체크 로직
    public boolean hasConflictWithExistingSections(List<String> newPositions, List<Section> existingSections) {
        Set<String> occupied = new HashSet<>();
        for (Section section : existingSections) {
            occupied.addAll(section.getPositionList());
        }

        for (String pos : newPositions) {
            if (occupied.contains(pos.trim())) {
                return true; // 이미 존재하는 좌표와 충돌
            }
        }
        return false; // 충돌 없음
    }
}
