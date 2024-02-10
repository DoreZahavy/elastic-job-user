import configProd from './prod.js'
import configDev from './dev.js'

interface Config {
  dbURL: string | undefined;
  dbName: string | undefined;
  tokenKey: string | undefined;
}

export const config: Config = (process.env.NODE_ENV === 'production')
  ? configProd
  : configDev

