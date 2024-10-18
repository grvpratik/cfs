export async function sendMessage(chatId: number, text: string,token:string) {
    const url = `https://api.telegram.org/bot${token}/sendMessage`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: text,
        }),
    })

    if (!response.ok) {
        console.error('Failed to send message:', await response.text())
    }
}