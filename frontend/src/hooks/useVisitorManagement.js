import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchUsers, mapUserFromBackend } from "@/lib/api/user";

// 예시용 방문객 데이터
const dummyVisitors = [
  { id: 1, name: "kea", phone: "010-1111-1111", date: "2025.01.01", visits: 1 },
  { id: 2, name: "theyday1", phone: "010-2222-2222", date: "2025.02.02", visits: 12 },
  { id: 3, name: "ashercom", phone: "010-3333-3333", date: "2025.03.03", visits: 5 },
  { id: 4, name: "jungdo1000", phone: "010-4444-4444", date: "2025.04.04", visits: 80 },
  { id: 5, name: "minjae97", phone: "010-5555-5555", date: "2025.05.05", visits: 3 },
  { id: 6, name: "devsunny", phone: "010-6666-6666", date: "2025.06.06", visits: 42 },
  { id: 7, name: "codeman", phone: "010-7777-7777", date: "2025.07.07", visits: 15 },
  { id: 8, name: "techstar", phone: "010-8888-8888", date: "2025.08.08", visits: 27 },
];

export default function useVisitorManagement() {
  const router = useRouter();
  // 체크박스 상태 관리
  const [checkedItems, setCheckedItems] = useState({});
  const [allChecked, setAllChecked] = useState(false);

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 페이지당 표시할 아이템 수

  // 검색 상태
  const [searchTerm, setSearchTerm] = useState("");
  
  // 방문객 데이터 상태
  const [visitors, setVisitors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // API에서 방문객 데이터 가져오기
  useEffect(() => {
    const getVisitors = async () => {
      setIsLoading(true);
      try {
        const data = await fetchUsers();
        // 백엔드 데이터를 프론트엔드 형식으로 변환
        const mappedData = data.map(user => mapUserFromBackend(user));
        setVisitors(mappedData);
        setError(null);
      } catch (err) {
        console.error("방문객 데이터 로딩 실패:", err);
        setError("방문객 데이터를 불러오는데 실패했습니다.");
        // 개발용 더미 데이터 사용 (실제 환경에서는 제거)
        setVisitors([
          { id: 1, name: "김민준", phone: "010-1234-1234", date: "2025.02.06", visits: 0 },
          { id: 2, name: "이서준", phone: "010-2345-2345", date: "2025.02.05", visits: 0 },
          { id: 3, name: "박도윤", phone: "010-3456-3456", date: "2025.02.04", visits: 0 },
          { id: 4, name: "최시우", phone: "010-4567-4567", date: "2025.02.03", visits: 0 },
          { id: 5, name: "강지호", phone: "010-5678-5678", date: "2025.02.02", visits: 0 }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    getVisitors();
  }, []);

  // 검색어로 필터링된 데이터
  const filteredVisitors = visitors.filter(visitor => 
    visitor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 현재 페이지의 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVisitors.slice(indexOfFirstItem, indexOfLastItem);

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(filteredVisitors.length / itemsPerPage);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 개별 체크박스 클릭 핸들러
  const handleCheckboxClick = (id) => {
    setCheckedItems(prev => {
      const newState = { ...prev, [id]: !prev[id] };

      // 모든 체크박스가 선택되었는지 확인
      const allSelected = visitors.every(visitor => newState[visitor.id]);
      setAllChecked(allSelected);

      return newState;
    });
  };

  // 전체 체크박스 클릭 핸들러
  const handleSelectAll = () => {
    const newAllChecked = !allChecked;
    setAllChecked(newAllChecked);

    const newCheckedItems = {};
    visitors.forEach(visitor => {
      newCheckedItems[visitor.id] = newAllChecked;
    });

    setCheckedItems(newCheckedItems);
  };

  // 상세보기 핸들러
  const handleDetail = (visitorId) => {
    router.push(`/member/detail/${visitorId}`);
  };

  return {
    visitors: currentItems,
    checkedItems,
    allChecked,
    currentPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    handlePageChange,
    handleCheckboxClick,
    handleSelectAll,
    handleDetail,
    isLoading,
    error
  };
} 