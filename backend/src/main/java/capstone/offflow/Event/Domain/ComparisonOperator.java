package capstone.offflow.Event.Domain;

import lombok.Getter;

import java.util.Arrays;

@Getter
public enum ComparisonOperator {

    EQUAL("같음") {
        public boolean evaluate(double left, double right) {
            return left == right;
        }
    },
    NOT_EQUAL("같지 않음") {
        public boolean evaluate(double left, double right) {
            return left != right;
        }
    },
    GREATER_THAN("다음값보다 큼") {
        public boolean evaluate(double left, double right) {
            return left > right;
        }
    },
    GREATER_THAN_OR_EQUAL("다음값보다 크거나 같음") {
        public boolean evaluate(double left, double right) {
            return left >= right;
        }
    },
    LESS_THAN("다음값보다 작음") {
        public boolean evaluate(double left, double right) {
            return left < right;
        }
    },
    LESS_THAN_OR_EQUAL("다음값보다 작거나 같음") {
        public boolean evaluate(double left, double right) {
            return left <= right;
        }
    };

    private final String displayName;

    ComparisonOperator(String displayName) {
        this.displayName = displayName;
    }

    public abstract boolean evaluate(double left, double right);

    public String getDisplayName() {
        return displayName;
    }

    public static ComparisonOperator from(String name) {
        return Arrays.stream(values())
                .filter(op -> op.displayName.equals(name))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("지원하지 않는 연산자입니다: " + name));
    }
}
