# Welcome to MyShop Remix App!

- [Remix Docs](https://remix.run/docs)

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### Used Commmands in this app

```sh
# installed dependecies
npm i @emotion/react @emotion/styled  @mui/icons-material  @mui/material @prisma/client  prisma
# initialize prisma
npx prisma init --datasource-provider sqlite
# prisma studio
npx prisma studio
# seed database
npx prisma db seed
# migrate database tables
npx prisma db push
```
