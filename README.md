##  Google Product Type Taxonomy Parser

A library for parsing Google Product Type Taxonomy.


### Usage

```js
const GoogleTaxonomyParser = require('./lib');

const taxonomy = new GoogleTaxonomyParser({
  languages: ['tr-TR', 'en-US', 'de-DE']
})

taxonomy.execute()
```

After the executing, 
- `/input` folder will be included `.txt` files.
- `/output` folder will be included parsed/formatted `.json` files.
