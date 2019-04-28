const { GraphQLNonNull, GraphQLString, GraphQLObjectType } = require("graphql");

const UserType = require("./userType");
const PubType = require("./pubType");
const ReviewType = require("./reviewType");

const { User, Pub, Review } = require("../../database/models");

const bcrypt = require("bcryptjs");

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    newUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { name, email, password }) => {
        try {
          const hash = await bcrypt.hash(password, 12);
          const newUser = new User({
            name,
            email,
            password: hash
          });
          await newUser.save();
          return newUser;
        } catch (err) {
          throw err;
        }
      }
    },
    newPub: {
      type: PubType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: new GraphQLNonNull(GraphQLString) },
        user: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { name, address, user }) => {
        try {
          const newPub = new Pub({
            name,
            address,
            user
          });
          await newPub.save();
          return newPub;
        } catch (err) {
          throw err;
        }
      }
    },
    newReview: {
      type: ReviewType,
      args: {
        review: { type: new GraphQLNonNull(GraphQLString) },
        user: { type: new GraphQLNonNull(GraphQLString) },
        pub: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { review, user, pub }) => {
        try {
          const newReview = new Review({
            review,
            user,
            pub
          });
          await newReview.save();
          return newReview;
        } catch (err) {
          throw err;
        }
      }
    }
  }
});

module.exports = MutationType;
