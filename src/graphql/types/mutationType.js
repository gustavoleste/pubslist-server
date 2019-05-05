const { GraphQLNonNull, GraphQLString, GraphQLObjectType } = require("graphql");

const UserType = require("./userType");
const PubType = require("./pubType");
const ReviewType = require("./reviewType");
const CredentialType = require("./credentialType");

const { User, Pub, Review } = require("../../database/models");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    editUser: {
      type: UserType,
      args: {
        userID: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve: async (_, args, ctx) => {
        try {
          if (!ctx.state.isAuth) {
            throw new Error("Not Authenticated");
          }
          if (args.userID !== ctx.state.userID) {
            throw new Error("Not Authorized");
          }
          if (args.password) {
            args.password = await bcrypt.hash(args.password, 12);
          }
          let user = await User.findOne({ _id: args.userID });
          if (!user) {
            throw new Error("User not found");
          }
          delete args.userID;
          const newUser = Object.assign(user, args);
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
        address: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { name, address }, ctx) => {
        try {
          if (!ctx.state.isAuth) {
            throw new Error("Not Authenticated");
          }
          const newPub = new Pub({
            name,
            address,
            user: ctx.state.userID
          });
          await newPub.save();
          return newPub;
        } catch (err) {
          throw err;
        }
      }
    },
    editPub: {
      type: PubType,
      args: {
        pubID: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        address: { type: GraphQLString }
      },
      resolve: async (_, args, ctx) => {
        try {
          if (!ctx.state.isAuth) {
            throw new Error("Not Authenticated");
          }
          const pub = await Pub.findOne({ _id: args.pubID }).populate("user");
          if (!pub) {
            throw new Error("Pub Not Found");
          }
          if (pub.user !== req.userID) {
            throw new Error("Not Authorized");
          }
          delete args.userID;
          const newPub = Object.assign(pub, args);
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
        pub: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { review, pub }, ctx) => {
        try {
          if (!ctx.state.isAuth) {
            throw new Error("Not Authenticated");
          }
          const pubID = await Pub.findOne({ _id: pub }).populate("user");
          if (!pubID) {
            throw new Error("Pub Not Found");
          }
          const newReview = new Review({
            review,
            user: ctx.state.userID,
            pub
          });
          await newReview.save();
          return newReview;
        } catch (err) {
          throw err;
        }
      }
    },
    editReview: {
      type: ReviewType,
      args: {
        reviewID: { type: new GraphQLNonNull(GraphQLString) },
        review: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, args, ctx) => {
        try {
          if (!ctx.state.isAuth) {
            throw new Error("Not Authenticated");
          }
          const review = await Review.findOne({ _id: args.reviewID }).populate([
            "user",
            "pub"
          ]);
          if (!review) {
            throw new Error("Review Not Found");
          }
          if (review.user !== req.userID) {
            throw new Error("Not Authorized");
          }
          delete args.reviewID;
          const newReview = Object.assign(review, args);
          await newReview.save();
          return newReview;
        } catch (err) {
          throw err;
        }
      }
    },
    login: {
      type: CredentialType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { email, password }) => {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            throw new Error("Invalid Credentials");
          }
          const pass = await bcrypt.compare(password, user.password);
          if (!pass) {
            throw new Error("Invalid Credentials");
          }
          const token = await jwt.sign(
            { id: user._id },
            `${process.env.SECRET_KEY}`
          );
          console.log(token);
          return { token };
        } catch (err) {
          throw err;
        }
      }
    }
  }
});

module.exports = MutationType;
