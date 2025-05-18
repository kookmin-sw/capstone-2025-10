import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

// 모든 방문자 목록 가져오기
export const fetchVisitors = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/visitors`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("방문자 목록을 가져오는데 실패했습니다:", error);
    // 오류 발생 시 빈 배열 반환
    return [];
  }
};

// 특정 방문자 정보 가져오기
export const fetchVisitorById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/visitors/${id}`);
    return response.data;
  } catch (error) {
    console.error(`방문자 ID ${id}의 정보를 가져오는데 실패했습니다:`, error);
    // 오류 발생 시 null 반환
    return null;
  }
};

// 새 방문자 생성하기
export const createVisitor = async (visitorData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/visitors`, visitorData);
    return response.data;
  } catch (error) {
    console.error("방문자 생성에 실패했습니다:", error);
    throw error;
  }
};

// 방문자 정보 업데이트하기
export const updateVisitor = async (id, visitorData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/visitors/${id}`,
      visitorData,
    );
    return response.data;
  } catch (error) {
    console.error(`방문자 ID ${id}의 정보 업데이트에 실패했습니다:`, error);
    throw error;
  }
};

// 방문자 삭제하기
export const deleteVisitor = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/visitors/${id}`);
    return response.data;
  } catch (error) {
    console.error(`방문자 ID ${id}의 삭제에 실패했습니다:`, error);
    throw error;
  }
};
