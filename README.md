## ERD - Entity-Relationship Diagram

Our diagrams were drawn and planned using [Lucid Chart](https://www.lucidchart.com/)

## DATABASE - POSTGRES WITH DOCKER

The database we chose to use was [Postgres](https://www.postgresql.org/) and we are using [Docker](https://www.docker.com/) to hold it, instead of using it on our machine.

To create the database in our Docker we used the following command:

```docker
docker run --name pg-fincheck -e POSTGRES_USER=root -e POSTRES_PASSWORD=root -p 5432:5432 -d postgres
```
With the database running on Docker, we have to enter the container in order to create the Database itself

```docker
docker exec -it pg-fincheck bash
```

Then we enter Postgres with the user we created in our case root

```docker
psql -U root
```

Afte that we create our Database with the same name as our Docker Container

```docker
CREATE DATABASE fincheck;
```

With our database created now we will use [Prisma](https://www.prisma.io/) as *ORM - (Object-Relational Mapping)*  to manage the databases and create our schemas. 

We install [Prisma](https://www.prisma.io/) by using [Yarn](https://yarnpkg.com/) the following command:

```javascript
yarn add prisma
```

Prisma is comprised of 3 parts:

1. Prisma Client
2. Prisma Migrate
3. Prisma Studio

After installing [Prisma](https://www.prisma.io/) we use the command below to create our schema file in a folder called prisma and the environment variable:

```javascript
yarn prisma init
```

After executing the command above we must add our brand-new environment variable to out gitignore file and go to this very same env and configure it according to our database info, we configure the user, password and database name.

*And in the future if someone downloads this project or even myself tries to use or make some sort of maintenance we will not have the .env. In order to avoid things like that we provided the .env.example with the examples of the environment variables.*

It is also important to add a few configurations to our VSCode settings.json in order to maintain the proper indentation in the schema file:

```javascript
"[prisma]": {
    "editor.defaultFormatter": "Prisma.prisma",
    "editor.formatOnSave": true
  }
```

Once the model was created in our schema.prisma file we have to run the migration command for Prisma to turn our model into a table in the database:

```javascript
yarn prisma migrate dev
```

Prisma is going to ask for us to give this migration a name: create user model. And while the command above is being executed Prisma is going to add prisma client to our package.json file and a folder with the name of migrations will be created in the prisma folder.

To be able to see that Prisma has created a new table to our database we have to follow the following steps:

1. docker exec -it pg-fincheck bash - Access the bash terminal
2. psql -U root - Access with our user, in this case root
3. \c fincheck - Connect to the database
4. \dt - Display the existing tables

And after that we will surely see our User table

In the model User we added a property called *@@map()* to name the database instead of User with Pascal case and in singular, we create the model the way we want but by using *@@map()* we can rename it only in the database. After that we need to run the migration once again for the changes to take effect.

In case we stop Docker, or it is not running we run the following command to start the database container

```docker
docker start pg-fincheck
```

## Nest.js - Pipes

We are using pipes to validate our cases. Pipes can be used to tranaform or to validate. We are using the dependency from Nest.js, to install it we can use the following command:

```Javascript
yarn add class-validator class-transformer
```

Pipes are cool but we would have to be adding pipes all over the application, we might end up forgetting to add the decorator *@UsePipes* and also forget to instantiate the *ValidationPipe()*, and we might end up not knowing why the pipes are not working. And to avoid that we are gonna use **Global Pipes**.
Global Pipes are to be added in the main.ts file after the app variable created there.

```Javascript
app.useGlobalPipes(new ValidationPipe());
```
And by adding the code above we only have to add pipes to our DTOs and everything will work just fine 😉.

**OBS:** Pipes are added in the DTO file and for it to work we also have to use it in the controller.

## Passwords Encrypted

We used [bcryptjs](https://www.npmjs.com/package/bcryptjs) to safely save our passwords in the database encrypted, to avoid simply saving them as plain text.

## Repositories

We created repositories to abstract Prisma from our code. We added Prisma Service in the Users Repositories so that all the users can make use of Prisma. And by doing so we can even swap Prisma for TypeORM and it would work as long as we obey the object structure and naming.

Also created Database Module to use in all of our application without having to import it everywhere. We used the decorator **@Global()** and exported UsersRepository so that anyone who uses the UsersRepository will be making use of our Database with no need to import it.