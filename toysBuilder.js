const path = require('path')
const fs = require('fs')

const buildFilePath = (t) => {
  const filePath = fs.existsSync(path.join(__dirname, `/toys${t}/dist`))
  ? `/toys${t}/dist`
  : `/toys${t}/build`
  return filePath
}

const buildFileStaticPath = (t) => {
  const filePath = fs.existsSync(path.join(__dirname, `/toys${t}/dist`))
  ? `/toys${t}/dist/static`
  : `/toys${t}/build/static`
  return filePath
}

module.exports = { buildFilePath, buildFileStaticPath }