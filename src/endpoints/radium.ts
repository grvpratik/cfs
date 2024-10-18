import { sendMessage } from "utils/telegram"

export default async function raydium(c: any) {
    const { BOT_TOKEN } = c.env
    const raw = c.req.json()
    const data = raw[0]
    if (data) await sendMessage(5916990259, data, BOT_TOKEN)
console.log("RAYDIUM")
    console.log(await c.req.json())
    return c.text('OK')
}