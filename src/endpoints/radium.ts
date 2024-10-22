import { sendMessage } from "utils/telegram";

async function fetchTokenInfo(mint: string) {
    const url = `https://mainnet.helius-rpc.com/?api-key=6edb4a3c-ac78-4b3d-93bc-fe905901735e`;
    const response: any = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: mint,
            method: 'getAsset',
            params: {
                id: mint
            },
        }),
    });

    if (response.ok) {
        const { result } = await response.json();
        return result;
    }
    return null;
}

function formatTokenInfo(tokenInfo: any, tokenAmount: number, solAmount: number, percentAdded: number) {
    if (!tokenInfo) return "Token information not available";

    const { content, token_info, id } = tokenInfo;
    const { metadata } = content;
    const imageUrl = content.links?.image || "No image available";

    return `
Token: ${metadata.name} (${metadata.symbol})
Description: ${metadata.description}
Image: ${imageUrl}
Supply: ${token_info.supply / Math.pow(10, token_info.decimals)}
Decimals: ${token_info.decimals}
Amount Added to Liquidity: ${tokenAmount.toFixed(6)} (${percentAdded.toFixed(2)}% of total supply)
SOL Amount: ${solAmount.toFixed(6)} SOL
Contract: ${id}
  `.trim();
}

function createInlineKeyboard(tokenSymbol: string, tokenMint: string) {
    return JSON.stringify({
        inline_keyboard: [
            [
                { text: "Twitter", url: `https://twitter.com/search?q=%24${tokenSymbol}` },
                { text: "Telegram", url: `https://t.me/s/${tokenSymbol}` }
            ],
            [
                { text: "DEXScreener", url: `https://dexscreener.com/solana/${tokenMint}` }
            ]
        ]
    });
}

async function sendTelegramMessageWithButtons(chatId: number, text: string, replyMarkup: string, botToken: string) {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: text,
            parse_mode: 'Markdown',
            reply_markup: replyMarkup
        }),
    });

    if (!response.ok) {
        console.error('Failed to send Telegram message:', await response.text());
    }
}

export default async function raydium(c: any) {
    const { BOT_TOKEN } = c.env;
    const raw = await c.req.json();

    if (raw && raw[0] && raw[0].tokenTransfers) {
        const tokenTransfers = raw[0].tokenTransfers;
        const solTransfer = tokenTransfers.find((transfer: any) => transfer.mint === "So11111111111111111111111111111111111111112");
        const solAmount = solTransfer ? solTransfer.tokenAmount : 0;

        const nonSolanaMints = tokenTransfers.filter((transfer: any) => transfer.mint !== "So11111111111111111111111111111111111111112");
        const transfer = nonSolanaMints[0]
        // for (const transfer of nonSolanaMints) {
        const tokenInfo = await fetchTokenInfo(transfer.mint);
        if (tokenInfo) {
            const totalSupply = tokenInfo.token_info.supply / Math.pow(10, tokenInfo.token_info.decimals);
            const tokenAmount = transfer.tokenAmount;
            const percentAdded = (tokenAmount / totalSupply) * 100;

            const formattedInfo = formatTokenInfo(tokenInfo, tokenAmount, solAmount, percentAdded);
            const inlineKeyboard = createInlineKeyboard(tokenInfo.content.metadata.symbol, transfer.mint);

            await sendTelegramMessageWithButtons(5916990259, formattedInfo, inlineKeyboard, BOT_TOKEN);
        }
        // }
    }
    console.log(raw[0])
    console.log("RAYDIUM");
    if (raw && raw[0] && raw[0].signature) console.log("Signature :", raw[0].signature);

    return c.text('OK');
}