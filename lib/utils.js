function parseContent (input) {
  let object = {}
  let content = input.split('\n')

  object.version = content[0].split(': ')[1]
  object.content = content
    .slice(1, content.length - 1)
    .map((curr) => {
      const [id, fullPath] = curr.split(' - ')
      const fullPathArr = fullPath.split(' > ')
      const name = fullPathArr[fullPathArr.length - 1]
      const root = fullPathArr.slice(0, -1).join(' > ')

      return {
        id: parseInt(id),
        name,
        root,
        fullPath: fullPathArr.join(' > '),
        level: fullPathArr.length
      }
    })

  return object
}

module.exports = {
  parseContent
}