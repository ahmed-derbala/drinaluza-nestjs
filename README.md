## Description
Backend for Drinaluza which is an application to manage small business.
## First run

```bash
npm i && npm run start:dev
```

## Run

```bash
# development
npm run start

# production mode
npm run start:prod

# watch mode
npm run start:dev

# remove /dist and run start:dev
npm run start:devc
```


## Clean

```bash
# remove /dist package-lock and node_modules
npm run clean:a

# clean:a and install packages
npm run clean:ai

# clean:ai and run 
npm run clean:air

```


## Faster git commit and push

```bash
# this combines git add . && git commit -m "commit message" && git push && start:devc
npm run git -- "commit message"
```

## update packages
```bash
# update all packages and clean:air
npm run update:a
```


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
