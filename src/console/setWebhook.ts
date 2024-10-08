import {BaseTelegramContainer} from '../clubApps/TelegramApp/TelegramContainer'
import {AppEnv} from '../appEnv'

const c = new BaseTelegramContainer(AppEnv.getInstance())

c.Telegram.setWebhook(`${c.Env.tgWebhook}/${c.Env.tgToken}`, {
  allowed_updates: [
    'message',
    'chat_join_request',
    'chat_member',
    'my_chat_member',
    'callback_query',
    'chosen_inline_result',
    'inline_query',
    'edited_message',
    'channel_post',
    'edited_channel_post',
    'poll',
    'poll_answer',
  ],
}).then(result => {
  console.log(result)
}).catch(err => {
  console.log(err)
})
