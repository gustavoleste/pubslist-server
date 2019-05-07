const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt
} = require("graphql");

const Base64 = require("js-base64").Base64;

const UserType = require("./userType");
const PubType = require("./pubType");
const ReviewType = require("./reviewType");
const PubListType = require("./pubsListType");
const ReviewListType = require("./reviewListType");

const { User, Pub, Review } = require("../../database/models");

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    user: {
      type: UserType,
      args: {
        ID: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { ID }) => {
        try {
          const user = await User.findOne({ _id: ID });
          return user;
        } catch (err) {
          throw err;
        }
      }
    },
    userReview: {
      type: ReviewListType,
      args: {
        user: { type: new GraphQLNonNull(GraphQLString) },
        first: { type: GraphQLInt },
        after: { type: GraphQLString }
      },
      resolve: async (_, { user, first, after }) => {
        try {
          const skip = after === undefined ? 0 : Base64.decode(after);
          const limit = first + 1 || 5;
          const result = await Review.find({ user })
            .skip(Number(skip))
            .limit(limit)
            .populate("pub");
          const hasNext = limit === result.length;
          if (hasNext) {
            result.pop();
          }
          const reviews = {
            edges: [],
            pageInfo: {
              hasNextPage: hasNext
            }
          };
          if (after !== null) {
            result.map((item, index) =>
              reviews.edges.push({
                cursor: Base64.encode(index + 1),
                node: item
              })
            );
          } else {
            const skip = Number(Base64.decode(after));
            result.map((item, index) =>
              reviews.edges.push({
                cursor: Base64.encode(skip + index + 1),
                node: item
              })
            );
          }
          console.log(result);
          return reviews;
        } catch (err) {
          throw err;
        }
      }
    },
    pub: {
      type: PubType,
      args: {
        pubID: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { pubID }) => {
        try {
          const pub = await Pub.findOne({ _id: pubID });
          return pub;
        } catch (err) {
          throw err;
        }
      }
    },
    pubs: {
      type: PubListType,
      args: {
        first: { type: GraphQLInt },
        after: { type: GraphQLString }
      },
      resolve: async (_, { first, after }) => {
        try {
          const skip = after === undefined ? 0 : Base64.decode(after);
          const limit = first + 1 || 5;
          const result = await Pub.find()
            .skip(Number(skip))
            .limit(limit)
            .populate("user");
          const hasNext = limit === result.length;
          if (hasNext) {
            result.pop();
          }
          const pubs = {
            edges: [],
            pageInfo: {
              hasNextPage: hasNext
            }
          };
          if (after !== null) {
            result.map((item, index) =>
              pubs.edges.push({
                cursor: Base64.encode(index + 1),
                node: item
              })
            );
          } else {
            const skip = Number(Base64.decode(after));
            result.map((item, index) =>
              pubs.edges.push({
                cursor: Base64.encode(skip + index + 1),
                node: item
              })
            );
          }
          return pubs;
        } catch (err) {
          throw err;
        }
      }
    },
    pubReview: {
      type: ReviewListType,
      args: {
        pub: { type: new GraphQLNonNull(GraphQLString) },
        first: { type: GraphQLInt },
        after: { type: GraphQLString }
      },
      resolve: async (_, { pub, first, after }) => {
        try {
          const skip = after === undefined ? 0 : Base64.decode(after);
          const limit = first + 1 || 5;
          const result = await Review.find({ pub: pub })
            .skip(Number(skip))
            .limit(limit)
            .populate("user");
          const hasNext = limit === result.length;
          if (hasNext) {
            result.pop();
          }
          const reviews = {
            edges: [],
            pageInfo: {
              hasNextPage: hasNext
            }
          };
          if (after !== null) {
            result.map((item, index) =>
              reviews.edges.push({
                cursor: Base64.encode(index + 1),
                node: item
              })
            );
          } else {
            const skip = Number(Base64.decode(after));
            result.map((item, index) =>
              reviews.edges.push({
                cursor: Base64.encode(skip + index + 1),
                node: item
              })
            );
          }
          return reviews;
        } catch (err) {
          throw err;
        }
      }
    }
  }
});

module.exports = QueryType;
