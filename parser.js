module.exports = {
    sets: (html) => {
        html = html.replace(/[\r\n\t]/g, '')
        return new Promise((resolve, reject) => {
            let editionRegEx = /<img alt=".*?" class="sprite-set_symbols_(.*?)".*?>(.*?)<\/a>/g
            let editionMatch, editions = []
            while (editionMatch = editionRegEx.exec(html)) {
                editions.push({
                    name: editionMatch[2],
                    code: editionMatch[1]
                })
            }
            resolve(editions)
        })
    },
    cards: (html) => {
        html = html.replace(/[\r\n\t]/g, '')
        return new Promise((resolve, reject) => {
            let trRegEx = /<tr>(.*?)<\/tr>/g
            let trMatch, cards = []
            while (trMatch = trRegEx.exec(html)) {
                let trHtml = trMatch[1]
                let cardNameRegExp = /<a data-full-image=".*?" rel="popover" data-trigger="hover" data-html="true" href=".*?">(.*?)<\/a>/
                let priceRegExp = /<\/a><\/td><td>.*?<\/td><td>.*?<\/td><td class='text-right'>(.*?)<\/td>/
                if (trHtml.match(cardNameRegExp) != undefined && trHtml.match(priceRegExp)) {
                    let name = trHtml.match(cardNameRegExp)[1]
                    let price = trHtml.match(priceRegExp)[1]
                    cards.push({
                        name: name,
                        price: parseFloat(price.replace(/,/g, ''))
                    })
                }
            }
            resolve(cards)
        })
    }
}
