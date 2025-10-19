import { I18n } from '@grammyjs/i18n'

import { cwd } from 'process'
import { resolve } from 'path'

const i18n = new I18n({
  defaultLanguageOnMissing: true,
  directory: resolve(cwd(), 'locales'),
  defaultLanguage: 'uz-lat',
  useSession: true,
})

export default i18n
