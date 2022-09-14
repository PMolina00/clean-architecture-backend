import morgan from 'morgan'
import express from 'express'
import * as http from 'http'
import routes from './routes'

export class Server {
  private readonly _port: string
  private readonly _app: express.Express
  private _httpServer?: http.Server

  constructor (port: string) {
    this._port = port
    this._app = express()
    this._app.use(express.json())
    this._app.use(express.urlencoded({ extended: true, limit: '50mb' }))
    this._app.use(express.json({ limit: '50mb' }))
    this._app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
      res.header('Access-Control-Allow-Credentials', 'true')
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
      next()
    })
    this._app.use(morgan('tiny'))
    this._app.use(routes)
  }

  async listen (): Promise<void> {
    return await new Promise(resolve => {
      this._httpServer = this._app.listen(this._port, () => {
        console.log(
          `Backend App is running at http://localhost:${this._port}`
        )
        console.log(
          'Press CTRL-C to stop\n'
        )
        resolve()
      })
    })
  }

  async stop (): Promise<void> {
    return await new Promise((resolve, reject) => {
      if (this._httpServer != null) {
        this._httpServer.close(error => {
          if (error != null) return reject(error)
          return resolve()
        })
      }

      return resolve()
    })
  }
}
