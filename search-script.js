// search.js
document.addEventListener("DOMContentLoaded", function () {
    // ==============================
    // 1. إنشاء صندوق البحث + القائمة المنسدلة
    // ==============================
    let searchBox = document.createElement("div");
    searchBox.innerHTML = `
        <div style="position:fixed;top:10px;right:10px;z-index:9999;background:#fff;
                    border:1px solid #ccc;padding:5px; margin-right:15%;  border-radius:8px;
                    box-shadow:0 2px 6px rgba(0,0,0,0.2);width:40%;font-family:sans-serif;">
            <input type="text" id="keywordInput" 
                placeholder="ابحث عن طلبك داخل موقعنا..." 
                style="width:100%;padding:6px;border:1px solid #ccc;border-radius:4px;">
            <div id="suggestions" 
                style="position:absolute;background:#fff;border:1px solid #ccc;
                       border-top:none;width:100%;max-height:100%;overflow-y:auto;
                       display:none;margin-top:2px;border-radius:0 0 4px 4px;
                       box-shadow:0 2px 6px rgba(0,0,0,0.2);">
            </div>
        </div>
    `;
    document.body.appendChild(searchBox);

    // ==============================
    // 2. تعريف الصفحات والكلمات المفتاحية
    // ==============================
    const sitePages = [
        { title: "الرئيسية", url: "index.html", keywords: ["شيخ روحاني", "جلب الحبيب", "علاج السحر"] },
        { title: "من نحن", url: "about.html", keywords: ["تعريف", "خبرة روحانية", "فك السحر"] },
        { title: "الخدمات", url: "services.html", keywords: ["خدمات روحانية", "جلب الزوج", "تحصين"] },
        { title: "المدونة", url: "blog.html", keywords: ["مقالات روحانية", "قصص نجاح", "اسرار الروحانيات"] }
    ];

    let input = document.getElementById("keywordInput");
    let suggestions = document.getElementById("suggestions");

    // ==============================
    // 3. عند الكتابة في مربع البحث
    // ==============================
    input.addEventListener("keyup", function () {
        let query = input.value.trim();
        suggestions.innerHTML = "";

        if (query.length < 2) {
            suggestions.style.display = "none";
            return;
        }

        let found = [];

        // البحث في الصفحات والكلمات المفتاحية
        sitePages.forEach(page => {
            page.keywords.forEach(kw => {
                if (kw.includes(query)) {
                    found.push(`<div class="suggest-item" 
                                    style="padding:6px;cursor:pointer;
                                           border-bottom:1px solid #eee;"
                                    data-url="${page.url}">
                                    ${page.title} ➝ ${kw}
                                </div>`);
                }
            });
        });

        // عرض النتائج
        if (found.length > 0) {
            suggestions.innerHTML = found.join("");
            suggestions.style.display = "block";
        } else {
            suggestions.style.display = "none";
        }

        // إضافة حدث النقر على كل عنصر
        document.querySelectorAll(".suggest-item").forEach(item => {
            item.addEventListener("click", function () {
                window.location.href = this.getAttribute("data-url");
            });
        });
    });

    // ==============================
    // 4. إخفاء القائمة عند النقر خارجها
    // ==============================
    document.addEventListener("click", function (e) {
        if (!searchBox.contains(e.target)) {
            suggestions.style.display = "none";
        }
    });
});
