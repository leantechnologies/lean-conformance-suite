
const fs = require('fs')
const global = require ('../global')

async function generateReport() {
    return new Promise(async (resolve, reject) => {
        fs.readFile('./reports/conformance-report.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return reject({ error: 'Internal Server Error' });
            }

            // Parse the JSON data
            let validations;
            try {
                validations = JSON.parse(data);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                return reject({ error: 'Internal Server Error' });
            }

            const allValidationErrors = validations
                .filter(validation => validation && validation.validationErrors)
                .map(validation => validation.validationErrors)
                .flat();

            if (!allValidationErrors || allValidationErrors.length === 0) {
                const json = { message: 'No validation errors' };
                resolve(json);
            } else {
                const reasons = allValidationErrors.map(error => ({
                    CorrelationId: global.correlationId,
                    Endpoint: global.end_point,
                    Failure_reason: error.reason,
                    Object: error.location
                }));

                // Write an empty array [] back to the file
                fs.writeFile('./reports/conformance-report.json', '[]', err => {
                    if (err) {
                        console.error('Error writing file:', err);
                        // You might choose to handle this error differently based on your requirements
                        return reject({ error: 'Internal Server Error' });
                    }
                    resolve(reasons);
                });
            }
        });
    });
}

module.exports = generateReport;