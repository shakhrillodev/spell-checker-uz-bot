import { Bot } from 'grammy'
import { type CustomContext } from '@/types/Context'
import env from '@/helpers/env'

const bot = new Bot<CustomContext>(env.TOKEN)

export default bot
