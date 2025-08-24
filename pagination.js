document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const pageLinks = document.querySelectorAll('.pagination-links .page-numbers:not(.prev-btn):not(.next-btn)');
    const currentPageSpan = document.getElementById('current-page');

    // تحديد الصفحة الحالية من الرابط في شريط العنوان
    let currentPage = 1;
    const url = window.location.pathname;
    const pageMatch = url.match(/page-(\d+)\.html/);
    if (pageMatch) {
        currentPage = parseInt(pageMatch[1], 10);
    }

    // تحديث الصفحة الحالية في العرض
    currentPageSpan.textContent = currentPage;

    // تحديث حالة أزرار التنقل عند تحميل الصفحة
    updatePaginationButtons();

    // إضافة مستمع حدث لزر "التالي"
    nextBtn.addEventListener('click', (e) => {
        if (!nextBtn.classList.contains('disabled')) {
            e.preventDefault();
            const nextPage = currentPage + 1;
            navigateToPage(nextPage);
        }
    });

    // إضافة مستمع حدث لزر "السابق"
    prevBtn.addEventListener('click', (e) => {
        if (!prevBtn.classList.contains('disabled')) {
            e.preventDefault();
            const prevPage = currentPage - 1;
            navigateToPage(prevPage);
        }
    });

    // وظيفة التنقل إلى الصفحة
    function navigateToPage(pageNumber) {
        if (pageNumber > 0 && pageNumber <= 9) { // 9 هو إجمالي عدد الصفحات
            let pageUrl = 'blog.html';
            if (pageNumber > 1) {
                pageUrl = `page-${pageNumber}.html`;
            }
            window.location.href = pageUrl;
        }
    }

    // وظيفة لتحديث حالة أزرار التنقل (إلغاء تفعيلها)
    function updatePaginationButtons() {
        if (currentPage <= 1) {
            prevBtn.classList.add('disabled');
        } else {
            prevBtn.classList.remove('disabled');
        }

        if (currentPage >= 9) { // 9 هو إجمالي عدد الصفحات
            nextBtn.classList.add('disabled');
        } else {
            nextBtn.classList.remove('disabled');
        }

        // تحديث روابط الأرقام
        pageLinks.forEach(link => {
            link.classList.remove('active');
            if (parseInt(link.textContent) === currentPage) {
                link.classList.add('active');
            }
        });
    }
});