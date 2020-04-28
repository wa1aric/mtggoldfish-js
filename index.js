let request = require('./request')
let parser = require('./parser')

class MTGGoldfish {
    constructor() {
        
    }
}

MTGGoldfish.prototype.get = {
    sets: () => {
        return new Promise((resolve, reject) => {
            request('/prices/select')
            .then(response => {
                parser.sets(response).then(editions => {
                    resolve(editions)
                })
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    cards: (code, paper = true, foil = false) => {
        if (code === undefined) throw new Error()
        return new Promise((resolve, reject) => {
            request(`/index/${code}${foil ? '_F' : ''}`, paper ? 'paper' : 'online')
            .then(response => {
                parser.cards(response, paper).then(cards => {
                    resolve(cards)
                })
                .catch(error => {
                    reject(error)
                })    
            })
        })
    }
}

module.exports = MTGGoldfish