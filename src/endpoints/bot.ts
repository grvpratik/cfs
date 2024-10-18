import { sendMessage } from "utils/telegram"

export default async function bot(c: any) {
    const { BOT_TOKEN } = c.env

    console.log(BOT_TOKEN)

    if (!BOT_TOKEN) {
        return c.text('Unauthorized', 401)
    }

   
    console.log(await c.req.json())
    const update = await c.req.json()

    if (update.message) {
        const chatId = update.message.chat.id
        const text = update.message.text

        let responseText = 'Hello! I received your message.'

        if (text.toLowerCase() === '/start') {
            responseText = `Welcome! I'm a simple Telegram bot created with Hono.js.`
        }

        // Send a response back to the user
        await sendMessage(chatId, responseText,BOT_TOKEN)
    }

    return c.text('OK')
}
