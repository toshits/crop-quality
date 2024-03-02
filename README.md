This is a full stack application project for generating crop quality report.

## Setting up the application

First, clone the repository :

```bash
git clone git@github.com:toshits/crop-quality.git
```

### Setting up the frontend (Next.js)

Open the directory and install the dependencies:
```shell
cd crop-quality
npm install
```

Now create the ``.env`` file with the help of ``.env.example`` file

Start the frontend server by:
```shell
# Development Server
npm run dev

# Production Server
npm run build
npm run start
```


### Setting up the backend application

Open the backend directory:
```shell
cd backend
```

Install the dependencies:
```shell
npm install
```

**NOTE** Create the ``.env`` file for the backend using ``.env.example:``

Setup Prisma by running:
```shell
npx prisma migrate deploy
npx prisma generate
```

Start the backend server by:
```shell
# Development
npm run dev

# Production
npm run build
npm run start
```

**NOTE:** Make sure your MySQL Server is up and running