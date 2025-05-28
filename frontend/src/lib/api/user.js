import axios from "axios";

const API_BASE_URL = "https://back.offflow.co.kr/api";

// 모든 방문객 목록 조회
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("사용자 목록 조회 실패:", error);
    throw error;
  }
};

// 특정 방문객 정보 조회
export const fetchUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`사용자 ID ${userId} 조회 실패:`, error);
    throw error;
  }
};

// 방문객 생성
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error("사용자 생성 실패:", error);
    throw error;
  }
};

// 방문객 정보 업데이트
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/users/${userId}`,
      userData,
    );
    return response.data;
  } catch (error) {
    console.error(`사용자 ID ${userId} 업데이트 실패:`, error);
    throw error;
  }
};

// 방문객 삭제
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`사용자 ID ${userId} 삭제 실패:`, error);
    throw error;
  }
};

// 백엔드 데이터를 프론트엔드 형식으로 변환
export const mapUserFromBackend = (user) => {
  return {
    id: user.id,
    name: user.userName, // 백엔드: userName -> 프론트엔드: name
    phone: user.phoneNumber, // 백엔드: phoneNumber -> 프론트엔드: phone
    date: formatDate(user.reservationDate), // 백엔드: reservationDate -> 프론트엔드: date
    visits: 0, // 백엔드에서 제공하지 않는 정보, 기본값 설정
    userId: `user_${user.id}`, // 기본 사용자 ID 형식 설정
    registerDate: formatDate(user.registerDate),
    privacyAccepted: user.privacyAccepted,
    serviceAccepted: user.serviceAccepted,
  };
};

// 날짜 포맷 변환 함수 (예: '2025-02-06 21:20:48' -> '2025.02.06')
function formatDate(dateString) {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}
