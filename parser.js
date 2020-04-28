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
    cards: (html, paper) => {
        html = html.replace(/[\r\n\t]/g, '')
        return new Promise((resolve, reject) => {
            let cards = []
            let trRegEx = /<tr>(.*?)<\/tr>/g
            let trMatch
            while (trMatch = trRegEx.exec(html)) {
                let trHtml = trMatch[1]
                let cardNameRegExp = new RegExp(`<a data-full-image=".*?" rel="popover" data-trigger="hover" data-html="true" href=".*?#${paper ? 'paper' : 'online'}">(.*?)<\/a>`)
                let priceRegExp = new RegExp(`<a data-full-image=".*?" rel="popover" data-trigger="hover" data-html="true" href=".*?#${paper ? 'paper' : 'online'}">.*?<\/a><\/td><td>.*?<\/td><td>.*?<\/td><td class='text-right'>(.*?)<\/td>`)
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
