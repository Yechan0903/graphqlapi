
import { ApolloServer, gql } from "apollo-server";

let tweets = [
    {
        id: "1",
        text: "first one!",
    },
    {
        id: "2",
        text: "second one!",
    },
]

let users = [
    {
        id:"1",
        firstName:"yechan",
        lastName:"shin",
    },
    {
        id:"2",
        firstName:"yeji",
        lastName:"hang",
    },
];

const typeDefs = gql`
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        fullName: String!
    }
    type Tweet {
        id: ID!
        text: String!
        author: User!
    }
    type Query {
        allUser: [User!]!
        allTweets: [Tweet!]!
        tweet(id: ID!): Tweet
    }
    type Mutation {
        postTweet(text: String!, userId: ID!): Tweet!
        deleteTweet(id:ID!): Boolean!
    }
`;

const resolvers = {
    Query: {
        allTweets() {
            return tweets;
        },
        allUser() {
            return users;
        },
        tweet(root, {id}){
            return tweets.find(t => t.id === id);
        },
    },
    Mutation: {
        postTweet(_, {text, userId}) {
            const newTweet= {
                id: tweets.length + 1,
                text,
            };
            tweets.push(newTweet);
            return newTweet;
        },
        deleteTweet(_, {id}) {
            const tweet = tweets.find(t => t.id === id);
            if(!tweet) return false;
            tweets = tweets.filter(t => t.id !== id);
            return true;
        },
    },
    User: {
        fullName({firstName,lastName}) {
            return `${firstName} ${lastName}`;
        },
    },
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
    console.log(`Running on ${url}`);
});