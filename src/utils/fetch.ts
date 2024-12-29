async function run(model, input) {
    const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/d765b70f9d208cbc7b0cdd21a4984581/ai/run/${model}`,
        {
            headers: { Authorization: "Bearer uzmmOnk3siLhtbSw1kAwphm416BvOyxS_L9DXD2q" },
            method: "POST",
            body: JSON.stringify(input),
        }
    );
    const result = await response.json();
    return result;
}