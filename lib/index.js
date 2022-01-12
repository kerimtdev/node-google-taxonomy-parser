const yup = require('yup')
const axios = require('axios')
const fs = require('fs')
const utils = require('./utils')

const INPUT_FOLDER = __dirname + '/../input'
const OUTPUT_FOLDER = __dirname + '/../output'
const BASE_URL = 'https://www.google.com/basepages/producttype/taxonomy-with-ids'

const constructorSchema = yup.object().shape({
  languages: yup.array().of(yup.string().required()).required()
})

class GoogleTaxonomyParser {
  languages = []

  constructor(params) {
    if (constructorSchema.isValidSync(params)) {
      this.languages = params.languages
    } else {
      throw new Error('Illegal constructor params.')
    }
  }

  async loadInputs () {
    for (const language of this.languages) {
      const taxonomyUrl = BASE_URL + `.${language}.txt`
      const filePath = INPUT_FOLDER + `/${language}.txt`

      const res = await axios.get(taxonomyUrl)

      fs.writeFileSync(
        filePath,
        res.data,
        (err) => {
          if (!err) {
            console.log(`TXT file created on input/${language}.txt`)
          }
        }
      )
    }
  }

  createOutputs () {
    for (const language of this.languages) {
      const inputPath = INPUT_FOLDER + `/${language}.txt`
      const outputPath = OUTPUT_FOLDER + `/${language}.json`

      const content = fs.readFileSync(inputPath, { encoding:'utf8', flag:'r' })
      const parsedContent = utils.parseContent(content)

      fs.writeFileSync(
        outputPath,
        JSON.stringify(parsedContent, null, 2),
        (err) => {
          if (!err) {
            console.log(`JSON file created on output/${language}.json`)
          }
        }
      )
    }
  }

  async execute () {
    await this.loadInputs()
    this.createOutputs()
  }
}

module.exports = GoogleTaxonomyParser