# PaletteHQ Technical test

## Description

A simple API to manage teams and their members developped using NestJS and PostgreSQL on Docker.

This project follows the Clean Architecture Principles.

```js
+-- dist // Source build
+-- src
|   +-- application // API / Presentation Layer 
|   |   +-- controllers // Controllers
|   |   +-- decorators // Custom Decorators
|   |   +-- dto // DTO (Data Transfer Object) Schema, Validation
|   +-- domain // Domain / Business Layer
|   |   +-- entities // Entities manipulated by the Domain and stored by the Infrastructure layer
|   |   +-- repositories // Interfaces of repositories used by the usecases
|   |   +-- usecases // Usecases containing the business logic
|   +-- infrastructure // Layer with external connection 
|   |   +-- repositoriesImpl // Implementation of repositories
|   +-- shared // Shared Nest Objects
```

## Installation
1. Clone this repository:
  ```bash
    git clone https://github.com/ksavidetove/Palette
    cd Palette
  ```

2. Install the dependancies
  ```bash
  $ npm i
  ```

3. Using Docker, spin up a PostgreSQL instance
  ```bash
  $ docker-compose up
  ```
4. Configure the necessary environment variables. Copy the `.env.example` file provided at the root of the project into a `.env` file

5. Start the server
  ```bash
  $ npm start
  ```

## REST Api

A REST API is available after the start of the server at
```
http://localhost:3000
```

### Teams
#### - Create a Team
- **Endpoint:** `POST /team`
- **Description:** Create a new team with a provided `name` and store it in DB
- **Parameters:**
  - `name` (body): The name of the Team to create

#### - Get a Team
- **Endpoint:** `GET /team/:id`
- **Description:** Retrieve the details of the team matching the provided `id` in DB
- **Parameters:**
  - `id` (parameter): The id of the team to delete

#### - List / Search Teams
- **Endpoint:** `GET /team`
- **Description:** Return all the teams matching the provided `name` and/or `id` in DB
- **Parameters:**
  - `name` (query string): The name of the Team(s) to find
  - `id` (query string): The id of the team to find

#### - Update a Team
- **Endpoint:** `PUT /team/:id`
- **Description:** Update the team name matching the provided `id` in DB
- **Parameters:**
  - `id` (parameter): The id of the team to update
  - `name` (body): The new name of the team

#### - Delete a Team
- **Endpoint:** `DELETE /team/:id`
- **Description:** Delete the team matching the provided `id` in DB
- **Parameters:**
  - `id` (parameter): The id of the team to delete
  
#### - Add Members to a Team
- **Endpoint:** `Post /team/:id/addMembers`
- **Description:** Add members to the team matching the provided `id` in DB
- **Parameters:**
  - `id` (parameter): The id of the team to update
  - `ids` (body): The ids of the members to add. They must exists in DB

#### - Remove Members from a Team
- **Endpoint:** `Post /team/:id/removeMembers`
- **Description:** Remove members from the team matching the provided `id` in DB
- **Parameters:**
  - `id` (parameter): The id of the team to update
  - `ids` (body): The ids of the members to remove
  
#### - Add a Sub-Team to a Team
- **Endpoint:** `Get /team/:id/linkTo/:parentId`
- **Description:** Link a sub-team from to another team
- **Parameters:**
  - `id` (parameter): The id of the team to update
  - `parentId` (body): The ids of the members to remove

#### - Remove a Sub-Team from a Team
- **Endpoint:** `Get /team/:id/unlink`
- **Description:** Remove a sub-team matching the provided `id` in DB from it's parent 
- **Parameters:**
  - `id` (parameter): The id of the sub-team

### Members
#### - Create a Member
- **Endpoint:** `POST /member`
- **Description:** Create a new member with a provided `name` and store it in DB
- **Parameters:**
  - `name` (body): The name of the member to create

#### - Get a Member
- **Endpoint:** `GET /member/:id`
- **Description:** Retrieve the details of the member matching the provided `id` in DB
- **Parameters:**
  - `id` (parameter): The id of the member to delete

#### - List / Search Members
- **Endpoint:** `GET /member`
- **Description:** Return all the members matching the provided `name` and/or `id` in DB
- **Parameters:**
  - `name` (query string): The name of the member(s) to find
  - `id` (query string): The id of the member to find


#### - Update a Member
- **Endpoint:** `PUT /member/:id`
- **Description:** Update the member name matching the provided `id` in DB
- **Parameters:**
  - `id` (parameter): The id of the member to update
  - `name` (body): The new name of the member

#### - Delete a Member
- **Endpoint:** `DELETE /member/:id`
- **Description:** Delete the member matching the provided `id` in DB
- **Parameters:**
  - `id` (parameter): The id of the member to delete

## Test

```bash
# unit tests
$ npm run test
```

