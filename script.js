// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initFAQ();
    initContactForm();
    initScrollAnimations();
    initWhatsAppButton();
    
    // Set current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// FAQ Accordion
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const toggle = this.querySelector('.faq-toggle');
            
            // Close all other FAQ items
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    const otherAnswer = otherQuestion.nextElementSibling;
                    const otherToggle = otherQuestion.querySelector('.faq-toggle');
                    otherAnswer.classList.remove('active');
                    otherToggle.classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            answer.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    });
}

// Contact Form Handler
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate form
            if (validateForm(formObject)) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="loading"></span> جاري الإرسال...';
                submitBtn.disabled = true;
                
                // Send email using EmailJS or Formspree
                sendEmail(formObject)
                    .then(() => {
                        // Reset button
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        
                        // Show success modal
                        showSuccessModal();
                        
                        // Reset form
                        this.reset();
                    })
                    .catch((error) => {
                        console.error('Error sending email:', error);
                        
                        // Reset button
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        
                        // Show error message
                        showErrors(['حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى أو التواصل عبر الواتساب.']);
                    });
            }
        });
    }
}

// Send Email Function
async function sendEmail(data) {
    // Using EmailJS service (you need to set up EmailJS account)
    const emailData = {
        to_email: '7ro7ane7@gmail.com',
        from_name: data.fullName,
        whatsapp: data.whatsapp,
        email: data.email,
        country: data.country,
        service: data.service,
        message: data.message,
        timestamp: new Date().toLocaleString('ar-SA')
    };
    
    // For now, we'll simulate the email sending
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // In production, replace this with actual email service
            console.log('Email would be sent:', emailData);
            resolve();
        }, 2000);
    });
}

