import type { CustomContext } from '@/types/Context'
import { LangType } from '@/menus/language'
import { MessageEntity, Chat } from '@grammyjs/types'
import { Nodehun } from 'nodehun'
import { readFileSync } from 'fs'
import sendOptions from '@/helpers/sendOptions'

const nodehun: Record<LangType, Nodehun> = {
  'uz-lat': new Nodehun(
    readFileSync('./src/assets/uz-lat.aff'),
    readFileSync('./src/assets/uz-lat.dic')
  ),
  'uz-cyr': new Nodehun(
    readFileSync('./src/assets/uz-cyr.aff'),
    readFileSync('./src/assets/uz-cyr.dic')
  ),
}

const clearTextRegex = /[\u0400-\u04FF0-9a-zA-Z-_'’‘.]+/g
const excludedEntityTypes: MessageEntity.AbstractMessageEntity['type'][] = [
  'url',
  'mention',
  'hashtag',
]

const clearText = (message: string, entities?: MessageEntity[]): string[] => {
  if (entities) {
    const wordsToIgnore: string[] = []
    for (const { type, offset, length } of entities) {
      if (excludedEntityTypes.includes(type)) {
        const wordToIgnore = message.slice(offset, offset + length)
        wordsToIgnore.push(wordToIgnore)
      }
    }

    for (const wordToIgnore of wordsToIgnore) {
      message = message.replace(wordToIgnore, '')
    }
  }

  message = message.replace(/’|‘|ʼ|ʻ/g, "'")
  return message.match(clearTextRegex) || []
}

const suggest = async (word: string, lang: LangType): Promise<string[]> => {
  return (await nodehun[lang].suggest(word)) || []
}

export default async function handleMessage(ctx: CustomContext) {
  const chatType = ctx.chat?.type
  if (chatType != 'private' || !ctx.message?.text) {
    return
  }

  const message: string = ctx.message.text
  let replyMsg = ''

  const { first_name, last_name, username } = ctx.chat as Chat.PrivateChat
  // console.log('========', '@' + username, first_name, last_name, '========')
  // console.log(message)
  // console.log('========', '@' + username, first_name, last_name, '========')
  const lang = (ctx.i18n.languageCode as LangType) || 'uz-lat'
  for (const word of clearText(message, ctx.message?.entities)) {
    const status: boolean = await nodehun[lang as keyof typeof nodehun].spell(
      word
    )

    if (!status && word !== '-') {
      const suggestions = (await suggest(word, lang)).slice(0, 4)
      replyMsg += `\n\n<b>${word}</b>: `
      if (suggestions.length) {
        replyMsg += `<i>${suggestions.join(', ')}</i>`
      } else {
        replyMsg += `<i>${ctx.i18n.t('no_suggestion')}</i>`
      }
    }
  }

  if (replyMsg) {
    return await ctx.reply(`${ctx.i18n.t('mistakes')}: ${replyMsg}`, {
      ...sendOptions(ctx),
    })
  }

  return await ctx.reply(ctx.i18n.t('no_mistakes'), {
    ...sendOptions(ctx),
  })
}
