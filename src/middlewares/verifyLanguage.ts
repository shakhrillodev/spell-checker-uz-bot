import type { CustomContext } from '@/types/Context'
import { NextFunction } from 'grammy'
import bot from '@/helpers/bot'
import sendOptions from '@/helpers/sendOptions'
import XRegExp from 'xregexp'

const cyrillic = XRegExp('\\p{Script=Cyrillic}', 'A')
const latin = XRegExp('\\p{Script=Latin}', 'A')

function detectScript(str: string) {
  if (XRegExp.test(str, cyrillic)) return 'cyrillic'
  if (XRegExp.test(str, latin)) return 'latin'
  return 'unknown'
}

export default async function verifyLanguage(
  ctx: CustomContext,
  next: NextFunction
) {
  if (
    (ctx.session.__language_code === 'uz-lat' &&
      detectScript(ctx.message?.text as string) != 'latin') ||
    (ctx.session.__language_code === 'uz-cyr' &&
      detectScript(ctx.message?.text as string) != 'cyrillic')
  ) {
    await ctx.reply(ctx.i18n.t('language_error'), {
      ...sendOptions(ctx),
    })
    return
  }

  return next()
}
