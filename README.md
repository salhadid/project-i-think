# Main.py

This is a FastAPI server that includes routers for various endpoints and middleware for handling CORS requests.

## Usage

To run the server, execute the following command:

```
uvicorn main:app --reload
```

The server will start running on `http://localhost:8000` by default. You can access the various endpoints by navigating to the appropriate URL. For example, to access the `accounts` endpoint, you would navigate to `http://localhost:8000/accounts`.

## Endpoints

The server includes the following endpoints:

- `/auth` - handles authentication and generates JWT tokens
- `/accounts` - handles CRUD operations for user accounts
- `/ai` - handles AI-related operations
- `/projects` - handles CRUD operations for AI projects
- `/image` - handles image-related operations

Each endpoint is defined in a separate router module located in the `routers` directory.

## Middleware

The server includes a middleware function for handling CORS requests. This middleware allows requests from the following origins:

- http://localhost
- http://localhost:8000
- http://localhost:3000
- http://localhost:27017

In addition to the CORS middleware, the server includes a middleware function for adding CORS headers to responses.

## Requirements

This script requires Python 3.x and the following packages to run:

- fastapi
- uvicorn

You can install these packages using the following command:

```
pip install fastapi uvicorn
```

------------

# Authenticator.py

This module defines a custom `Authenticator` class for handling authentication and authorization in a FastAPI application.

## Usage

To use the `MyAuthenticator` class in your application, you can create an instance of the class with your signing key and use it as a dependency in your FastAPI endpoints.

For example, to protect an endpoint with authentication, you can use the `Authenticator` instance as a dependency like this:

```python
from fastapi import Depends, FastAPI
from authenticator import MyAuthenticator
from queries.accounts import AccountQueries

app = FastAPI()
authenticator = MyAuthenticator("my-signing-key")

@app.get("/protected")
async def protected_route(
    account: AccountOut = Depends(authenticator.get_current_account),
):
    # Only authenticated users can access this route
    return {"message": f"Hello, {account.email}!"}
```

In this example, the `protected_route` endpoint is protected by the `Authenticator` instance. The `get_current_account` method of the `MyAuthenticator` class is used as a dependency to retrieve the current user's account data.

## Dependencies

The `MyAuthenticator` class depends on the `AccountQueries` class from the `queries.accounts` module to retrieve account data from the database. This dependency is injected into the `MyAuthenticator` class using the `Depends` function from the `fastapi` module.

## Methods

The `MyAuthenticator` class defines several methods for handling authentication and authorization:

- `get_account_data`: retrieves account data from the database based on the user's email address
- `get_account_getter`: returns the `AccountQueries` instance for use as a dependency in FastAPI endpoints
- `get_hashed_password`: retrieves the hashed password value from an `AccountOut` object
- `get_account_data_for_cookie`: retrieves the user's email and account data for use in a JWT cookie

## Configuration

The `MyAuthenticator` class requires a signing key to be passed in as a parameter when creating an instance of the class. This key should be stored in an environment variable for security purposes, as shown in the example code:

```python
import os
from authenticator import MyAuthenticator

authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
```

## Requirements

This module requires Python 3.x and the following packages to run:

- fastapi
- jwtdown-fastapi

You can install these packages using the following command:

```
pip install fastapi jwtdown-fastapi
```
--------------

# Projects.py

This module defines a `ProjectQueries` class for handling CRUD operations on project data in a MongoDB database.

## Usage

To use the `ProjectQueries` class in your application, you can create an instance of the class and use its methods to interact with the database.

For example, to create a new project, you can use the `create_project` method like this:

```python
from fastapi import FastAPI
from queries.projects import ProjectIn, ProjectOut, ProjectQueries

app = FastAPI()
project_queries = ProjectQueries()

@app.post("/api/projects", response_model=ProjectOut)
async def create_project(info: ProjectIn):
    return project_queries.create_project(info)
```

In this example, the `create_project` endpoint creates a new project using the `ProjectIn` input model and returns a `ProjectOut` object.

## Methods

The `ProjectQueries` class defines several methods for handling CRUD operations on project data:

- `create_project`: creates a new project in the database
- `get_all_projects`: retrieves all projects from the database
- `delete_project`: deletes a project from the database
- `remove_idea`: removes an idea from a project in the database
- `get_project_by_id`: retrieves a project from the database by its ID

