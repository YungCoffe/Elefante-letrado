export default async function handler(req, res) {
    const response = await fetch('https://sedintegracoes.educacao.sp.gov.br/saladofuturobffapi/credenciais/api/LoginCompletoToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
    });
    const data = await response.json();
    // Retorna o objeto todo para o index.html conseguir ler o que vem dentro
    return res.status(response.status).json(data);
}
