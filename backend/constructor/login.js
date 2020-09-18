var {
    state,
    message
} = require('./const')

class Login {
    constructor() {
        this.obj = {}
    }

    set(name, item) {
        this.obj[name] = item;
        return this
    }
}

class login extends Login {
    constructor() {
        super();
    }
    static getCodeNewData(code, obj) {
        var item = new login();
        if (code === state.warning) {
            item.set("code", state.warning);
            item.set("msg", '用户名或者密码错误')
        }
        if (code === state.success) {
            item.set("code", state.success);
            item.set("msg", "登录成功");
            item.set("data", {
                id: obj.id,
                username: obj.user_name,
                phone: obj.phone,
                isAdmin: obj.is_admin === 1 ? true : false,
            })
        }
        if (code === state.serverError) {
            item.set("code", state.code);
            item.set("msg", message.serverError)
        }
        return item.obj
    }
}

module.exports = login