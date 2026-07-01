export default async function handler(req, res) {
    const { type, bookId, chapterId } = req.query;
    const authHeader = req.headers.authorization;

    let url = 'https://prod-apistudent.elefanteletrado.com.br/v1/library/book/readings';
    if (type === 'discover') url = 'https://prod-apistudent.elefanteletrado.com.br/v1/library/discover/';
    if (type === 'quiz') url = 'https://prod-apistudent.elefanteletrado.com.br/v1/student/books/quiz/list';
    if (type === 'book_detail' && bookId && chapterId) url = `https://prod-apistudent.elefanteletrado.com.br/v1/library/books/${bookId}/${chapterId}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': authHeader,
                'Origin': 'https://em.elefanteletrado.com.br',
                'Referer': 'https://em.elefanteletrado.com.br/',
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        return res.status(response.status).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
