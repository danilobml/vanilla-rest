const fs = require("fs");

function saveToDb(dbFileName, data) {
    const convertedData = JSON.stringify(data);
    fs.writeFile(dbFileName, convertedData, (error) => {
        if (error) {
            console.error(error);
            return false
        }
    });
    return true
}

module.exports = {
    saveToDb
}
