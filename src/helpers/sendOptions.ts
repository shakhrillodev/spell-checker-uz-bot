import type { CustomContext } from '@/types/Context'

export default function sendOptions(ctx: CustomContext) {
  return {
    reply_to_message_id: ctx.msg?.message_id,
    parse_mode: 'HTML' as const,
  }
}
