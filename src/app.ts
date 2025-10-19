import 'module-alias/register'
// import 'source-map-support/register'
import { ignoreOld, sequentialize } from 'grammy-middlewares'
import { run } from '@grammyjs/runner'
import { session } from 'grammy'
import bot from '@/helpers/bot'
import handleStart from '@/handlers/start'
import handleLanguage from '@/handlers/language'
import handleMessage from '@/handlers/message'
import i18n from '@/helpers/i18n'
import languageMenu from '@/menus/language'
import sendHelp from '@/handlers/help'
import verifyLanguage from './middlewares/verifyLanguage'
import type { SessionData } from '@/types/Context'

function initial(): SessionData {
  return { __language_code: 'uz-lat' }
}

async function runApp() {
  console.log('Starting app...')

  bot
    .use(session({ initial }))
    .use(sequentialize())
    .use(ignoreOld())
    .use(i18n)
    .use(languageMenu)

  // Commands
  bot.command('start', handleStart)
  bot.command('help', sendHelp)
  bot.command('language', handleLanguage)
  bot.on('message:text').use(verifyLanguage)
  bot.on('message:text', handleMessage)

  await bot.api.setMyCommands([
    { command: 'start', description: 'Start the bot' },
    { command: 'help', description: 'Show help text' },
    { command: 'language', description: 'Set the language' },
  ])

  // Errors
  bot.catch(console.error)
  // Start bot
  await bot.init()
  console.log('Bot initialized')
  run(bot)
  console.info(`Bot ${bot.botInfo.username} is up and running`)
}

void runApp()
