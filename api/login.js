export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    try {
        const response = await fetch('https://sedintegracoes.educacao.sp.gov.br/saladofuturobffapi/credenciais/api/LoginCompletoToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': 'd701a2043aa24d7ebb37e9adf60d043b', // Chave necessária
                'X-Product-Name': 'SalaDoFuturo'
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        
        // Log para debug no console da Vercel (aba Logs)
        console.log("Resposta do Login:", data);

        return res.status(response.status).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
