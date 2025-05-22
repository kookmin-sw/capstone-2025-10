/**
 * 페이지 애니메이션 효과 관리
 */
document.addEventListener('DOMContentLoaded', function() {
    // 애니메이션 요소들 표시
    setTimeout(function() {
        const animatedElements = document.querySelectorAll('.animated');
        animatedElements.forEach(function(element) {
            element.classList.add('show');
        });
    }, 300);
    
    // 스크롤 이벤트에 따른 애니메이션
    const handleScrollAnimation = () => {
        const scrollElements = document.querySelectorAll('.scroll-animate');
        
        scrollElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('show');
            }
        });
    };
    
    // 초기 로드 시 실행
    handleScrollAnimation();
    
    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', handleScrollAnimation);
}); 