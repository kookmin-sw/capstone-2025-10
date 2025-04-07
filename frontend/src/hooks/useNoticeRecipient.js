import { useState } from 'react';

const useNoticeRecipient = () => {
  // 메시지 발송 대상 상태
  const [phoneNumber, setPhoneNumber] = useState('');
  const [recipientList, setRecipientList] = useState([]);
  const [showGroupPopup, setShowGroupPopup] = useState(false);
  const [checkedGroups, setCheckedGroups] = useState({});

  // 더미 회원 그룹 데이터
  const dummyMemberGroups = [
    { id: 1, name: "일반 회원", count: 120, date: "2025.01.15" },
    { id: 2, name: "VIP 회원", count: 45, date: "2025.01.20" },
    { id: 3, name: "신규 가입자", count: 78, date: "2025.02.05" },
    { id: 4, name: "휴면 계정", count: 32, date: "2025.02.10" },
    { id: 5, name: "임직원", count: 18, date: "2025.02.15" },
  ];
  
  // 그룹 팝업 토글
  const toggleGroupPopup = () => {
    setShowGroupPopup(!showGroupPopup);
  };
  
  // 개별 그룹 체크박스 클릭 핸들러
  const handleGroupCheckboxClick = (id) => {
    setCheckedGroups(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // 선택한 그룹 추가 핸들러
  const handleAddSelectedGroups = () => {
    // 선택된 그룹 ID 배열
    const selectedGroupIds = Object.keys(checkedGroups)
      .filter(id => checkedGroups[id])
      .map(id => parseInt(id));
    
    // 선택된 그룹 정보 가져오기
    const selectedGroups = dummyMemberGroups.filter(group => 
      selectedGroupIds.includes(group.id)
    );
    
    // 선택된 그룹 처리 (예: 발송 대상에 추가)
    selectedGroups.forEach(group => {
      // 여기서는 간단하게 그룹 이름을 전화번호 목록에 추가하는 것으로 시뮬레이션
      // 실제로는 그룹에 속한 회원 전화번호를 모두 추가하는 로직이 필요
      if (!recipientList.includes(`그룹: ${group.name} (${group.count}명)`)) {
        setRecipientList([...recipientList, `그룹: ${group.name} (${group.count}명)`]);
      }
    });
    
    // 팝업 닫기
    toggleGroupPopup();
    
    // 체크박스 상태 초기화
    setCheckedGroups({});
  };

  // 그룹 선택 처리 핸들러
  const handleSelectGroups = (selectedGroups) => {
    // 선택된 그룹 처리
    selectedGroups.forEach(group => {
      if (!recipientList.includes(`그룹: ${group.name} (${group.count}명)`)) {
        setRecipientList([...recipientList, `그룹: ${group.name} (${group.count}명)`]);
      }
    });
  };

  return {
    phoneNumber,
    setPhoneNumber,
    recipientList,
    setRecipientList,
    showGroupPopup,
    toggleGroupPopup,
    dummyMemberGroups,
    checkedGroups,
    handleGroupCheckboxClick,
    handleAddSelectedGroups,
    handleSelectGroups
  };
};

export default useNoticeRecipient; 