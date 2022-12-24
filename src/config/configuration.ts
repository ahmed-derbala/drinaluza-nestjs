const name = 'drinaluza';
export default () => ({
  app: {
    name,
    version: '1.0.0',
    port: parseInt(process.env.PORT, 10) || 5000,
  },
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
});
