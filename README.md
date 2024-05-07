# Ban-Kan

Yet another kanban task management tracker

## Tech Stack

### Frontend (app)

- NPM -
- Angular 17 - https://angular.io/
- NgRx - https://ngrx.io/
- Material UI - https://mui.com/
- Karma + Protractor (or) Playwright

### Backend (api)

- Pip
- Django
- PostgreSQL
- Pytest
- OpenAPI


### Infrastructure (infra)

- Docker Containers

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

## Setup


## Running Locally

```sh
# == Running backend ==
cd backend
pip install -r requirements.txt

## Dev server starts at port 8000
python manage.py runserver 

## == Running frontend == 
cd app
ng serve

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
