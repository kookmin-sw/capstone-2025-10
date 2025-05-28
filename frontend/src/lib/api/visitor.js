import axios from "axios";

const API_BASE_URL = "https://back.offflow.co.kr/api";

// 백엔드 API 응답 데이터를 프론트엔드 형식으로 변환하는 함수
const transformVisitorData = (apiData) => {
  if (!apiData) {
    return null;
  }

  return {
    id: apiData.id,
    name: apiData.visitorName,
    phone: apiData.phoneNumber,
    date: apiData.registerDate
      ? new Date(apiData.registerDate).toLocaleDateString("ko-KR")
      : "-",
    visits: apiData.visitedCount || 0,
    // 추가 필드가 필요한 경우
    userId: apiData.userId || "-",
  };
};

// 특정 대시보드의 방문객 목록 가져오기
export const fetchVisitors = async (dashboardId = 1) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/visitors/${dashboardId}`,
      {
        withCredentials: true,
      },
    );

    // 응답 데이터를 프론트엔드 형식으로 변환
    return Array.isArray(response.data)
      ? response.data.map((visitor) => transformVisitorData(visitor))
      : [];
  } catch (error) {
    console.error(
      `대시보드 ID ${dashboardId}의 방문객 목록을 가져오는데 실패했습니다:`,
      error,
    );
    // 오류 발생 시 빈 배열 반환
    return [];
  }
};

// 특정 대시보드의 특정 방문객 정보 가져오기
export const fetchVisitorById = async (visitorId, dashboardId = 1) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/visitors/${dashboardId}/${visitorId}`,
      {
        withCredentials: true,
      },
    );
    // 응답 데이터를 프론트엔드 형식으로 변환
    return transformVisitorData(response.data);
  } catch (error) {
    console.error(
      `대시보드 ID ${dashboardId}의 방문객 ID ${visitorId} 정보를 가져오는데 실패했습니다:`,
      error,
    );
    // 오류 발생 시 null 반환
    return null;
  }
};

// 특정 대시보드에 새 방문객 생성하기
export const createVisitor = async (visitorData, dashboardId = 1) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/visitors/${dashboardId}`,
      visitorData,
    );
    return response.data;
  } catch (error) {
    console.error(
      `대시보드 ID ${dashboardId}에 방문객 생성에 실패했습니다:`,
      error,
    );
    throw error;
  }
};

// 특정 대시보드의 방문객 정보 업데이트하기
export const updateVisitor = async (
  visitorId,
  visitorData,
  dashboardId = 1,
) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/visitors/${dashboardId}/${visitorId}`,
      visitorData,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      `대시보드 ID ${dashboardId}의 방문객 ID ${visitorId} 정보 업데이트에 실패했습니다:`,
      error,
    );
    throw error;
  }
};

// 특정 대시보드의 방문객 삭제하기
export const deleteVisitor = async (visitorId, dashboardId = 1) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/visitors/${dashboardId}/${visitorId}`,
    );
    return response.data;
  } catch (error) {
    console.error(
      `대시보드 ID ${dashboardId}의 방문객 ID ${visitorId} 삭제에 실패했습니다:`,
      error,
    );
    throw error;
  }
};
