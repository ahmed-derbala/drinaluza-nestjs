## Description
Backend for Drinaluza, a mobile-first application to manage small business.


## First run

```bash
# create /src/configs/config.ts based on /src/configs/config.sample.ts, install packages and satrt with vscode
cp src/configs/config.sample.ts src/configs/config.ts && npm i && npm run start:code
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
# this combines npm run format && git add . && git commit -m "commit message" && git push && start:devc
npm run push -- "feat(main): first commit"
```

## update packages
```bash
# make a backup of package.json in /docs, update all packages, install them and start the application
npm run update:a
```

## restore an update backup
```bash
# restore /docs/package.json.backup, install packages and run application
npm run update:r
```

## Postman
You can import postman collection located in /docs

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

