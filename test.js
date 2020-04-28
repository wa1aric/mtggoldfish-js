const Goldfish = require('./index')
let goldfish = new Goldfish()
goldfish.get.cards('RNA', true, true).then(cards => {
    console.log(JSON.stringify(cards))
})