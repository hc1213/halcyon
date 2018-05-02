/**
 * koa的核心是中间件的堆砌,理解每个中间件，一个一个实现即可~
 */
const Koa = require('koa')
const path = require('path')
const app = new Koa()
const route = require('koa-route')
const serve = require('koa-static')
const compose = require('koa-compose')
const koaBody = require('koa-body')
const os = require('os')
app.use(koaBody({ multipart: true}))

console.log('default temporary file path---->',os.tmpdir())
console.log('path.__dirname------->',__dirname)
const publicServer = serve(path.join(__dirname))

const logger = (ctx,next) =>{
    console.log(`start time:${Date.now()} \n ${ctx.request.method}  ${ctx.request.url}`)
    next()
}

const main = async ctx=>{
    const tmpdir = os.tmpdir()
    const filePaths = []
    const files = ctx.request.body.files || {}

    for(let key in files){
        let file = files[key]
        let filePath = path.join(tmpdir,file.name)
        let reader = fs.createReadStream(file.path)
        let writer = fs.createWriteStream(filePath)
        reader.pipe(writer)
        filePaths.push(filePath)
    }

    ctx.body = filePaths
}
const middlewares = compose([logger, publicServer])

app.use(route.all('/', main))
app.use(middlewares)


app.listen(3000)
