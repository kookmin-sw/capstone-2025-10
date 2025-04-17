package capstone.offflow.Vision.Service.Redis;

/**
 * Redis : 인메모리 데이터 구조 저장소
 * 빠른 속도로 데이터 읽고 쓸 수 있음
 * 사용 : 캐싱, 세션관리, 실시간 분석
 */

public interface VisionRedisService {

    void cacheData(String key, Object data);

    void flushCacheToDatabase();
}
