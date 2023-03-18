const name = 'drinaluza';

export default () => ({
  app: {
    name,
    version: '1.0.0',
    description:
      'Backend of Drinaluza. A mobile-first app to manage small business.',
  },
  port: parseInt(process.env.PORT, 10) || 5000,
  db: {
    uri: `mongodb://localhost/${name}`,
  },
  auth: {
    saltOrRounds: 10,
    jwt: {
      secret: name,
      signOptions: {
        expiresIn: '30d',
      },
    },
  },
  NODE_ENV: 'local', //local or development or production
  throttler: {
    ttl: 60,
    limit: 10,
  },
});
