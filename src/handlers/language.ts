import type { CustomContext } from '@/types/Context'
import languageMenu from '@/menus/language'
import sendOptions from '@/helpers/sendOptions'

export default function handleLanguage(ctx: CustomContext) {
  return ctx.reply(ctx.i18n.t('language'), {
    ...sendOptions(ctx),
    reply_markup: languageMenu,
  })
}
