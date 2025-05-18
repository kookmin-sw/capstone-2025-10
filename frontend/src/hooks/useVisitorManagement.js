import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchVisitors, deleteVisitor } from "@/lib/api/visitor";

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
  // 방문자 목록 상태
  const [visitors, setVisitors] = useState([]);
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

  // 방문자 데이터 로드
  useEffect(() => {
    const loadVisitors = async () => {
      try {
        setLoading(true);
        const data = await fetchVisitors();
        setVisitors(data);
        setError(null);
      } catch (err) {
        console.error("방문자 목록을 로드하는 중 오류 발생:", err);
        setError("방문자 목록을 로드하는데 실패했습니다.");
        // 개발용 더미 데이터 사용 (실제 환경에서는 제거)
        setVisitors([
          { id: 1, name: "kea", phone: "010-1111-1111", date: "2025.01.01", visits: 1 },
          { id: 2, name: "theyday1", phone: "010-2222-2222", date: "2025.02.02", visits: 12 },
          { id: 3, name: "ashercom", phone: "010-3333-3333", date: "2025.03.03", visits: 5 },
          { id: 4, name: "jungdo1000", phone: "010-4444-4444", date: "2025.04.04", visits: 80 },
          { id: 5, name: "minjae97", phone: "010-5555-5555", date: "2025.05.05", visits: 3 },
          { id: 6, name: "devsunny", phone: "010-6666-6666", date: "2025.06.06", visits: 42 },
          { id: 7, name: "codeman", phone: "010-7777-7777", date: "2025.07.07", visits: 15 },
          { id: 8, name: "techstar", phone: "010-8888-8888", date: "2025.08.08", visits: 27 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadVisitors();
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

  // 선택된 방문자 삭제 핸들러
  const handleDeleteSelected = async () => {
    const selectedIds = Object.keys(checkedItems)
      .filter(id => checkedItems[id])
      .map(id => parseInt(id));

    if (selectedIds.length === 0) {
      alert("삭제할 방문자를 선택해주세요.");
      return;
    }

    if (confirm(`선택한 ${selectedIds.length}명의 방문자를 삭제하시겠습니까?`)) {
      try {
        // 선택된 방문자들 삭제
        for (const id of selectedIds) {
          await deleteVisitor(id);
        }

        // 삭제 후 목록 다시 로드
        const updatedVisitors = await fetchVisitors();
        setVisitors(updatedVisitors);
        
        // 체크박스 상태 초기화
        setCheckedItems({});
        setAllChecked(false);
        
        alert("선택한 방문자가 삭제되었습니다.");
      } catch (error) {
        console.error("방문자 삭제 중 오류 발생:", error);
        alert("방문자 삭제에 실패했습니다.");
      }
    }
  };

  return {
    visitors: currentItems,
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
    handleDeleteSelected
  };
} 