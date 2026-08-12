const rootSelector = '[data-js-tabs]'

class Tabs {
  selectors = {
    root: rootSelector,
    button: '[data-js-tabs-button]',
    content: '[data-js-tabs-content]',
  }

  stateClasses = {
    isActive: 'is-active',
  }

  stateAttributes = {
    ariaSelected: 'aria-selected',
    tabIndex: 'tabindex',
  }

  constructor(rootElement) {
    this.rootElement = rootElement
    this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button)
    this.contentElements = this.rootElement.querySelectorAll(this.selectors.content)

    // Ищем индекс активной кнопки при старте (исправлен return)
    const initialIndex = [...this.buttonElements].findIndex((buttonElement) =>
      buttonElement.classList.contains(this.stateClasses.isActive)
    )

    this.state = {
      // Если ни у одной кнопки нет класса 'is-active', берем 0 (первую вкладку)
      activeTabIndex: initialIndex !== -1 ? initialIndex : 0,
    }

    this.limitTabsIndex = this.buttonElements.length - 1

    // Инициализируем UI при старте, чтобы выставленный tabindex и aria соответствовали состоянию
    this.updateUi()
    this.bindEvents()
  }

  updateUi() {
    const { activeTabIndex } = this.state

    this.buttonElements.forEach((buttonElement, index) => {
      const isActive = index === activeTabIndex

      buttonElement.classList.toggle(this.stateClasses.isActive, isActive)
      buttonElement.setAttribute(this.stateAttributes.ariaSelected, isActive.toString())
      buttonElement.setAttribute(this.stateAttributes.tabIndex, isActive ? '0' : '-1')
    })

    this.contentElements.forEach((contentElement, index) => {
      const isActive = index === activeTabIndex

      contentElement.classList.toggle(this.stateClasses.isActive, isActive)
    })
  }

  onButtonClick(buttonIndex) {
    this.state.activeTabIndex = buttonIndex
    this.updateUi()
  }

  bindEvents() {
    this.buttonElements.forEach((buttonElement, index) => {
      buttonElement.addEventListener('click', () => {
        this.onButtonClick(index)
      })
    })
  }
}

class TabsCollection {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new Tabs(element)
    })
  }
}

export default TabsCollection