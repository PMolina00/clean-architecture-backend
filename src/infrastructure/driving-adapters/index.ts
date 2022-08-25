import path from 'path'
import * as dotenv from 'dotenv'
import { BackendApp } from './api-rest/BackendApp'
import { BackendGraphQL } from './graphql'
import { MongoConnection } from '../driven-adapters/orm/mongoose/connectionMongo'

try {
  dotenv.config({
    path: path.resolve(__dirname, '../../../.env')
  })
  new BackendApp().start()
  new BackendGraphQL().start()
  new MongoConnection().connect()
} catch (error) {
  console.log(error)
}
