import type { CustomContext } from '@/types/Context'
import { Menu } from '@grammyjs/menu'
import { cwd } from 'process'
import { load } from 'js-yaml'
import { readFileSync, readdirSync } from 'fs'
import { resolve } from 'path'

interface YamlWithName {
  name: string
}

export type LangType = 'uz-lat' | 'uz-cyr'

const localeFilePaths = readdirSync(resolve(cwd(), 'locales'))

const localeFile = (path: string) => {
  return load(
    readFileSync(resolve(cwd(), 'locales', path), 'utf8')
  ) as YamlWithName
}

const setLanguage = (languageCode: string) => async (ctx: CustomContext) => {
  ctx.i18n.locale(languageCode)
  return await ctx.editMessageText(ctx.i18n.t('language_selected'), {
    parse_mode: 'HTML',
    reply_markup: undefined,
  })
}

const languageMenu = new Menu<CustomContext>('language')

localeFilePaths.forEach((localeFilePath, index) => {
  const localeCode = localeFilePath.split('.')[0]
  const localeName = localeFile(localeFilePath).name
  languageMenu.text(localeName, setLanguage(localeCode))
  if (index % 2 != 0) {
    languageMenu.row()
  }
})

export default languageMenu
