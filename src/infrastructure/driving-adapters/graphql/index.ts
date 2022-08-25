import { GraphQl } from './GraphQL'

export class BackendGraphQL {
  private _graphQL?: GraphQl

  async start (): Promise<void> {
    const port: string = process.env.GRAPHQL_PORT ?? '2427'
    this._graphQL = new GraphQl(port)
    return await this._graphQL.listen()
  }

  async stop (): Promise<void> {
    return await this._graphQL?.stop()
  }
}
