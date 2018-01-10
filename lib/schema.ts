import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString
} from 'graphql';

let count = 0;

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      count: {
        type: GraphQLInt,
        resolve: function() {
          return count;
        }
      }
    }
  }), // query
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      updateCount: {
        type: GraphQLInt,
        description: 'Update the count',
        resolve: function() {
          return count++;
        }
      }
    }
  }) // mutation
});

export default schema;
