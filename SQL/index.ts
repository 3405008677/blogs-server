import { MySql, IPool } from './mysql'

const config: IPool = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  connectionLimit: process.env.connectionLimit as unknown as number
}

// 实例化database对象
export const db = new MySql(config)
