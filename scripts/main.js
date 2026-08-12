import { ThemeToggle } from './ToggleTheme.js'
import { LanguageToggle } from './LanguageToggle.js'
import TabsCollection from './Tabs.js'

document.addEventListener('DOMContentLoaded', () => {
  new ThemeToggle()
  new LanguageToggle()
  new TabsCollection()
})