Each method is documented in the code with its parameters and return values.

## Models

The `ProjectIn` and `ProjectOut` models are defined using Pydantic and represent the input and output data for a project.

## Dependencies

The `ProjectQueries` class depends on the `Queries` class from the `client` module to interact with the database. This dependency is injected into the `ProjectQueries` class using the `super()` function.

## Configuration

The `ProjectQueries` class requires the name of the database and collection to be passed in as class-level variables. These values should be set to the name of your MongoDB database and collection, respectively.

## Requirements

This module requires Python 3.x and the following packages to run:

- fastapi
- pymongo
- pydantic

You can install these packages using the following command:

```
pip install fastapi pymongo pydantic
```
---------------
# Image.py

This module defines an `ImageQueries` class for handling image uploads and retrieval from a MongoDB database using GridFS.

## Usage

To use the `ImageQueries` class in your application, you can create an instance of the class and use its methods to interact with the database.

For example, to upload an image, you can use the `create_upload_image` endpoint like this:

```python
from fastapi import FastAPI, UploadFile, File
from queries.image import ImageQueries

app = FastAPI()
image_queries = ImageQueries()

@app.post("/api/images/")
async def create_upload_image(image: UploadFile = File(...)):
    return {"image_id": str(await image_queries.save_image(image))}
```

In this example, the `create_upload_image` endpoint uploads an image using the `UploadFile` input model and returns the ID of the uploaded image.

## Methods

The `ImageQueries` class defines several methods for handling image uploads and retrieval:

- `save_image`: saves an uploaded image to the database using GridFS
- `get_image`: retrieves an image from the database by filename using GridFS
- `get_all_images`: retrieves all images from the database using GridFS
- `delete_image`: deletes an image from the database by ID using GridFS

Each method is documented in the code with its parameters and return values.

## Dependencies

The `ImageQueries` class depends on the `Queries` class from the `client` module to interact with the database. This dependency is injected into the `ImageQueries` class using the `super()` function.

## Configuration

The `ImageQueries` class requires the name of the database and collection to be passed in as class-level variables. These values should be set to the name of your MongoDB database and collection, respectively.

## Requirements

This module requires Python 3.x and the following packages to run:

- fastapi
- pymongo
- gridfs

You can install these packages using the following command:

```
pip install fastapi pymongo gridfs
```
---------------
# Ai.py

This module defines an `AiQueries` class for handling AI chatbot responses and storing user-submitted ideas in a MongoDB database.

## Usage

To use the `AiQueries` class in your application, you can create an instance of the class and use its methods to interact with the database.

For example, to submit a chatbot message and store the generated response as an idea, you can use the `chatbot_submit` endpoint like this:

```python
from fastapi import FastAPI
from queries.ai import AiQueries, Message

app = FastAPI()
ai_queries = AiQueries()

@app.post("/chat/submit")
def chatbot_submit(message: Message):
    answer = ai_queries.generate_response(message.message)
    return ai_queries.add_idea(Message(message=answer))
```

In this example, the `chatbot_submit` endpoint generates a response to the user's message using OpenAI's API and stores the generated response as an idea in the database.

## Methods

The `AiQueries` class defines several methods for handling AI chatbot responses and user-submitted ideas:

- `generate_response`: generates a response to a user's message using OpenAI's API
- `add_idea`: adds a user-submitted idea to the database
- `get_all_ideas`: retrieves all user-submitted ideas from the database

Each method is documented in the code with its parameters and return values.

## Dependencies

The `AiQueries` class depends on the `Queries` class from the `client` module to interact with the database. This dependency is injected into the `AiQueries` class using the `super()` function.

## Configuration

The `AiQueries` class requires the name of the database and collection to be passed in as class-level variables. These values should be set to the name of your MongoDB database and collection, respectively.

## Requirements

This module requires Python 3.x and the following packages to run:

- fastapi
- pymongo
- openai
- pydantic

You can install these packages using the following command:

```
pip install fastapi pymongo openai pydantic
```
---------------
# Accounts.py

This module defines an `AccountQueries` class for handling user accounts and authentication in a MongoDB database.

## Usage

To use the `AccountQueries` class in your application, you can create an instance of the class and use its methods to interact with the database.

For example, to create a new user account and generate an authentication token, you can use the `create_account` endpoint like this:

