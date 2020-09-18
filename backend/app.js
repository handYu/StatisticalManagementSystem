var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const cors = require('cors')
const login = require("./router/login")
const mysql = require('./model/mysql')
const Jwt = require('./model/jwtToken')
let jwt = new Jwt()
app.listen(5200, () => {
    console.log('服务启动')
})
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
)
app.use(bodyParser.json()) //data参数以字典格式传输
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By", ' 3.2.1');
    res.header('Content-Type', 'application/json;charset=utf-8')
    if (req.params['0'] === '/login') {
        next()
    } else {
        let token = req.headers.token;
        let verToken = jwt.verifyToken(token);
        if (verToken !== 404 && verToken !== 401) {
            let sql = `select user_name,id from user where user_name='${verToken.name}' and id='${verToken.id}'`;
            let sqlArr = []
            var callback = (err, result) => {
                if (err) {
                    res.json({
                        code: 500,
                        msg: "服务器错误"
                    })
                } else {
                    if (result) {
                        console.log(result[0])
                        let id = result[0].id;
                        let name = result[0].user_name;
                        if (verToken.name === name && verToken.id === id) {
                            next();
                        } else {
                            res.json({
                                code: 500,
                                msg: "token 验证失败"
                            })
                        }
                    }
                }
            }
            mysql.sqlConnect(sql, sqlArr, callback);
        } else {
            if (verToken === 404) res.json({
                code: verToken,
                msg: "token 令牌错误"
            });
            if (verToken === 401) res.json({
                code: verToken,
                msg: "token 令牌已过期，请从新登陆"
            })
        }
    }
})
app.post('/login', login);

app.get("/userList", (req, res) => {
    res.json({
        code: 0,
        msg: "获取用户列表"
    })
})