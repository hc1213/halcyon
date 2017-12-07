let fn_hello = async (ctx,next) =>{
    let name = ctx.params.name;
    ctx.response.body = `hello,${name}`
}

module.exports = {
    'GET /hello/:name':fn_hello
}