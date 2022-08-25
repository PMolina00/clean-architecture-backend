import path from 'path'
import * as dotenv from 'dotenv'
import { BackendApp } from './BackendApp'
import { MongoConnection } from '../../driven-adapters/orm/mongoose/connectionMongo'

try {
  dotenv.config({
    path: path.resolve(__dirname, '../../../../.env')
  })
  new BackendApp().start()
  new MongoConnection().connect()
} catch (error) {
  console.log(error)
}
