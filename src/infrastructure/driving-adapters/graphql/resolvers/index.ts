import { userMutations, userQueries } from './User'
import { noteMutations, noteQueries } from './Notes'

const resolvers = {
  Query: {
    ...userQueries,
    ...noteQueries
  },
  Mutation: {
    ...userMutations,
    ...noteMutations
  }
}

export default resolvers