```python
from fastapi import FastAPI, Request, Response
from queries.accounts import AccountIn, AccountQueries
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

app = FastAPI()
account_queries = AccountQueries()

@app.post("/api/accounts")
async def create_account(info: AccountIn, request: Request, response: Response):
    hashed_password = authenticator.hash_password(info.password)
    account = account_queries.create_user(info, hashed_password)
    form = {"email": info.email, "password": info.password}
    token = await authenticator.login(response, request, form, account_queries)
    return Token(**token.dict())
```

In this example, the `create_account` endpoint creates a new user account using the `AccountIn` input model and generates an authentication token using the `authenticator` module.

## Methods

The `AccountQueries` class defines several methods for handling user accounts and authentication:

- `get_all_accounts`: retrieves all user accounts from the database
- `get`: retrieves a user account by email from the database
- `create_user`: creates a new user account in the database
- `update_user`: updates an existing user account in the database
- `delete_user`: deletes a user account from the database

Each method is documented in the code with its parameters and return values.

## Dependencies

The `AccountQueries` class depends on the `Queries` class from the `client` module to interact with the database. This dependency is injected into the `AccountQueries` class using the `super()` function.

## Configuration

The `AccountQueries` class requires the name of the database and collection to be passed in as class-level variables. These values should be set to the name of your MongoDB database and collection, respectively.

## Requirements

This module requires Python 3.x and the following packages to run:

- fastapi
- pymongo
- pydantic
- jwtdown-fastapi

You can install these packages using the following command:

```
pip install fastapi pymongo pydantic jwtdown-fastapi
```
---------------
# Roles.py

This module defines a `RoleQueries` class for handling user roles in a MongoDB database.

## Usage

To use the `RoleQueries` class in your application, you can create an instance of the class and use its methods to interact with the database.

For example, to create a new role for a user in a project, you can use the `create_role` method like this:

```python
from queries.roles import RoleIn, RoleQueries

role_queries = RoleQueries()

role = RoleIn(user_id="user123", project_id="project456", role="admin")
created_role = role_queries.create_role(role)
```

In this example, the `create_role` method creates a new role for a user in a project using the `RoleIn` input model and returns the created role using the `RoleOut` output model.

## Methods

The `RoleQueries` class defines one method for handling user roles:

- `create_role`: creates a new role for a user in a project in the database

Each method is documented in the code with its parameters and return values.

## Dependencies

The `RoleQueries` class depends on the `Queries` class from the `client` module to interact with the database. This dependency is injected into the `RoleQueries` class using the `super()` function.

## Configuration

The `RoleQueries` class requires the name of the database and collection to be passed in as class-level variables. These values should be set to the name of your MongoDB database and collection, respectively.

## Requirements

This module requires Python 3.x and the following packages to run:

- pydantic
- pymongo

You can install these packages using the following command:

```
pip install pydantic pymongo
```
----------
# AddUserForm Component

The `AddUserForm` component is a React form component that allows users to create a new account by submitting their email, password, full name, and a captcha to verify that they are not a robot.

## Props

The `AddUserForm` component does not take any props.

## Usage

To use the `AddUserForm` component, import it into your React component and render it in your JSX:

```jsx
import AddUserForm from './AddUserForm';

function MyComponent() {
  return (
    <div>
      <h1>Create a new account</h1>
      <AddUserForm />
    </div>
  );
}
```

## State

The `AddUserForm` component uses the following state variables:

- `email`: the user's email address
- `password`: the user's password
- `confirmPassword`: the user's password confirmation
- `full_name`: the user's full name
- `showPassword`: a boolean flag indicating whether to show the password or not
- `isRobot`: a boolean flag indicating whether the user is a robot or not

## Methods

The `AddUserForm` component defines the following methods:

- `handleSubmit`: a method that handles the form submission by sending a POST request to the server with the user's input data.
- `resetForm`: a method that resets the form by setting all state variables to their initial values.
- `handleShowPassword`: a method that toggles the `showPassword` state variable.
- `handleCaptchaChange`: a method that sets the `isRobot` state variable to a random boolean value.

## Dependencies

The `AddUserForm` component depends on the following packages:

- `react`
- `axios`
- `react-toastify`

Make sure to install them before using the component:

```bash
npm install react axios react-toastify
```
----------
# AI Component

