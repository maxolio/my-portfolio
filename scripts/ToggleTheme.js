export class ThemeToggle {

  selectors = {
    root: '[data-js-theme-toggle]',
  }

  constructor() {

    this.rootElement = document.querySelector(this.selectors.root)

    if (!this.rootElement) return

    this.init()
    this.bindEvents()
  }

  init() {
    const savedTheme = localStorage.getItem('theme')

    const initialTheme = savedTheme ? savedTheme : 'dark'

    this.setTheme(initialTheme, false)
  }

  setTheme(theme, save = true) {
    this.currentTheme = theme

    document.documentElement.setAttribute('data-theme', theme)

    const isLight = theme === 'light'
    this.rootElement.setAttribute('aria-checked', isLight)

    if (save) {
      localStorage.setItem('theme', theme)
    }
  }

  onToggleClick = () => {

    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark'
    this.setTheme(newTheme, true)
  }

  bindEvents() {
    this.rootElement.addEventListener('click', this.onToggleClick)
  }
}