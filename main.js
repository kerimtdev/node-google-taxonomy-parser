const GoogleTaxonomyParser = require('./lib');

const taxonomy = new GoogleTaxonomyParser({
  languages: ['tr-TR', 'en-US', 'de-DE']
})

taxonomy.execute()