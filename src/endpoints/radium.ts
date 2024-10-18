export default async function raydium(c: any) {

    console.log(await c.req.json())
    return c.text('OK')
}