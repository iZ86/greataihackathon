// amplify/data/resource.ts
import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({
  ChatMessage: a.model({
    sessionId: a.string(),             // group messages by session
    userId: a.string(),                // who sent it
    role: a.enum(['user', 'ai']),      // message role
    message: a.string(),               // text
    createdAt: a.datetime().required() // timestamp
  }).authorization((allow) => [allow.owner(), allow.publicApiKey()]),

  ChatSession: a.model({
    sessionId: a.string().required(),      // unique session ID
    title: a.string(),                     // auto-generated title from first message
    userId: a.string().required(),         // user who owns the session
    lastMessageAt: a.datetime().required() // last activity timestamp
  }).authorization((allow) => [allow.owner(), allow.publicApiKey()])
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 30 },
  },
});
