const Koa = require('koa')
// const cogMan = require('./server/cogMan')
const serve = require('koa-static-server')
const compress = require('koa-compress')
const path = require('path')
const fs = require('fs')

const app = new Koa()

const toys = ['/locater', '/clock']

const buildFilePath = (t) => {
  const filePath = fs.existsSync(path.join(__dirname, `/toys${t}/dist`))
  ? `/toys${t}/dist`
  : `/toys${t}/build`

  console.log(filePath)
  return filePath
}

const loadStaticServer = (t) => {
  return app.use(serve({
      rootDir: path.join(__dirname, buildFilePath(t)),
      gzip: true,
      rootPath: `${t}`
    }))
}

toys.map(t => loadStaticServer(t))

app.use(compress())

app.listen(8087)

console.info('listening on port 8087')