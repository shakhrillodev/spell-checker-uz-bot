import { type Context, SessionFlavor } from 'grammy'
import { I18nContextFlavor } from '@grammyjs/i18n/dist/source'
import type { LangType } from '@/menus/language'

export type SessionData = {
  __language_code: LangType
}

export type CustomContext = Context &
  I18nContextFlavor &
  SessionFlavor<SessionData>
