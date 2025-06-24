// preloader 
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');

  if (preloader) {
    preloader.classList.add('hidden'); 

    preloader.addEventListener('transitionend', () => {
      preloader.style.display = 'none';
    });
  }
});


// burger menu
const menu = document.querySelector(".navigation");
const menuItems = document.querySelectorAll(".menu__link");
const hamburger= document.querySelector(".hamburger");
const closeIcon= document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

function toggleMenu() {
  if (menu.classList.contains("showNavigation")) {
    menu.classList.remove("showNavigation");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("showNavigation");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}

hamburger.addEventListener("click", toggleMenu);

menuItems.forEach( 
  function(menuItem) { 
    menuItem.addEventListener("click", toggleMenu);
  }
)



// lang 
let currentLanguage = localStorage.getItem('language') || 'uk';

function switchLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('language', lang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    }
  });

  // Текстовий контент
  document.querySelectorAll('[data-en][data-uk]').forEach(element => {
    const html = element.getAttribute('data-' + lang);
    if (html) {
      element.innerHTML = html;
    }
  });

  // Атрибути
  const attributesToTranslate = ['placeholder', 'value', 'aria-label', 'title'];
  attributesToTranslate.forEach(attr => {
    document.querySelectorAll(`[data-${lang}-${attr}]`).forEach(el => {
      const translated = el.getAttribute(`data-${lang}-${attr}`);
      if (translated) {
        el.setAttribute(attr, translated);
      }
    });
  });

  document.documentElement.setAttribute('lang', lang);
  console.log('Language switched to:', lang);
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.lang-btn').forEach(button => {
    button.addEventListener('click', function () {
      const lang = this.getAttribute('data-lang');
      switchLanguage(lang);
    });
  });

  switchLanguage(currentLanguage);
});

// modal 
document.addEventListener('DOMContentLoaded', () => {
function disableScroll() {
  document.documentElement.classList.add('modal-open');
  document.body.classList.add('modal-open');
}

function enableScroll() {
  document.documentElement.classList.remove('modal-open');
  document.body.classList.remove('modal-open');
}

  document.querySelectorAll('.open-modal').forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const modal = document.getElementById(targetId);
      if (!modal) return;

      modal.classList.remove('hide');
      modal.classList.add('show');
      modal.style.display = 'block';

      disableScroll();
    });
  });


document.querySelectorAll('.modal .close').forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    const modal = closeBtn.closest('.modal');
    if (!modal) return;

    modal.classList.remove('show');
    modal.classList.add('hide');

    setTimeout(() => {
      modal.style.display = 'none';
      enableScroll();
    }, 400);
  });
});

window.addEventListener('click', e => {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('show');
    e.target.classList.add('hide');

    setTimeout(() => {
      e.target.style.display = 'none';
      enableScroll();
    }, 400);
  }
});

  document.querySelectorAll('.form-board').forEach(form => {
    const radioOwner = form.querySelector('.radio-owner');
    const radioManager = form.querySelector('.radio-manager');
    const employeesWrapper = form.querySelector('.employees-wrapper');

    if (radioOwner && radioManager && employeesWrapper) {
      radioOwner.addEventListener('change', () => {
        if (radioOwner.checked) {
          employeesWrapper.style.display = 'block';
        }
      });

      radioManager.addEventListener('change', () => {
        if (radioManager.checked) {
          employeesWrapper.style.display = 'none';
        }
      });
    }
  });
  document.querySelectorAll('.modal form').forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const lang = document.documentElement.lang || 'uk';

      const errors = [];

      const nameInput = form.querySelector('[name="name"]');
      if (validator.isEmpty(nameInput.value.trim())) {
        errors.push(lang === 'uk' ? "Будь ласка, введіть ім’я та прізвище" : "Please enter your full name");
      }

      const phoneInput = form.querySelector('[name="phone"]');
      if (!validator.isNumeric(phoneInput.value.trim()) || phoneInput.value.trim().length !== 9) {
        errors.push(lang === 'uk' ? "Невірний номер телефону" : "Invalid phone number");
      }

      const emailInput = form.querySelector('[name="email"]');
      if (!validator.isEmail(emailInput.value.trim())) {
        errors.push(lang === 'uk' ? "Невірний email" : "Invalid email");
      }

      const cityInput = form.querySelector('[name="city"]');
      if (validator.isEmpty(cityInput.value.trim())) {
        errors.push(lang === 'uk' ? "Будь ласка, введіть місто" : "Please enter your city");
      }

      const consentCheckbox = form.querySelector('[name="consent"]');
      if (!consentCheckbox.checked) {
        errors.push(lang === 'uk' ? "Потрібно дати згоду" : "Consent is required");
      }

      if (errors.length > 0) {
        alert(errors.join('\n'));
        return;
      }

      // Якщо все ок — відправляємо
      const formData = new FormData(form);
      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
          const submitButton = form.querySelector('button[type="submit"]');
          const successText = submitButton.getAttribute(`data-${lang}-success`) || "Заявка відправлена ✓";
          submitButton.textContent = successText;
          form.reset();
        } else {
          showAlertByLang(lang, 'error');
        }
      }).catch(() => {
        showAlertByLang(lang, 'connectionError');
      });
    });
  });

});
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('input[name="phone"]').forEach(input => {
    window.intlTelInput(input, {
      initialCountry: "ua",
      preferredCountries: ["ua"],
      separateDialCode: true,
      showFlags: true,
      utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js"
    });
  });
});


// carousel 
const slides = document.getElementById('carouselSlides');

slides.innerHTML += slides.innerHTML;

let scrollPosition = 0;
const speed = 0.7;

function step() {
  scrollPosition += speed;
  if(scrollPosition >= slides.scrollWidth / 2) {
    scrollPosition = 0;
  }
  slides.style.transform = `translateX(${-scrollPosition}px)`;
  requestAnimationFrame(step);
}

step();


// animation 
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

sections.forEach((section, index) => {
  if (!section.closest('header') && !section.closest('footer')) {
    section.classList.add('section-animate');

    if (index === 0) {
      setTimeout(() => {
        section.classList.add('first-visible');
      }, 200); 
    } else {
      observer.observe(section);
    }
  }
});


// timer 
function animateNumber(el, endValue, duration = 1500) {
  let start = 0;
  const increment = endValue / (duration / 16);
  const update = () => {
    start += increment;
    if (start >= endValue) {
      el.textContent = `${endValue}+`;
    } else {
      el.textContent = `${Math.floor(start)}+`;
      requestAnimationFrame(update);
    }
  };
  requestAnimationFrame(update);
}

const statisticsSection = document.querySelector('.statistics');
let numbersAnimated = false;

if (statisticsSection) {
  const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !numbersAnimated) {
        const numbers = statisticsSection.querySelectorAll('.information__content-num');
        numbers.forEach(numEl => {
          const rawNumber = parseInt(numEl.textContent.replace(/\D/g, ''), 10);
          animateNumber(numEl, rawNumber, 1800);
        });
        numbersAnimated = true;
      }
    });
  }, {
    threshold: 0.2
  });

  numberObserver.observe(statisticsSection);
}