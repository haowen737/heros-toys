const path = require('path')
const fs = require('fs')

const cogMan = async (ctx, next) => {
  const { request } = ctx
  const url = request.url
  const targetPath = ``
  const filePath = path.join(__dirname, `../toys${url}/dist/index.html`)

  const file = fs.readFileSync(filePath)
  ctx.body = file
}

module.exports = cogMan