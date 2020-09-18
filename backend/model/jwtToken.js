const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

class Jwt {
    constructor() {
        this.data = null
        this.id = undefined
        this.date = null
        this.creatDate = null
    }

    generateToken(data) {
        if (data) {
            this.data = data
        }
        let res = this.data
        let created = Math.floor(Date.now() / 1000)
        let secret = "yujian" //密码
        let token = jwt.sign({
                id: res.id,
                name: res.user_name,
                expDate: created + 60 * 600, //  过期时间
                iat: created,
            },
            secret
        )
        return token
    }

    verifyToken(data) {
        if (data) {
            this.data = data;
        }
        let result = this.data;
        let res;
        try {
            let token = jwt.verify(result, 'yujian')
            this.id = token.id;
            this.creatDate = token.iat;
            this.date = token.expDate;
            let current = Math.floor(Date.now() / 1000);
            if (current >= this.date) {
                res = 401
            } else {
                res = token || {}
            }
        } catch (error) {
            res = 404
        }
        return res
    }
}
module.exports = Jwt