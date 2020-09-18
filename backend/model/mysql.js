const mysql = require('mysql');

module.exports = {
  config: {
    host: '192.168.10.92', //ip或域名
    user: 'root', //用户名
    password: 'root', //密码
    database: "tj-crm", //数据库的名称
    dateStrings: true
  },
  sqlConnect: function (sql, sqlArr, callBack) {
    var pool = mysql.createPool(this.config);
    pool.getConnection((err, conn) => {
      if (err) {
        console.log("连接失败")
        return;
      }
      //事件驱动回调
      conn.query(sql, sqlArr, callBack);
      //释放连接
      conn.release();
    })
  }
}