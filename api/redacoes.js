export default async function handler(req, res) {
    const token = req.headers['authorization'];

    try {
        const response = await fetch('https://edusp-api.ip.tv/tms/task/todo?is_essay=true&answer_statuses=draft&answer_statuses=pending', {
            method: 'GET',
            headers: { 'x-api-key': token, 'accept': 'application/json' }
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar redações' });
    }
}
