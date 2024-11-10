function routeNotFound(req, res) {
    res.writeHead(404, {'Content-type': 'application/json'});
    res.end(JSON.stringify('Route not found'));
}

function sendResponse(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

module.exports = {
    routeNotFound,
    sendResponse
}