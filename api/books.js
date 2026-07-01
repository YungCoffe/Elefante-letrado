export default async function handler(req, res) {
    const { type } = req.query;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token ausente' });
    }

    const url = 'https://prod-apistudent.elefanteletrado.com.br/v1/library/book/readings';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': authHeader,
                'Origin': 'https://em.elefanteletrado.com.br',
                'Referer': 'https://em.elefanteletrado.com.br/library/panel',
                'Accept': 'application/json, text/plain, */*'
            }
        });

        // Se a API retornar erro, captura o status
        if (!response.ok) {
            return res.status(response.status).json({ error: 'Erro na API remota: ' + response.status });
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        // Isso vai capturar o motivo exato do Erro 500
        return res.status(500).json({ error: 'Erro no servidor: ' + error.message });
    }
}