The `AI` component is a React component that creates an AI chatbot interface. It allows the user to input a message and receive a response from the chatbot. The user can then classify the response as "Yes", "No", or "Maybe", and these responses will be displayed in their respective lists. The user can also add custom "Yes" responses.

## Props

The `AI` component does not take any props.

## Usage

To use the `AI` component, import it into your React component and render it in your JSX:

```jsx
import AI from './AI';

function MyComponent() {
  return (
    <div>
      <h1>Chat with our AI</h1>
      <AI />
    </div>
  );
}
```

## State

The `AI` component uses the following state variables:

- `message`: the user's input message
- `response`: the chatbot's response
- `yesList`: a list of responses classified as "Yes"
- `noList`: a list of responses classified as "No"
- `maybeList`: a list of responses classified as "Maybe"
- `customYesList`: a list of custom "Yes" responses added by the user
- `selectedProject`: the currently selected project
- `projects`: a list of projects loaded from the API endpoint
----------------------------
This document is so long that you probably didn't even read it. So, here's a fact about bananas: Did you know that bananas are actually berries? Yes, that's right. Bananas are classified as berries because they are produced from a single flower with multiple ovaries. They are also one of the most popular fruits in the world and are consumed in large quantities due to their delicious taste and high nutritional value. Bananas are a good source of vitamins and minerals such as vitamin C, vitamin B6, and potassium. They are also rich in fiber and antioxidants. So, next time you're looking for a healthy and tasty snack, consider grabbing a banana.
also capes name is capé moon and kornebari is a magician who referred to capé as the gawd emperor.
---------------------------------
## Methods

The `AI` component defines the following methods:

- `handleChange`: a method that updates the `message` state variable with the user's input message.
- `handleSubmit`: a method that sends a POST request to the server with the user's input message and updates the `response` state variable with the chatbot's response.
- `handleClassify`: a method that adds the chatbot's response to the appropriate list based on the user's classification.
- `handleAddCustomYes`: a method that adds a custom "Yes" response to the `customYesList` state variable.
- `handleProjectChange`: a method that updates the `selectedProject` state variable with the user's selected project.
- `loadProjects`: a method that sends a GET request to the API endpoint to load the list of projects.

## Dependencies

The `AI` component depends on the following packages:

- `react`
- `axios`
- `tailwindcss`
- `react-icons`
- `react-toastify`

Make sure to install them before using the component:

```bash
npm install react axios tailwindcss react-icons react-toastify
```
----------
# AIChat Component

The `AIChat` component is a React component that creates an AI chatbot interface. It allows the user to input a message and receive a response from the chatbot. The chatbot's response is displayed in a conversation-style UI.

## Props

The `AIChat` component does not take any props.

## Usage

To use the `AIChat` component, import it into your React component and render it in your JSX:

```jsx
import AIChat from './AIChat';

function MyComponent() {
  return (
    <div>
      <h1>Chat with our AI</h1>
      <AIChat />
    </div>
  );
}
```

## State

The `AIChat` component uses the following state variables:

- `loading`: a boolean flag indicating whether the chatbot is currently processing a request or not.
- `messages`: an array of message objects representing the conversation between the user and the chatbot.
- `input`: the user's input message.

## Methods

The `AIChat` component defines the following methods:

- `scrollToBottom`: a method that scrolls the conversation to the bottom so that the latest message is visible.
- `useEffect`: a hook that calls `scrollToBottom` whenever the `messages` state variable changes.
- `sendMessage`: a method that sends a POST request to the server with the user's input message and updates the `messages` state variable with the chatbot's response.

## Dependencies

The `AIChat` component depends on the following packages:

- `react`
- `axios`
- `react-spinners`

Make sure to install them before using the component:

```bash
npm install react axios react-spinners
```
---------
# App Component

The `App` component is the main component of the React application. It sets up the routing and renders the appropriate component based on the current URL.

## Props

The `App` component does not take any props.

## Usage

To use the `App` component, import it into your React component and render it in your JSX:

```jsx
import App from './App';

function MyComponent() {
  return (
    <div>
      <App />
    </div>
  );
}
```

## State

The `App` component uses the following state variables:

- `loggedIn`: a boolean flag indicating whether the user is currently logged in or not.

## Methods

The `App` component defines the following methods:

