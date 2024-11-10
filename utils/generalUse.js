function getNewId(entries) {
    const allIds = entries.map(entry => { return Number(entry.id)});
    const largestId = Math.max(...allIds);
    return (largestId + 1).toString();
}

function parseRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => (body += chunk.toString()));
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject(new Error('Invalid JSON'));
            }
        });
    });
}

module.exports = {
    getNewId,
    parseRequestBody
}