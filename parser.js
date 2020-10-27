module.exports = {
    sets: (html) => {
        html = html.replace(/[\r\n\t]/g, '')
        return new Promise((resolve, reject) => {
            let editionRegEx = /<li class='set\-dropdown\-item'.*?>.*?<a href='\/index\/(.*?)'.*?>.*?<div class='set\-icon\-wrapper'>.*?<div class='set\-name'>(.*?)<\/div>.*?<\/a>.*?<\/li>/g
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
            let trRegEx = /<tr.*?>(.*?)<\/tr>/g
            let trMatch
            while (trMatch = trRegEx.exec(html)) {
                let trHtml = trMatch[1]
		let cardRegExp = /<td.*?>(.*?)<\/td>.*?<td.*?>.*?<\/td>.*?<td.*?>.*?<\/td>.*?<td.*?>(.*?)<\/td>.*?<td.*?>.*?<\/td>/g
		let cardMatch
		while (cardMatch = cardRegExp.exec(trHtml)) {
		    cards.push({
			name: cardMatch[1].replace(/<.*?>/g, ''),
			price: cardMatch[2]
		    })
		}
            }
            resolve(cards)
        })
    }
}
