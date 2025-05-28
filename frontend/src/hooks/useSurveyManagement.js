import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { fetchSurveys, deleteSurvey } from "@/lib/api/survey";

// 예시용 설문조사 데이터
const dummySurveys = [
  {
    id: 1,
    title: "상품 만족도 조사",
    createdAt: "2025.01.01",
    responseCount: 24,
    status: "진행중",
  },
  {
    id: 2,
    title: "서비스 개선 설문",
    createdAt: "2025.02.02",
    responseCount: 42,
    status: "진행중",
  },
  {
    id: 3,
    title: "사용자 경험 조사",
    createdAt: "2025.03.03",
    responseCount: 18,
    status: "종료",
  },
  {
    id: 4,
    title: "프로모션 효과 측정",
    createdAt: "2025.04.04",
    responseCount: 36,
    status: "진행중",
  },
  {
    id: 5,
    title: "브랜드 인지도 조사",
    createdAt: "2025.05.05",
    responseCount: 53,
    status: "종료",
  },
  {
    id: 6,
    title: "고객 만족도 조사",
    createdAt: "2025.06.06",
    responseCount: 29,
    status: "진행중",
  },
  {
    id: 7,
    title: "팝업스토어 설문",
    createdAt: "2025.07.07",
    responseCount: 105,
    status: "진행중",
  },
  {
    id: 8,
    title: "신규 서비스 평가",
    createdAt: "2025.08.08",
    responseCount: 77,
    status: "종료",
  },
];

// API에서 설문 응답 데이터 가져오기
async function fetchSurveyAnswers() {
  try {
    console.log(
      "API 요청 시작: https://back.offflow.co.kr/api/survey/1/surveyAnswer",
    );

    const response = await fetch(
      "https://back.offflow.co.kr/api/survey/1/surveyAnswer",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // 필요한 경우 인증 헤더 추가
          // 'Authorization': 'Bearer YOUR_TOKEN_HERE',
        },
        credentials: "include", // 쿠키 포함
        mode: "cors", // CORS 지원
      },
    );

    if (!response.ok) {
      const errorMsg = `API 요청 실패: 상태 코드 ${response.status} - ${response.statusText}`;
      console.error(errorMsg);

      // 403 오류의 경우 특별한 처리
      if (response.status === 403) {
        console.warn("접근 권한이 없습니다. 더미 데이터를 사용합니다.");
      }

      // 서버 오류 시 더미 데이터 반환
      return generateDummySurveyAnswers();
    }

    const data = await response.json();
    console.log("API 응답 데이터 성공적으로 수신:", data);
    return data;
  } catch (error) {
    console.error("설문 응답 데이터 가져오기 실패:", error.message || error);
    console.warn(
      "네트워크 오류 또는 CORS 문제가 발생했을 수 있습니다. 더미 데이터를 사용합니다.",
    );
    // 오류 발생 시 더미 데이터 반환
    return generateDummySurveyAnswers();
  }
}

// 더미 설문 응답 데이터 생성 함수
function generateDummySurveyAnswers() {
  return [
    {
      id: 101,
      registerDate: "2023-05-18T12:30:00",
      ageQuestion: "20대",
      genderQuestion: "남자",
    },
    {
      id: 102,
      registerDate: "2023-05-19T14:20:00",
      ageQuestion: "30대",
      genderQuestion: "여자",
    },
    {
      id: 103,
      registerDate: "2023-05-20T09:15:00",
      ageQuestion: "40대",
      genderQuestion: "남자",
    },
    {
      id: 104,
      registerDate: "2023-05-21T16:40:00",
      ageQuestion: "20대",
      genderQuestion: "여자",
    },
    {
      id: 105,
      registerDate: "2023-05-22T11:05:00",
      ageQuestion: "50대 이상",
      genderQuestion: "남자",
    },
    {
      id: 106,
      registerDate: "2023-05-23T13:50:00",
      ageQuestion: "10대",
      genderQuestion: "여자",
    },
    {
      id: 107,
      registerDate: "2023-05-24T10:30:00",
      ageQuestion: "30대",
      genderQuestion: "남자",
    },
    {
      id: 108,
      registerDate: "2023-05-25T15:20:00",
      ageQuestion: "20대",
      genderQuestion: "여자",
    },
  ];
}

