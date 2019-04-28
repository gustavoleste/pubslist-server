const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType
} = require("graphql");

const UserType = require("./userType");
const PubType = require("./pubType");
const ReviewType = require("./reviewType");

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
      type: new GraphQLList(ReviewType),
      args: {
        user: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { user }) => {
        try {
          const reviews = await Review.find({ user }).populate("pub");
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
          const pub = await Pub.findOne({ _id: pubID }).populate("user");
          return pub;
        } catch (err) {
          throw err;
        }
      }
    },
    pubs: {
      type: new GraphQLList(PubType),
      resolve: async () => {
        try {
          const pubs = await Pub.find().populate("user");
          return pubs;
        } catch (err) {
          throw err;
        }
      }
    },
    pubReview: {
      type: new GraphQLList(ReviewType),
      args: {
        pubID: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { pubID }) => {
        try {
          const reviews = await Review.find({ pub: pubID }).populate("user");
          return reviews;
        } catch (err) {
          throw err;
        }
      }
    }
  }
});

module.exports = QueryType;