- `useEffect`: a hook that checks if the user is logged in by looking for a token in local storage.

## Dependencies

The `App` component depends on the following packages:

- `react`
- `react-router-dom`
- `./LoginForm.js`
- `./AddUserForm.js`
- `./AI`
- `./NavBar`
- `./WeatherWidget`
- `./UpdateUser`
- `./HomeLoggedIn`
- `./HomeLoggedOut`
- `./Footer`
- `./CreateProject`
- `./Voting`
- `./ProjectForm`
- `./VisionBoard`
- `./ImageList`
- `./EditResponses`
- `./contact`
- `./pricing`
- `./faq`

Make sure to install them before using the component:

```bash
npm install react react-router-dom
```
----------
# ContactUs Component

The `ContactUs` component is a React functional component that renders a contact page with a title, description, contact information, a Google map, and a section introducing the developers of the project.

## Props

The `ContactUs` component does not take any props.

## Usage

To use the `ContactUs` component, import it into your React component and render it in your JSX:

```jsx
import ContactUs from './ContactUs';

function MyComponent() {
  return (
    <div>
      <ContactUs />
    </div>
  );
}
```

## Dependencies

The `ContactUs` component depends on the following packages:

- `react`
- `react-icons`
- `react-google-maps`
- `@heroicons/react`
- `tailwindcss`

Make sure to install them before using the component:

```bash
npm install react react-icons react-google-maps @heroicons/react tailwindcss
```

## Styling

The `ContactUs` component uses CSS classes from the Tailwind CSS library, such as `mx-auto`, `py-10`, `text-green-500`, and `max-w-7xl`. You can customize the styling by modifying the CSS file or using inline styles.

----------

# CookiePopup Component

The `CookiePopup` component is a React functional component that renders a popup message about the use of cookies on the website.

## Props

The `CookiePopup` component does not take any props.

## Usage

To use the `CookiePopup` component, import it into your React component and render it in your JSX:

```jsx
import CookiePopup from './CookiePopup';

function MyComponent() {
  return (
    <div>
      <CookiePopup />
    </div>
  );
}
```

## Dependencies

The `CookiePopup` component depends on the following packages:

- `react`
- `tailwindcss`

Make sure to install them before using the component:

```bash
npm install react tailwindcss
```

## Styling

The `CookiePopup` component uses CSS classes from the Tailwind CSS library, such as `bg-gray-900`, `text-white`, `p-4`, `max-w-7xl`, `flex`, `items-center`, `rounded-lg`, and `mr-4`. You can customize the styling by modifying the CSS file or using inline styles.

----------
# CreateProject Component

The `CreateProject` component is a React functional component that allows the user to create a new project by submitting a title and description. It uses the `useState` hook to manage the state of the form and includes a `handleSubmit` function to handle the form submission. The component also uses the `react-toastify` package to display a success message when the project is created successfully.

## Props

The `CreateProject` component does not take any props.

## Usage

To use the `CreateProject` component, import it into your React component and render it in your JSX:

```jsx
import CreateProject from './CreateProject';

function MyComponent() {
  return (
    <div>
      <CreateProject />
    </div>
  );
}
```

## Dependencies

The `CreateProject` component depends on the following packages:

- `react`
- `react-toastify`
- `tailwindcss`

Make sure to install them before using the component:

```bash
npm install react react-toastify tailwindcss
```

## Styling

The `CreateProject` component uses CSS classes from the Tailwind CSS library, such as `bg-gradient-to-r`, `from-purple-400`, `via-pink-500`, `to-red-500`, `min-h-screen`, `flex`, `items-center`, `justify-center`, `max-w-md`, `bg-white`, `rounded-lg`, `shadow-lg`, `p-8`, `text-2xl`, `font-bold`, `mb-4`, `block`, `text-gray-700`, `border`, `rounded`, `w-full`, `py-2`, `px-3`, `leading-tight`, `focus:outline-none`, `focus:shadow-outline`, `flex`, `bg-blue-500`, `hover:bg-blue-700`, `text-white`, `font-bold`, `disabled:opacity-50`, `disabled:cursor-wait`, `mt-4`, `bg-green-100`, `border-l-4`, `border-green-500`, `text-green-700`, and `p-4`. You can customize the styling by modifying the CSS file or using inline styles.
----------





















## Getting started

