export class LanguageToggle {
  selectors = {
    root: '[data-js-toggle-lang]', // Селектор нашей кнопки языка
  }

  // Словарь переводов
  translations = {
    ru: {
      "title-1": "Это текст который будет меняться 1",
      "title-2": "Это текст который будет меняться 2",
      "title-3": "Это текст который будет меняться 3"
    },
    en: {
      "title-1": "This is text that will change 1",
      "title-2": "This is text that will change 2",
      "title-3": "This is text that will change 3"
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