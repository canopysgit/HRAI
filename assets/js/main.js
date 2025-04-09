// 暗色模式切换
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    themeIcon.className = isDark ? 'fas fa-moon text-gray-700' : 'fas fa-sun text-gray-700';
    localStorage.setItem('darkMode', isDark);
}

// 初始化主题
const savedTheme = localStorage.getItem('darkMode');
if (savedTheme === 'true') {
    document.documentElement.classList.add('dark');
    themeIcon.className = 'fas fa-moon text-gray-700';
}

themeToggle.addEventListener('click', toggleDarkMode);

// 滚动动画和初始化
document.addEventListener('DOMContentLoaded', function() {
    // 滚动动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // 初始化模态框事件监听
    initModalEvents();
});

// 初始化所有模态框事件
function initModalEvents() {
    // VISIER模态框
    const visierModal = document.getElementById('imageCarouselModal');
    if (visierModal) {
        visierModal.addEventListener('click', function(e) {
            if (e.target === this || e.target.classList.contains('modal-close')) {
                closeImageCarousel();
            }
        });
    }

    // IBM模态框
    const ibmModal = document.getElementById('ibmCarouselModal');
    if (ibmModal) {
        ibmModal.addEventListener('click', function(e) {
            if (e.target === this || e.target.classList.contains('modal-close')) {
                closeIbmImageCarousel();
            }
        });
    }
}

// 初始化轮播
let visierSwiper = null;
let ibmSwiper = null;

function initSwiper(type) {
    const config = {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoHeight: true,
        observer: true,
        observeParents: true,
        on: {
            init: function() {
                checkNavigationStatus(this);
            },
            slideChange: function() {
                checkNavigationStatus(this);
            }
        }
    };

    if (type === 'visier') {
        if (visierSwiper) {
            visierSwiper.destroy();
            visierSwiper = null;
        }
        const container = document.querySelector('.swiper-container');
        if (!container) return;
        visierSwiper = new Swiper('.swiper-container', config);
        checkNavigationStatus(visierSwiper);
    } else if (type === 'ibm') {
        if (ibmSwiper) {
            ibmSwiper.destroy();
            ibmSwiper = null;
        }
        const container = document.querySelector('.ibm-swiper-container');
        if (!container) return;
        ibmSwiper = new Swiper('.ibm-swiper-container', config);
        checkNavigationStatus(ibmSwiper);
    }
}

function checkNavigationStatus(swiper) {
    if (swiper.isBeginning) {
        swiper.navigation.prevEl.style.opacity = '0.35';
        swiper.navigation.prevEl.style.cursor = 'not-allowed';
    }
    if (swiper.isEnd) {
        swiper.navigation.nextEl.style.opacity = '0.35';
        swiper.navigation.nextEl.style.cursor = 'not-allowed';
    }
}

function openImageCarousel(type) {
    const modal = document.getElementById(type === 'visier' ? 'imageCarouselModal' : 'ibmCarouselModal');
    if (!modal) return;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // 确保在模态框显示后再初始化轮播
    requestAnimationFrame(() => {
        initSwiper(type);
        if (type === 'visier' && visierSwiper) {
            visierSwiper.update();
            visierSwiper.slideTo(0, 0);
        } else if (type === 'ibm' && ibmSwiper) {
            ibmSwiper.update();
            ibmSwiper.slideTo(0, 0);
        }
    });
}

let swiper = null;

function initSwiper() {
    if (swiper) {
        swiper.destroy();
    }
    
    swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        keyboard: {
            enabled: true,
        },
    });
}

function openImageCarousel() {
    const modal = document.getElementById('imageCarouselModal');
    if (!modal) return;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        initSwiper();
    }, 100);
}

function closeImageCarousel() {
    const modal = document.getElementById('imageCarouselModal');
    if (!modal) return;
    
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    if (swiper) {
        swiper.destroy();
        swiper = null;
    }
}

// 点击模态框背景关闭
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageCarouselModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeImageCarousel();
            }
        });
    }
});

function closeIbmImageCarousel() {
    const modal = document.getElementById('ibmCarouselModal');
    if (!modal) return;
    
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    
    if (ibmSwiper) {
        ibmSwiper.destroy();
        ibmSwiper = null;
    }
}

// 打开赛道模态框
let track1Swiper = null;
let track2Swiper = null;

// 存储所有轮播实例
let swiperInstances = {};

function openTrackModal(trackId) {
    const modal = document.getElementById(`${trackId}Modal`);
    if (!modal) return;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // 初始化轮播
    if (!swiperInstances[trackId]) {
        swiperInstances[trackId] = new Swiper(`#${trackId}Modal .swiper-container`, {
            slidesPerView: 1,
            spaceBetween: 30,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            keyboard: {
                enabled: true,
            },
        });
    }
}

function closeTrackModal(trackId) {
    const modal = document.getElementById(`${trackId}Modal`);
    if (!modal) return;
    
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    
    // 销毁轮播实例
    if (swiperInstances[trackId]) {
        swiperInstances[trackId].destroy();
        swiperInstances[trackId] = null;
    }
}

// 点击模态框背景关闭
document.addEventListener('DOMContentLoaded', function() {
    const trackModals = document.querySelectorAll('[id^="track"]');
    trackModals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                const trackId = this.id.replace('Modal', '');
                closeTrackModal(trackId);
            }
        });
    });
});