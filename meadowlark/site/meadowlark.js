const express = require('express')
const handlebars = require('express3-handlebars').create({ defaultLayout: 'main' })

const app = express()

// 设置handlebars视图引擎
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

app.set('port', process.env.PORT || 3000)

// 在Express中，路由和中间件的添加顺序至关重要

// app.VERB在路由匹配时
// 默认忽略了大小写或反斜杠
// 并且在进行匹配时也不考虑查询字符串
// 还支持通配符
app.get('/', function(req, res){
    res.render('home')
})

app.get('/about', function(req, res){
    res.render('about')
})

// app.use是Express添加中间件的一种方法
// Express能根据回调函数中参数的个数区分404和500处理器

// 404 catch-all 处理器（中间件）
app.use(function(req, res){
    res.status(404)
    res.render('404')
})

// 500 错误处理器（中间件）
app.use(function(err, req, res, next){
    console.log(err.stack)
    res.status(500)
    res.render('500')
})

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + ';press Ctrl-C to terminate')
})
