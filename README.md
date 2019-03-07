# codebase-npm
A NodeJS library for the CodebaseHQ API

# Note
This library creates objects for users, projects, tickets etc.
When you make a query to retrieve tickets (this is just an example, it can apply to other classes too) it will attempt to look up the users and link the ticket assignee/reporter with the user.
If you haven't already retrieved users then your ticket will have no assignee or reporter assigned to it. Because of this, the best steps to take are:

- retrieve users
- retrieve projects
- retrieve tickets for the project
- retrieve time sessions for the project

Instructions for each of these steps can be found below.

There is also an examples project with some demos to help understand the code and how it functions. This can be found [here](https://github.com/jaymeh/codebase-npm-examples).

# Usage
## Connecting to the API
In order to connect to and query the codebase API you need to create a CodebaseHQAccount object

```js
import { codebase } from 'codebase-npm';
let codebaseConnection = new codebase(apiUser, apiKey, apiHostname);
```

## Retrieving All Users
Users are pulled at the account level

```js
let users = await codebaseConnection.users();
```

This returns a `UserCollection` - searching should be done on the collection, the class has a few helper methods for this. This is also built from the library 'collectionsjs' which can be found [here](http://www.collectionsjs.com/).

## Retrieving Projects
Projects can be pulled as a whole for the account, or individually by permalink.
Projects are populated with all of their categories, priorities, statuses and types.

### Retrieving All Projects
Projects are also pulled at the account level

```js
let projects = await codebaseConnection.projects();
```

This returns a `ProjectCollection` - searching should be done on the collection, the class has a few helper methods for this again this is extended from the CollectionsJS node module.

### Retrieving Individual Projects
You can pull an individual project by the permalink (note the method name is singular)

```js
let project = await codebaseConnection.project('project-permalink');
```

This returns a `Project` model - not a collection



## Retrieving Tickets for a Project
Tickets can only be retrieved if you have a `Project` object.

```js
await codebaseConnection.tickets(project, pageNo);

project.getTickets();
```

The tickets method returns a boolean indicating whether there are further results (as the results are paginated).
The tickets themselves are added to a `TicketCollection` in the project. As always, searching should be done on the collection, the class has a few helper methods for this


### Pagination
Tickets are paginated, with 20 per page. You can write a simple loop to pull all tickets for the project

```js
let pageNo = 1;
let moreResultsToRetrieve = true;

while (moreResultsToRetrieve) {
    moreResultsToRetrieve = await codebaseConnection.tickets(project, pageNo);
    pageNo++;
}
```



## Retrieving Time Sessions for a Project
Time Sessions can only be retrieved if you have a `Project` object.
You must also pass through a period to retrieve the times for, this can be a day/week/month or all - classes exist for each one.

```js
// can be All|Day|Week|Month
import {All, Day, Week, Month} from 'codebase'

await codebaseConnection.times(project, new Week());
```

Time sessions will be associated with the project, the ticket and the user if you have populated those collections.

```js
// times for the project
project.getTimeSessions();

// times associated to a user
user.getTimeSessions();

// times associated to a ticket
ticket.getTimeSessions();
```

