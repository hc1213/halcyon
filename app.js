const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const koaBody = require('koa-body')

app.use(koaBody())
router.get('/',function(ctx,next){
    ctx.body = {
        data:{
            name:'dshu',
            age:24
        }
    }
})
router.post('/',function (ctx, next) {
    let params = ctx.request.body;
    console.log('id--->',params.code)
    ctx.response.type = 'json';
    ctx.body = {
        data: {
            name: 'dshu',
            age: 25
        }
    }
})

app.use(router.routes())
app.listen(3000);

