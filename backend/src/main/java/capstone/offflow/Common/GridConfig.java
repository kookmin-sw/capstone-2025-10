package capstone.offflow.Common;

import org.springframework.stereotype.Component;


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
}
