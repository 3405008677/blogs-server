// 导入mysql包
// npm install --save @types/mysql 加入ts类型支持
import mysql from 'mysql'

interface IPool {
  host: string | undefined
  user: string | undefined
  password: string | undefined
  database: string | undefined
  connectionLimit: number
}

class MySql {
  pool: mysql.Pool
  constructor(config: IPool) {
    // 创建连接池
    this.pool = mysql.createPool(config)
  }
  // 自定义query 执行查询语句
  /**
   *
   * @param sql 查询语句
   * @param values 参数数组
   * @returns { result, fields }
   */
  async query(sql: string, values: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      // 这里的values使用占位符 防止SQL注入
      this.pool.query(sql, values, (err, result, fields) => {
        if (err) {
          reject(err)
        }
        // resolve([result, fields])
        resolve(result)
      })
    })
  }

  // 关闭连接池
  async close() {
    return new Promise((resolve, reject) => {
      this.pool.end(err => {
        if (err) reject(err)
        resolve(true)
      })
    })
  }
}

// 导出
export { MySql, IPool }
