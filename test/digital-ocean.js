const K8sClient = require('..');
const { exec } = require('child_process');
const parseConfig = require('../lib/parse-config')


var doContext = {

};

parseConfig().then(res => {
    exec(res, (error, stdout, stderr) => {
        const credentials = JSON.parse(stdout)
    
        K8sClient.connectToDO(null, credentials, null)
            .then(client => {
                doContext.client = client;
                return client;
            })
    })
})
