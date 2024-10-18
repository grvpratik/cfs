import { sendMessage } from "utils/telegram"

export default async function raydium(c: any) {
    const { BOT_TOKEN } = c.env
    // const raw = c.req.json()
    // const data = raw[0]?.description
    // if (data) {
    //     console.log({ data })
    //     // Convert the entire JSON object to a string format
    //     const jsonString = JSON.stringify(data, null, 2); // Pretty print with 2 spaces
    //     await sendMessage(5916990259, jsonString, BOT_TOKEN);
    // } else {
    //     await sendMessage(5916990259, "NOT DESC", BOT_TOKEN);
    // }
    // console.log("RAYDIUM")
    // console.log(await c.req.json())
    return c.text('OK')
}