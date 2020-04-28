# mtggoldfish-js
MTGGoldfish scrapper for Node.js.

## Installation

    $ npm install mtggoldfish-js

## Usage

```javascript
const MTGGoldfish = require('mtggoldfish-js')
let goldfish = new MTGGoldfish()
```

### Sets

```javascript
goldfish.get.sets().then(sets => {})
```
or inside async function

```javascript
let sets = await goldfish.get.sets()
```

Output is an array of objects. Each object in array contains set `name` (String) and `code` (String)

```json
[{"name": "Alpha", "code": "LEA"}]
```

### Cards

Function accepts following parameters:

* `code` (String) **required**: code of the required set
* `paper` (Boolean): *true* by default, *false* will return online prices

```javascript
goldfish.get.cards('IKO').then(cards => {})
```

Output is an array of card objects. Each object contains `name` (String) and `price` (Float)

```json
[{name: 'Black Lotus', price: 28000}]
```

## Version history

Version | Notes
-|-
0.0.1 | Initial release