import type { CustomContext } from '@/types/Context'
import sendOptions from '@/helpers/sendOptions'

export default function handleHelp(ctx: CustomContext) {
  return ctx.reply(ctx.i18n.t('help'), {
    ...sendOptions(ctx),
  })
}
