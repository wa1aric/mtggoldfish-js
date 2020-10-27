const MTGGoldfish = require('./index');

(async () => {

    const goldfish = new MTGGoldfish()

    const sets = await goldfish.get.sets()
    console.log(sets)

    const cards = await goldfish.get.cards('MM')
    console.log(cards)
    
})()