export default function useSurveyManagement() {
  const router = useRouter();
  // 설문조사 목록 상태
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 체크박스 상태 관리
  const [checkedItems, setCheckedItems] = useState({});
  const [allChecked, setAllChecked] = useState(false);

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 페이지당 표시할 아이템 수

  // 검색 상태
  const [searchTerm, setSearchTerm] = useState("");

  // 설문조사 데이터 로드
  useEffect(() => {
    const loadSurveys = async () => {
      try {
        setLoading(true);
        const data = await fetchSurveyAnswers();

        // API 응답 데이터 형식에 맞게 매핑 (필요시 수정)
        const formattedData = Array.isArray(data)
          ? data.map((item) => ({
            id: item.id || "",
            registerDate: item.registerDate || "",
            ageQuestion: item.ageQuestion || "",
            genderQuestion: item.genderQuestion || "",
          }))
          : [];

        console.log("처리된 설문 응답 데이터:", formattedData);
        setSurveys(formattedData);
        setError(null);
      } catch (err) {
        console.error("설문조사 응답 목록을 로드하는 중 오류 발생:", err);
        setError("설문조사 응답 목록을 로드하는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadSurveys();
  }, []);

  // 설문조사 목록 새로고침 함수
  const refreshSurveys = async () => {
    try {
      setLoading(true);
      const data = await fetchSurveyAnswers();

      // API 응답 데이터 형식에 맞게 매핑 (필요시 수정)
      const formattedData = Array.isArray(data)
        ? data.map((item) => ({
          id: item.id || "",
          registerDate: item.registerDate || "",
          ageQuestion: item.ageQuestion || "",
          genderQuestion: item.genderQuestion || "",
        }))
        : [];

      console.log("새로고침된 설문 응답 데이터:", formattedData);
      setSurveys(formattedData);
      setError(null);

      // 체크박스 상태 초기화
      setCheckedItems({});
      setAllChecked(false);
    } catch (err) {
      console.error("설문조사 응답 목록 새로고침 중 오류 발생:", err);
      setError("설문조사 응답 목록을 새로고침하는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 검색어로 필터링된 데이터 - ID로 검색하도록 변경
  const filteredSurveys = surveys.filter(
    (survey) => survey.id && survey.id.toString().includes(searchTerm),
  );

  // 현재 페이지의 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSurveys.slice(indexOfFirstItem, indexOfLastItem);

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(filteredSurveys.length / itemsPerPage);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 개별 체크박스 클릭 핸들러
  const handleCheckboxClick = (id) => {
    setCheckedItems((prev) => {
      const newState = { ...prev, [id]: !prev[id] };

      // 모든 체크박스가 선택되었는지 확인
      const allSelected = surveys.every((survey) => newState[survey.id]);
      setAllChecked(allSelected);

      return newState;
    });
  };

  // 전체 체크박스 클릭 핸들러
  const handleSelectAll = () => {
    const newAllChecked = !allChecked;
    setAllChecked(newAllChecked);

    const newCheckedItems = {};
    surveys.forEach((survey) => {
      newCheckedItems[survey.id] = newAllChecked;
    });

    setCheckedItems(newCheckedItems);
  };

  // 상세보기 핸들러
  const handleDetail = (surveyId) => {
    router.push(`/survey/detail/${surveyId}`);
  };

  // 선택된 설문조사 응답 삭제 핸들러 (API 연동 필요)
  const handleDeleteSelected = async () => {
    const selectedIds = Object.keys(checkedItems)
      .filter((id) => checkedItems[id])
      .map((id) => parseInt(id));

    if (selectedIds.length === 0) {
      alert("삭제할 설문조사 응답을 선택해주세요.");
      return;
    }

    if (
      confirm(
        `선택한 ${selectedIds.length}개의 설문조사 응답을 삭제하시겠습니까?`,
      )
    ) {
      try {
        // 실제 API 연동 구현 필요
        // 임시로 삭제된 설문조사를 필터링하여 표시
        setSurveys(
          surveys.filter((survey) => !selectedIds.includes(survey.id)),
        );

        // 체크박스 상태 초기화
        setCheckedItems({});
        setAllChecked(false);

        alert("선택한 설문조사 응답이 삭제되었습니다.");
      } catch (error) {
        console.error("설문조사 응답 삭제 중 오류 발생:", error);
        alert("설문조사 응답 삭제에 실패했습니다.");
      }
    }
  };

  return {
    surveys: currentItems,
    checkedItems,
    allChecked,
    currentPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    loading,
    error,
    handlePageChange,
    handleCheckboxClick,
    handleSelectAll,
    handleDetail,
    handleDeleteSelected,
    refreshSurveys,
  };
}
