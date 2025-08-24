document.addEventListener('DOMContentLoaded', () => {

    // --- 1. إنشاء الهيدر الثابت ---
    const header = document.createElement('header');
    header.className = 'header';
    header.innerHTML = `
        <style>
            /* Header & Mobile Menu Styles */
            :root {
                --gradient: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%);
                --white: #fff;
                --accent-color: #ffd700;
                --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                --primary-color: #333;
            }

            .header {
                background: var(--gradient);
                color: var(--white);
                padding: 1rem 0;
                position: fixed;
                top: 0;
                width: 100%;
                z-index: 1000;
                box-shadow: var(--shadow);
            }

            .nav-container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                direction: rtl;
            }

            .logo {
                font-size: 1rem;
                font-weight: 700;
                color: var(--accent-color);
                text-decoration: none;
            }

            .nav-menu {
                display: flex;
                list-style: none;
                gap: 2rem;
                margin: 0;
                padding: 0;
            }

            .nav-menu a {
                color: var(--white);
                text-decoration: none;
                transition: color 0.3s ease;
                font-weight: 500;
            }

            .nav-menu a:hover {
                color: var(--accent-color);
            }

            .hamburger {
                display: none;
                flex-direction: column;
                cursor: pointer;
                gap: 4px;
            }

            .hamburger span {
                width: 25px;
                height: 3px;
                background-color: var(--white);
                transition: 0.3s;
            }

            /* قائمة الهاتف */
            .mobile-menu {
                position: fixed;
                top: 0;
                right: -100%; /* تكون مخفية في البداية */
                width: 33.33%; /* ثلث مساحة الشاشة */
                height: 100%;
                background: rgba(45, 90, 61, 0.95);
                backdrop-filter: blur(5px);
                z-index: 999;
                padding-top: 80px;
                transition: right 0.5s ease-in-out;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
            }

            .mobile-menu.active {
                right: 0;
            }
            
            .mobile-menu a {
                color: var(--white);
                text-decoration: none;
                font-size: 1rem;
                padding: 1rem 0;
                width: 100%;
                text-align: center;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                transition: background 0.3s ease;
            }

            .mobile-menu a:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
            
            /* لإخفاء القائمة العادية على شاشات الهاتف وإظهار زر القائمة */
            @media (max-width: 768px) {
                .nav-menu {
                    display: none;
                }
                .hamburger {
                    display: flex;
                }
            }

            /* لإخفاء زر القائمة على الشاشات الكبيرة */
            @media (min-width: 769px) {
                .mobile-menu {
                    display: none;
                }
            }
        </style>
        <div class="nav-container">
            <a href="index.html" class="logo"><img src="images/شعار.png" alt="الشيخ ابراهيم عبيدي"
            </a>
            <nav class="nav-menu">
                <a href="index.html">الرئيسية</a>
                <a href="about.html">من نحن</a>
                <a href="services.html">الخدمات</a>
                <a href="blog.html">المدونة</a>
                <a href="contact.html">اتصل بنا</a>
            </nav>
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    document.body.prepend(header);

    // إنشاء قائمة الهاتف بشكل منفصل
    const mobileMenu = document.createElement('nav');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
        <a href="index.html">الرئيسية</a>
        <a href="about.html">من نحن</a>
        <a href="services.html">الخدمات</a>
        <a href="blog.html">المدونة</a>
        <a href="contact.html">اتصل بنا</a>
    `;
    document.body.appendChild(mobileMenu);

    // إضافة مساحة فارغة أسفل الهيدر الثابت
    const headerSpacer = document.createElement('div');
    headerSpacer.style.height = '70px';
    document.body.prepend(headerSpacer);


    // --- 2. إنشاء الفوتر ---
    const footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML = `
        <style>
            .footer {
                background: #1a472a;
                color: var(--white);
                padding: 1rem 0 1rem;
                direction: rtl;
            }

            .footer-content {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 2rem;
                margin-bottom: 1rem;
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 1rem;
            }

            .footer-section h3 {
                color: var(--accent-color);
                margin-bottom: 1rem;
            }

            .footer-section a {
                color: var(--white);
                text-decoration: none;
                transition: color 0.3s ease;
            }

            .footer-section a:hover {
                color: var(--accent-color);
            }

            .social-links {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 15px;
                margin: 10px 0;
            }

            .social-links a {
                text-decoration: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: transform 0.3s ease;
            }

            .social-links a:hover {
                transform: scale(1.1);
            }

            .social-links img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .footer-bottom {
                text-align: center;
                margin-top: 2rem;
            }
        </style>
        <div class="footer-content">
            <div class="footer-section footer-about">
                <p> تابعنا على منصات التواصل الاجتماعي</p>
                <div class="social-links">
                    <a href="#" aria-label="فيسبوك"><img src="images/facebook.png" alt="facebook"></a>
                    <a href="#" aria-label="تويتر"><img src="images/x-button.png" alt="x-icon"></a>
                    <a href="#" aria-label="إنستغرام"><img src="images/instagram.png" alt="instagram"></a>
                    <a href="#" aria-label="يوتيوب"><img src="images/youtube.png" alt="youtube"></a>
                    <a href="#" aria-label="تيك توك"><img src="images/tiktok.png" alt="tiktok"></a>
                    <a href="#" aria-label="تليجرام"><img src="images/telegram.png" alt="telegram"></a>
                    <a href="#" aria-label="سناب شات"><img src="images/snapchat.png" alt="snapchat"></a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
   <div class="navbar">
  <a href="index.html">الرئيسية</a>
  <a href="about.html">تعريف بالشيخ</a>
  <a href="services.html">الخدمات</a>
  <a href="blog.html">المدونة</a>
  <a href="contact.html">اتصل بنا</a>
</div>

<style>
  .navbar {
    background-color: #1a472a; /* لون خلفية خفيف */
    padding: 5px;
    text-align: center; /* توسيط العناصر */
  }

  .navbar a {
    color: white; /* لون النص */
    text-decoration: none; /* إزالة الخط */
    margin: 0 5px; /* مسافة بين الروابط */
    font-size: 18px;
    font-weight: bold;
    transition: color 0.3s ease; /* تأثير ناعم عند التغيير */
  }

  .navbar a:hover {
    color: #e67e22; /* يتغير اللون عند المرور */
  }
</style>    
            <p>&copy; <span id="current-year"></span> الشيخ الروحاني ابراهيم عبيدي. جميع الحقوق محفوظة.</p>
        </div>
    `;
    document.body.appendChild(footer);

    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- 3. إنشاء زر واتساب عائم ونابض ---
    const whatsappDiv = document.createElement('div');
    whatsappDiv.className = 'whatsapp-float';
    whatsappDiv.innerHTML = `
        <style>
            .whatsapp-float {
                position: fixed;
               bottom: 30%;
                right: 20px;
                z-index: 999;
            }

            .whatsapp-btn {
                display: block;
                background-color: #25D366;
                color: white;
                width: 45px;
                height: 45px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
                transition: all 0.3s ease;
                animation: pulse 2s infinite;
                text-decoration: none;
            }

            @keyframes pulse {
                0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
                70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(37, 211, 102, 0); }
                100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
            }
            .whatsapp-btn img {
                width: 35px;
                height: 35px;
            }
        </style>
        <a href="https://wa.me/905370441838?text=السلام+عليكم+يا+شيخ" target="_blank" rel="noreferrer" aria-label="تواصل معنا عبر واتساب">
            <div class="whatsapp-btn">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="واتساب">
            </div>
        </a>
    `;
    document.body.appendChild(whatsappDiv);
    
    // --- 4. وظائف JavaScript للتحكم بالقائمة ---
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-menu');

    // فتح وإغلاق القائمة عند النقر على زر القائمة
    hamburger.addEventListener('click', (event) => {
        event.stopPropagation(); // منع انتقال النقر إلى الـ body
        mobileNav.classList.toggle('active');
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', (event) => {
        if (mobileNav.classList.contains('active') && !mobileNav.contains(event.target) && !hamburger.contains(event.target)) {
            mobileNav.classList.remove('active');
        }
    });

    // إغلاق القائمة عند النقر على أي رابط داخلها
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
        });
    });

});