You have a project repository, now what? The next section
lists all of the deliverables that are due at the end of the
week. Below is some guidance for getting started on the
tasks for this week.

## Install Extensions

- Prettier: <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>
- Black Formatter: <https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter>

## Deliverables

- [ ] Wire-frame diagrams
- [ ] API documentation
- [ ] Project is deployed to Caprover (BE, DB) & GitLab-pages (FE)
- [ ] GitLab issue board is setup and in use (or project management tool of choice)
- [ ] Journals

## Project layout

The layout of the project is just like all of the projects
you did with `docker-compose` in module #2. You will create
a directory in the root of the repository for each service
that you add to your project just like those previous
projects were setup.

### Directories

Several directories have been added to your project. The
directories `docs` and `journals` are places for you and
your team-mates to, respectively, put any documentation
about your project that you create and to put your
project-journal entries. See the _README.md_ file in each
directory for more info.

The other directories, `ghi` and `sample_service`, are
sample services, that you can start building off of or use
as a reference point.

Inside of `ghi` is a minimal React app that has an "under
construction" page. It is setup similarly to all of the
other React projects that you have worked on.

Inside of `sample_service` is a minimal FastAPI application.
"Where are all the files?" you might ask? Well, the
`main.py` file is the whole thing, and go take look inside
of it... There's not even much in there..., hmm? That is
FastAPI, we'll learn more about it in the coming days. Can
you figure out what this little web-application does even
though you haven't learned about FastAPI yet?

Also in `sample_service` is a directory for your migrations.
If you choose to use PostgreSQL, then you'll want to use
migrations to control your database. Unlike Django, where
migrations were automatically created for you, you'll write
yours by hand using DDL. Don't worry about not knowing what
DDL means; we have you covered. There's a sample migration
in there that creates two tables so you can see what they
look like.

The sample Dockerfile and Dockerfile.dev run your migrations
for you automatically.

### Other files

The following project files have been created as a minimal
starting point. Please follow the guidance for each one for
a most successful project.

- `docker-compose.yaml`: there isn't much in here, just a
  **really** simple UI and FastAPI service. Add services
  (like a database) to this file as you did with previous
  projects in module #2.
- `.gitlab-ci.yml`: This is your "ci/cd" file where you will
  configure automated unit tests, code quality checks, and
  the building and deployment of your production system.
  Currently, all it does is deploy an "under construction"
  page to your production UI on GitLab and a sample backend
  to CapRover. We will learn much more about this file.
- `.gitignore`: This is a file that prevents unwanted files
  from getting added to your repository, files like
  `pyc` files, `__pycache__`, etc. We've set it up so that
  it has a good default configuration for Python projects.
- `.env.sample`: This file is a template to copy when
  creating environment variables for your team. Create a
  copy called `.env` and put your own passwords in here
  without fear of it being committed to git (see `.env`
  listed in `.gitignore`). You can also put team related
  environment variables in here, things like api and signing
  keys that shouldn't be committed; these should be
  duplicated in your deployed environments.

## How to complete the initial deploy

There will be further guidance on completing the initial
deployment, but it just consists of these steps:

### Setup GitLab repo/project

- make sure this project is in a group. If it isn't, stop
  now and move it to a GitLab group
- remove the fork relationship: In GitLab go to:

  Settings -> General -> Advanced -> Remove fork relationship

- add these GitLab CI/CD variables:
  - PUBLIC_URL : this is your gitlab pages URL
  - SAMPLE_SERVICE_API_HOST: enter "blank" for now

#### Your GitLab pages URL

You can't find this in GitLab until after you've done a deploy
but you can figure it out yourself from your GitLab project URL.

If this is your project URL

https://gitlab.com/GROUP_NAME/PROJECT_NAME

then your GitLab pages URL will be

https://GROUP_NAME.gitlab.io/PROJECT_NAME

### Initialize CapRover

1. Attain IP address and domain from an instructor
1. Follow the steps in the CD Cookbook in Learn.

### Update GitLab CI/CD variables

Copy the service URL for your CapRover service and then paste
that into the value for the SAMPLE_SERVICE_API_HOST CI/CD variable
in GitLab.

### Deploy it

Merge a change into main to kick off the initial deploy. Once the build pipeline
finishes you should be able to see an "under construction" page on your GitLab
pages site.
