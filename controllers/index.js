let fn_index = async (ctx,next)=>{
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`
}

let fn_signin = async (ctx,next)=>{
    let name = ctx.request.body.name,
        password = ctx.request.body.password;
    console.log(`提交的账号:${name},密码是:${password}`);
    if (name == 'dshu' && password == '123456') {
        ctx.response.body = `welcome,${name}`;
    } else {
        // ctx.response.body = `<p><a href="/">try again </a></p>`
        ctx.response.body = {
            errcode:200,
            data:{
                name:'dshu',
                age:24
            }
        }
    }
}

module.exports = {
    'GET /':fn_index,
    'POST /signin':fn_signin
}