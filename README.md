# Plogs

WEBSITE URL

## Description

Basic website where the user can search/reccommend the best places where dogs are allowed 

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can add places
- **login** - As a user I want to be able to log in on the webpage so that I can add places
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **search places** - As a user I want to see all the places allowed for dogs so that I can choose which one I want to visit
- **Add places** - As a user I want to add a place so that I can reccommend others to visit
- **profile page** - As a user I want to see my profile page so that I can logout or delete my account

## Backlog

User profile:
- List of places that the user have reccommended
- Edit or delete those places

Pages:
- **places details** - Where the user can see the places details
- **rating places** - Where the user can rank the places I visited
- **byebye page** - Page with message when the user delete the account

Other:
- Add favicon

## ROUTES: (update later)

- GET /
  - renders the homepage
- POST /
	- 

- GET /search
	-

- GET /auth/signup
  - renders the signup form
- POST /auth/signup
  - body:
    - username
    - email
    - password
		- confirm password
- GET /auth/login
  - renders the login form
- POST /auth/login
  - body:
    - username
    - password
- POST /auth/logout
  - body: (empty)

- GET /places
  - renders the map with marked places
- POST /places/add
  - redirects to / if user is anonymous
  - body:
    - name
    - date
    - location
    - description
- GET /profile
	- renders to profile page
- POST /profile
	- delete account
	- logout

## Models

User model

```
username: String
password: String
email: String
placesAdded: ObjectId<Places>,
```

Places model

```
latitude: Number,
longitude: Number,
address: String,
description: String,
authorId: ObjectId<User>
image: String,
com: ObjectId<Review>
category: Sring

```
Comments model

```
date: String,
comment: String,
userId: ObjectId<User>
placeId: ObjectId<Places>

```
## Links

### Wireframes

The url to our wireframes in Whimsical

[Whimsical](https://whimsical.com/plogs-LNuKhmgWX8VmHKukze676E)

### Notion

[Link to our notion](https://www.notion.so/14e34442ca5a4722b7e3559e389f5dd3?v=28b60a0f13cc4927918f92310aad07f5) 

### Git

The url to our repository and to our deployed project

[Repository Link](https://github.com/cruzines/Plogs)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link]()
