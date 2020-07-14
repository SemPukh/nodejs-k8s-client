const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path')

module.exports = function() {
    return loadFile().then(data => {
        return generateCommand(data.users[0].user.exec)
    })
}


function loadFile() {
    return new Promise((resolve, reject) => {
        try {
            const doc = yaml.safeLoad(fs.readFileSync(path.resolve(process.env.HOME, '.kube', 'config'), 'utf8'));
            resolve(doc)
        } catch (e) {
            console.log(e);
            reject(e)
        }
    })
}

function generateCommand(arguments) {
    return arguments.command + ' ' + arguments.args.join(' ')
}