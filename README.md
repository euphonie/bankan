# Ban-Kan

Yet another kanban task management tracker

## Tech Stack

### Frontend (app)

- NPM
- Angular 17 - https://angular.io/
- NgRx - https://ngrx.io/
- Material UI - https://mui.com/
- Playwright - https://playwright.dev/docs/codegen

### Backend (api)

- Pip
- Django
- PostgreSQL
- OpenAPI


### Infrastructure (infra)

- Docker Containers

```sh
cd infra 
docker compose up -d
# frontend will be available at http://localhost:80 
# and backend at http://localhost:8000
```

![Docker IAC](https://github.com/euphonie/bankan/blob/master/docs/screenshots/docker-iac.png?raw=true)

## Design

### Frontend

Design Pattern: Component based + Domain Driven

### Backend

Design Pattern: Layered Architecture + Domain Driven

Models/Entities:
1. === Task ===
- title (string)
- status_fk (reference to Status)
- created_at (datetime)
- updated_at (datetime)
- owner_fk (reference to User) (Nice to Have)
- assgined_to_fk (reference to User) (Nice to Have)

2. === Status ===
- description
- color
- type (initial, final, regular)

3. === User ===
- email
- role_fk (reference to Role) (Nice to Have)

4. === Role === (Nice to Have)
- name

Idea: User can be assigned to workspaces which contain custom setings like: user-defined statuses
5. === Workspace === (Nice to Have) (Many to Many with User)
- status_fk

### Diagrams

Some screenshots of the frontend application are available at `docs/screenshots`

#### Main View
![Main View](https://github.com/euphonie/bankan/blob/master/docs/screenshots/dashboard.png?raw=true)
#### Editing tasks
![Editing tasks](https://github.com/euphonie/bankan/blob/master/docs/screenshots/edit.png?raw=true)
#### Creating tasks
![Creating tasks](https://github.com/euphonie/bankan/blob/master/docs/screenshots/create.png?raw=true)
#### Marking tasks as completed / pending
![Marking tasks as completed or as pending](https://github.com/euphonie/bankan/blob/master/docs/screenshots/completed-tasks.png?raw=true)
#### Soft deleting or restoring 
![Soft deleting / Restoring tasks](https://github.com/euphonie/bankan/blob/master/docs/screenshots/soft-delete-and-restore.png?raw=true)


## Setup


## Running Locally

### Docker compose

```sh
cd infra 
docker compose up -d
# frontend will be available at http://localhost:80 
# and backend at http://localhost:8000
```

### Separate
```sh
# == Running backend ==
cd backend
pip install -r requirements.txt

## Dev server starts at port 8000
python manage.py runserver 

## Swagger (OpenAPI) specification should be available at http://localhost:8000/swagger/


## == Running frontend == 
cd app
ng serve

```

## Tests

### Backend

```sh
# APITestCase can be run with the following command.
# it helps test the /task endpoint for creation and reading 
python manage.py test
```

### Frontend

```sh
# E2E smoke test (testing overall functionality of the app) can be run with the following command.
# Important: docker containers must be running
npx playwright test
```

## Roadmap

### v0.0.1
- Project setup
- Database setup
- List tasks (minimal ui + backend crud)

### v0.0.2
- Create/Edit/Soft Delete tasks
- Quick action mark as completed/pending

### v0.0.3
- Hide completed tasks in a section at the bottom

### v0.0.4
- Create multiple columns for each status in the workspace and place tasks separated by status.

### v0.0.5
- Implement integration of workspaces to handle dynamic status definition
