export class LanguageToggle {
  selectors = {
    root: '[data-js-toggle-lang]', // Селектор нашей кнопки языка
  }

  // Словарь переводов
  translations = {
    ru: {
      pageTitle: "Портфолио Максима Владимировича",
      authorName: "Максим Владимирович",
      authorProfession: "Начинающий фронтенд разработчик",
      heroBio1: "С июля 2025 года я системно изучаю фронтенд-разработку и подвожу итоги первого года. За это время я прошел путь от базовой верстки до создания интерактивных веб-приложений на чистом JavaScript.",
      heroBio2: "Сфокусирован на написании чистого, валидного и доступного (a11y) кода. Активно использую методологию БЭМ и модульный SCSS, что помогает формировать компонентное мышление и создавать масштабируемые интерфейсы.",
      heroBio3: "Сейчас углубляю знания в экосистеме React, использую Vite и генератор Minista (JSX) для создания как динамических приложений, так и быстрой статической верстки.",
      projectCategoryTitle: "Категория проектов",
      tabEducationalProjects: "Учебные проекты",
      tabMyProjects: "Мои проекты",
      projectFutureTechTitle: "Сайт Future-Tech",
      projectFutureTechDesc: "Сайт о новых технологиях и ИИ",
      projectCrossfitTitle: "Сайт CROSSFIT",
      projectCrossfitDesc: "Cайт (лендинг) для фитнес-клуба.",
      projectPositivusTitle: "Сайт POSITIVUS",
      projectPositivusDesc: "Лендинг для маркетингового агентства.",
      projectPortfolioTitle: "Сайт My Portfolio",
      projectPortfolioDesc: "Сайт - Мое портфолио.",
      skillsTitle: "Навыки и карта развития:",
      statusDone: "Освоено",
      statusProcess: "В процессе",
      statusPlanned: "В планах"
    },
    en: {
      pageTitle: "Maxim Vladimirovich's Portfolio",
      authorName: "Maxim Vladimirovich",
      authorProfession: "Junior Frontend Developer",
      heroBio1: "Since July 2025, I have been systematically studying frontend development and summarizing my first year. During this time, I went from basic layout design to building interactive web applications with Vanilla JavaScript.",
      heroBio2: "Focused on writing clean, valid, and accessible (a11y) code. Actively using BEM methodology and modular SCSS, which helps shape component-based thinking and build scalable interfaces.",
      heroBio3: "Currently deepening my knowledge in the React ecosystem, using Vite and the Minista (JSX) generator for creating both dynamic applications and fast static site builds.",
      projectCategoryTitle: "Project Category",
      tabEducationalProjects: "Educational Projects",
      tabMyProjects: "My Projects",
      projectFutureTechTitle: "Future-Tech Website",
      projectFutureTechDesc: "Website about new technologies and AI",
      projectCrossfitTitle: "CROSSFIT Website",
      projectCrossfitDesc: "Landing page for a fitness club.",
      projectPositivusTitle: "POSITIVUS Website",
      projectPositivusDesc: "Landing page for a marketing agency.",
      projectPortfolioTitle: "My Portfolio Website",
      projectPortfolioDesc: "Website - My Personal Portfolio.",
      btnSite: "Site",
      skillsTitle: "Skills & Roadmap:",
      statusDone: "Proficient",
      statusProcess: "In Progress",
      statusPlanned: "Planned"
    }
  }

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root)

    if (!this.rootElement) return

    this.init()
    this.bindEvents()
  }

  init() {
    // Проверяем память или ставим 'ru' по умолчанию
    const savedLang = localStorage.getItem('language') || 'ru'
    this.setLanguage(savedLang, false)
  }

  setLanguage(lang, save = true) {
    this.currentLang = lang

    // 1. Меняем атрибут lang у тега <html> (полезно для браузеров и скринридеров)
    document.documentElement.setAttribute('lang', lang)

    // 2. Меняем состояние aria-checked у кнопки (true, если английский)
    this.rootElement.setAttribute('aria-checked', lang === 'en')

    // 3. Находим все элементы на странице с атрибутом data-i18n и меняем текст
    const elements = document.querySelectorAll('[data-i18n]')

    elements.forEach((element) => {
      const key = element.getAttribute('data-i18n')
      // Если в словаре есть перевод для этого ключа — подставляем
      if (this.translations[lang] && this.translations[lang][key]) {
        element.textContent = this.translations[lang][key]
      }
    })

    // 4. Сохраняем в localStorage
    if (save) {
      localStorage.setItem('language', lang)
    }
  }

  onToggleClick = () => {
    // Переключаем с ru на en и обратно
    const newLang = this.currentLang === 'ru' ? 'en' : 'ru'
    this.setLanguage(newLang, true)
  }

  bindEvents() {
    this.rootElement.addEventListener('click', this.onToggleClick)
  }
}