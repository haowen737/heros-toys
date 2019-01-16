const Koa = require('koa')
// const cogMan = require('./server/cogMan')
// const serve = require('koa-static-server')
const serve = require('koa-static')
const compress = require('koa-compress')
const mount = require('koa-mount')
const path = require('path')

const { buildFilePath, buildFileStaticPath } = require('./toysBuilder')

const toys = ['/locater', '/clock', '/agApp']

const app = new Koa()

const loadStaticServer = (t) => {
  // app.use(mount('/static', serve(path.join(__dirname, buildFileStaticPath(t)))))
  app.use(mount(`${t}`, serve(path.join(__dirname, buildFilePath(t)))))
}

toys.map(t => loadStaticServer(t))

app.use(compress())

app.listen(8087)

console.info('listening on port 8087')