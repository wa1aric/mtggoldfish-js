const { get } = require('https')

module.exports = (pathname, hash) => {
    let url = new URL('https://www.mtggoldfish.com')
    url.pathname = pathname
    if (hash != undefined) url.hash = hash
    return new Promise((resolve, reject) => {
        get(url, callback => {
            let response
            callback.on('data', chunk => {
                response += chunk
            })
            callback.on('error', error => {
                reject(error)
            })
            callback.on('end', () => {
                resolve(response)
            })
        })
    })
}