// Form Validation
function validateForm(data) {
    const errors = [];
    
    if (!data.fullName || data.fullName.trim().length < 2) {
        errors.push('يرجى إدخال الاسم الكامل');
    }
    
    if (!data.whatsapp || !isValidWhatsApp(data.whatsapp)) {
        errors.push('يرجى إدخال رقم واتساب صحيح');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('يرجى إدخال بريد إلكتروني صحيح');
    }
    
    if (!data.country) {
        errors.push('يرجى اختيار البلد');
    }
    
    if (!data.service) {
        errors.push('يرجى اختيار نوع الخدمة');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('يرجى كتابة رسالة مفصلة (10 أحرف على الأقل)');
    }
    
    if (errors.length > 0) {
        showErrors(errors);
        return false;
    }
    
    return true;
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// WhatsApp Number Validation
function isValidWhatsApp(number) {
    const whatsappRegex = /^[\+]?[1-9][\d]{7,14}$/;
    return whatsappRegex.test(number.replace(/\s/g, ''));
}

// Show Validation Errors
function showErrors(errors) {
    const errorHtml = errors.map(error => `<p style="color: red; margin: 5px 0;">• ${error}</p>`).join('');
    
    // Create or update error container
    let errorContainer = document.getElementById('form-errors');
    if (!errorContainer) {
        errorContainer = document.createElement('div');
        errorContainer.id = 'form-errors';
        errorContainer.style.cssText = 'background: #fee; border: 1px solid #fcc; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;';
        
        const form = document.getElementById('contact-form');
        form.insertBefore(errorContainer, form.firstChild);
    }
    
    errorContainer.innerHTML = `<h4 style="color: red; margin-bottom: 10px;">يرجى تصحيح الأخطاء التالية:</h4>${errorHtml}`;
    
    // Scroll to errors
    errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remove errors after 5 seconds
    setTimeout(() => {
        if (errorContainer) {
            errorContainer.remove();
        }
    }, 5000);
}

// Success Modal
function showSuccessModal() {
    // Create modal if it doesn't exist
    let modal = document.getElementById('success-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'success-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h3>✅ تم إرسال الرسالة بنجاح</h3>
                <p>شكراً لتواصلك معنا. سوف يتصل بك الشيخ إبراهيم عبيدي قريباً إن شاء الله.</p>
                <p><small>سيتم إعادة توجيهك للصفحة الرئيسية خلال <span id="countdown">3</span> ثوانٍ...</small></p>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.close');
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Show modal
    modal.style.display = 'block';
    
    // Countdown and redirect
    let countdown = 3;
    const countdownElement = document.getElementById('countdown');
    
    const countdownInterval = setInterval(() => {
        countdown--;
        if (countdownElement) {
            countdownElement.textContent = countdown;
        }
        
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            modal.style.display = 'none';
            window.location.href = 'index.html';
        }
    }, 1000);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .blog-card, .faq-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// WhatsApp Button Functionality
function initWhatsAppButton() {
    const whatsappBtn = document.querySelector('.whatsapp-float');
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get page title for context
            const pageTitle = document.title;
            const message = `السلام عليكم ورحمة الله وبركاته\nأريد التواصل معكم بخصوص الخدمات الروحانية.\n\nالصفحة: ${pageTitle}\nالموقع: ${window.location.href}`;
            
            const whatsappURL = `https://wa.me/905370441838?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, '_blank');
        });
        
        // Add hover effect
        whatsappBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        whatsappBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

// Smooth Scroll for Internal Links
document.addEventListener('click', function(e) {
    const target = e.target.closest('a[href^="#"]');
    if (target) {
        e.preventDefault();
        const targetId = target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});


    


// Language Toggle (if needed)
function toggleLanguage() {
    const body = document.body;
    body.classList.toggle('en');
    
    // Save language preference
    const isEnglish = body.classList.contains('en');
    localStorage.setItem('language', isEnglish ? 'en' : 'ar');
}

// Load saved language preference
document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'en') {
        document.body.classList.add('en');
    }
});

    // Hide preloader when page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
            }, 500);
        }, 1000);
    });


// Initialize preloader
initPreloader();

// Form Auto-save (for long forms)
function initFormAutoSave() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Load saved value
            const savedValue = localStorage.getItem(`form_${form.id}_${input.name}`);
            if (savedValue && input.type !== 'password') {
                input.value = savedValue;
            }
            
            // Save value on change
            input.addEventListener('input', function() {
                if (this.type !== 'password') {
                    localStorage.setItem(`form_${form.id}_${this.name}`, this.value);
                }
            });
        });
        
        // Clear saved data on successful submit
        form.addEventListener('submit', function() {
            inputs.forEach(input => {
                localStorage.removeItem(`form_${form.id}_${input.name}`);
            });
        });
    });
}

// Initialize form auto-save
document.addEventListener('DOMContentLoaded', function() {
    initFormAutoSave();
});

// Performance optimization
function optimizeImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading="lazy" for better performance
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Add error handling
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
    });
}

// Initialize image optimization
document.addEventListener('DOMContentLoaded', function() {
    optimizeImages();
});
// تحميل الأجزاء المشتركة
function loadComponent(id, file) {
  fetch(file)
    .then(res => res.text())
    .then(data => document.getElementById(id).innerHTML = data)
    .then(() => {
      // تفعيل القائمة بعد تحميل الهيدر
      if (file === "header.html") {
        const toggle = document.querySelector(".menu-toggle");
        const links = document.querySelector(".nav-links");
        toggle.addEventListener("click", () => {
          links.classList.toggle("active");
        });
        document.addEventListener("click", (e) => {
          if (!toggle.contains(e.target) && !links.contains(e.target)) {
            links.classList.remove("active");
          }
        });
      }
    });
}

// استدعاء الملفات
loadComponent("header", "header.html");
loadComponent("footer", "footer.html");

// تحميل الهيدر
fetch("header.html")
  .then(res => res.text())
  .then(data => document.getElementById("header-placeholder").innerHTML = data);

// تحميل الفوتر
fetch("footer.html")
  .then(res => res.text())
  .then(data => document.getElementById("footer-placeholder").innerHTML = data);
