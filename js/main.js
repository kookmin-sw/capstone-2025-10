// 스크롤 이벤트 핸들러
window.addEventListener('scroll', function() {
    // 헤더 배경색 변경
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(68, 129, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        header.style.padding = '15px 0';
    } else {
        header.style.background = 'transparent';
        header.style.boxShadow = 'none';
        header.style.padding = '20px 0';
    }
});

// 페이지 로드 시 애니메이션 효과
document.addEventListener('DOMContentLoaded', function() {
    // 헤더 요소 페이드인
    const header = document.querySelector('header');
    header.style.opacity = '0';
    setTimeout(() => {
        header.style.transition = 'opacity 1s ease';
        header.style.opacity = '1';
    }, 300);

    // 히어로 섹션 콘텐츠 페이드인
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(20px)';
    setTimeout(() => {
        heroContent.style.transition = 'all 1s ease';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 500);

    // 히어로 서클 마우스 인터랙션 설정
    setupHeroCircleInteraction();

    // 섹션 스크롤 효과 준비
    prepareScrollAnimations();
    
    // 모든 버튼에 대한 이벤트 핸들러 추가 (service-inquiry-btn 제외)
    document.querySelectorAll('.primary-btn, .outline-btn, .dark-btn').forEach(button => {
        // login-btn 클래스가 포함되어 있지 않은 경우에만 이벤트 리스너 추가
        if (!button.classList.contains('service-inquiry-btn')) {
            button.addEventListener('click', function(e) {
                // 특정 링크가 있는 경우에만 기본 동작 허용
                if (this.tagName !== 'A' || !this.getAttribute('href') || this.getAttribute('href') === '#') {
                    e.preventDefault();
                }
                console.log('버튼 클릭됨:', this.textContent.trim());
            });
        }
    });
});

// 히어로 서클 마우스 인터랙션
function setupHeroCircleInteraction() {
    const heroCircle = document.querySelector('.hero-circle');
    const heroLogo = document.querySelector('.hero-logo');
    const heroSection = document.querySelector('.hero');
    
    if (!heroCircle || !heroSection) return;
    
    // 디버깅용 메시지
    console.log('패럴랙스 효과 설정됨');
    
    heroSection.addEventListener('mousemove', (e) => {
        // 마우스 위치를 0~1 범위로 정규화
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // 원 이동 범위 (픽셀)
        const moveRange = 30;
        
        // 마우스 반대 방향으로 이동 (0.5를 중심으로)
        const moveX = (0.5 - mouseX) * moveRange * 2;
        const moveY = (0.5 - mouseY) * moveRange * 2;
        
        // 로고는 반대 방향으로 약간 이동
        const logoMoveX = (mouseX - 0.5) * moveRange * 0.5;
        const logoMoveY = (mouseY - 0.5) * moveRange * 0.5;
        
        // 원 이동 적용
        heroCircle.style.transform = `translate(${moveX}px, ${moveY}px)`;
        
        // 로고 이동 적용
        if (heroLogo) {
            heroLogo.style.transform = `translate(${logoMoveX}px, ${logoMoveY}px)`;
        }
        
        // 디버깅용 콘솔 출력
        if (Math.random() < 0.01) { // 간헐적으로 출력하여 콘솔 부담 감소
            console.log(`원 이동: (${moveX.toFixed(2)}, ${moveY.toFixed(2)})`);
        }
    });
    
    // 마우스가 영역을 벗어나면 원래 위치로
    heroSection.addEventListener('mouseleave', () => {
        heroCircle.style.transform = 'translate(0, 0)';
        if (heroLogo) {
            heroLogo.style.transform = 'translate(0, 0)';
        }
    });
}

// 스크롤 애니메이션 설정
function prepareScrollAnimations() {
    // 애니메이션을 적용할 요소들
    const animatedElements = [
        '.section-header',
        '.stat-card',
        '.solution-card',
        '.feature-card',
        '.step',
        '.dashboard-content'
    ];

    // IntersectionObserver 생성
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // 각 요소에 스타일 적용 및 observer 등록
    animatedElements.forEach(selector => {
        document.querySelectorAll(selector).forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `all 0.8s ease ${index * 0.1}s`;
            
            observer.observe(element);
        });
    });

    // 애니메이션 클래스가 적용되었을 때의 스타일
    const style = document.createElement('style');
    style.textContent = `
        .animated {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
} 