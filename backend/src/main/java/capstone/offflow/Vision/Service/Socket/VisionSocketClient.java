package capstone.offflow.Vision.Service.Socket;

import capstone.offflow.Vision.Service.Kafka.KafkaMessageWrapper;
import capstone.offflow.Vision.Service.Kafka.VisionKafkaProducer;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.Socket;

@Slf4j
@Component
@RequiredArgsConstructor
public class VisionSocketClient {

    private final VisionKafkaProducer visionKafkaProducer;
    private final ObjectMapper objectMapper;

    @Value("${vision.server.ip}")
    private String visionServerIp;

    @Value("${vision.server.port}")
    private int visionServerPort;

    private Socket socket;
    private BufferedReader in;

    /**
     * SpringBoot가 시작될 때 소켓 연결
     */
    @PostConstruct
    public void init() {
        connectToVisionServer();
    }

    /**
     * VisionServer로 소켓 연결
     */
    public void connectToVisionServer() {
        try {
            socket = new Socket(visionServerIp, visionServerPort);
            in = new BufferedReader(new InputStreamReader(socket.getInputStream()));

            log.info("✅ Connected to Vision Server at {}:{}", visionServerIp, visionServerPort);

            // 데이터를 계속 읽는 쓰레드 시작
            new Thread(this::listen).start();

        } catch (Exception e) {
            log.error("❌ Failed to connect to Vision Server: {}", e.getMessage());
            reconnectWithDelay();
        }
    }

    /**
     * Vision Server로부터 데이터 읽기
     */
    public void listen() {
        String inputLine;
        try {
            while ((inputLine = in.readLine()) != null) {
                log.info("📥 Received data from Vision Server: {}", inputLine);

                // Vision Server가 보내는 JSON을 KafkaMessageWrapper로 변환
                KafkaMessageWrapper wrapper = objectMapper.readValue(inputLine, KafkaMessageWrapper.class);

                // Kafka로 전송
                visionKafkaProducer.sendVisionData(wrapper);
            }
        } catch (Exception e) {
            log.error("❌ Connection lost: {}", e.getMessage());
            reconnectWithDelay();
        }
    }

    /**
     * 소켓 연결 실패 시 5초 후 재시도
     */
    public void reconnectWithDelay() {
        try {
            Thread.sleep(5000);
            connectToVisionServer();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
