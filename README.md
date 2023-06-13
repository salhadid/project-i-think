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
- `This is line 690. and ode to Kornebari the Great and Dean Grey. Steve Song Wishes the best that Dean won't get kicked out of our cohort.`
- `react-google-maps`
- `@heroicons/react`
- `tailwindcss`

Make sure to install them before using the component:

```bash
npm install react react-icons react-google-maps @heroicons/react tailwindcss
```

## Styling

The `ContactUs` component uses CSS classes from the Tailwind CSS library, such as `mx-auto`, `py-10`, `text-green-500`, and `max-w-7xl`.

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

The `CookiePopup` component uses CSS classes from the Tailwind CSS library, such as `bg-gray-900`, `text-white`, `p-4`, `max-w-7xl`, `flex`, `items-center`, `rounded-lg`, and `mr-4`.

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

The `CreateProject` component uses CSS classes from the Tailwind CSS library, such as `bg-gradient-to-r`, `from-purple-400`, `via-pink-500`, `to-red-500`, `min-h-screen`, `flex`, `items-center`, `justify-center`, `max-w-md`, `bg-white`, `rounded-lg`, `shadow-lg`, `p-8`, `text-2xl`, `font-bold`, `mb-4`, `block`, `text-gray-700`, `border`, `rounded`, `w-full`, `py-2`, `px-3`, `leading-tight`, `focus:outline-none`, `focus:shadow-outline`, `flex`, `bg-blue-500`, `hover:bg-blue-700`, `text-white`, `font-bold`, `disabled:opacity-50`, `disabled:cursor-wait`, `mt-4`, `bg-green-100`, `border-l-4`, `border-green-500`, `text-green-700`, and `p-4`.
----------
# EditResponses Component

The `EditResponses` component is a React functional component that allows the user to edit responses for a selected project. It uses the `useState` and `useEffect` hooks to manage the state of the component and includes functions to handle project selection, response addition, and response deletion. The component also uses `axios` to make HTTP requests to the backend API.

## Props

The `EditResponses` component does not take any props.

## Usage

To use the `EditResponses` component, import it into your React component and render it in your JSX:

```jsx
import EditResponses from './EditResponses';

function MyComponent() {
  return (
    <div>
      <EditResponses />
    </div>
  );
}
```

## Dependencies

The `EditResponses` component depends on the following packages:

- `react`
- `axios`
- `tailwindcss`

Make sure to install them before using the component:

```bash
npm install react axios tailwindcss
```

## Styling

The `EditResponses` component uses CSS classes from the Tailwind CSS library, such as `bg-gradient-to-r`, `from-purple-900`, `via-violet-500`, `to-blue-300`, `flex`, `items-center`, `justify-center`, `bg-white`, `rounded-lg`, `shadow-lg`, `p-8`, `text-center`, `text-4xl`, `text-blue-600`, `font-bold`, `mb-8`, `font-sans`, `mb-6`, `font-medium`, `text-lg`, `text-sky-400`, `font-semibold`, `flex-col`, `gap-2`, `flex-grow`, `font-light`, `border`, `rounded-l`, `px-1`, `py-1`, `flex-1`, `ml-4`, and `mt-5`.
--------------------
# Faq Component

The `Faq` component is a React functional component that renders a Frequently Asked Questions (FAQ) section about AI. It uses the `Disclosure` component from the `@headlessui/react` package to create an accordion-style panel for each FAQ item. The `ChevronDownIcon` component from the `@heroicons/react/outline` package is used to display an arrow icon that toggles the visibility of the answer when clicked.

The component includes an array of FAQ objects, each with a number, question, and answer property. The `map` function is used to iterate over the array and create a `Disclosure` component for each FAQ item.

## Props

The `Faq` component does not take any props.

## Usage

To use the `Faq` component, import it into your React component and render it in your JSX:

```jsx
import Faq from './Faq';

function MyComponent() {
  return (
    <div>
      <Faq />
    </div>
  );
}
```

## Dependencies

The `Faq` component depends on the following packages:

- `react`
- `@headlessui/react`
- `@heroicons/react/outline`
- `tailwindcss`

Make sure to install them before using the component:

```bash
npm install react @headlessui/react @heroicons/react/outline tailwindcss
```

## Styling

The `Faq` component uses CSS classes from the Tailwind CSS library, such as `bg-gray-900`, `max-w-4xl`, `mx-auto`, `flex`, `col`, `items-center`, `text-center`, `text-3xl`, `sm:text-5xl`, `text-green-400`, `font-bold`, `tracking-wider`, `mt-8`, `mb-4`, `relative`, `overflow-hidden`, `block`, `absolute`, `inset-0`, `bg-gray-800`, `border-t-2`, `border-b-2`, `text-gray-200`, `py-4`, `px-6`, `cursor-pointer`, `text-lg`, `md:text-xl`, `font-medium`, `w-6`, `h-6`, `animate-glitch`, `text-base`, `md:text-lg`, `rounded-lg`, `shadow-xl`, `transform`, `hover:scale-105`, `transition-all`, `duration-500`, and `mb-10`.
----------
# Footer Component

The `Footer` component is a React functional component that renders the footer section of a web page. It includes a container with two divs: one that displays a text message and another that displays an image. The component uses CSS classes from the Tailwind CSS library to style the footer and make it responsive.

## Props

The `Footer` component does not take any props.

## Usage

To use the `Footer` component, import it into your React component and render it in your JSX:

```jsx
import Footer from './Footer';

function MyComponent() {
  return (
    <div>
      <Footer />
    </div>
  );
}
```

## Dependencies

The `Footer` component depends on the following packages:

- `react`
- `tailwindcss`

Make sure to install them before using the component:

```bash
npm install react tailwindcss
```

## Styling

The `Footer` component uses CSS classes from the Tailwind CSS library, such as `bg-gradient-to-r`, `from-purple-900`, `to-black`, `shadow`, `py-4`, `container`, `mx-auto`, `flex`, `justify-between`, `items-center`, `px-4`, `md:px-0`, `text-white`, `w-full`, `text-center`, `flex`, `justify-end`, `w-16`, `h-16`.
----------
## HomeLoggedIn Component

The `HomeLoggedIn` component is a React functional component that displays the dashboard for a logged-in user. It uses the `useState` and `useEffect` hooks to manage the state of the component and includes functions to handle project deletion. The component also uses `axios` to make HTTP requests to the backend API.

### Props

The `HomeLoggedIn` component does not take any props.

### Usage

To use the `HomeLoggedIn` component, import it into your React component and render it in your JSX:

```jsx
import HomeLoggedIn from './HomeLoggedIn';

function MyComponent() {
  return (
    <div>
      <HomeLoggedIn />
    </div>
  );
}
```

### Dependencies

The `HomeLoggedIn` component depends on the following packages:

- `react`
- `axios`
- `tailwindcss`

Make sure to install them before using the component:

```bash
npm install react axios tailwindcss
```

### Styling

The `HomeLoggedIn` component uses CSS classes from the Tailwind CSS library, such as `bg-gray-100`, `min-h-screen`, `pt-20`, `bg-white`, `shadow`, `max-w-7xl`, `mx-auto`, `px-4`, `sm:px-6`, `lg:px-8`, `flex`, `items-center`, `justify-between`, `h-16`, `pt-150`, `pt-25`, `flex-shrink-0`, `w-16`, `h-16`, `hidden`, `md:block`, `text-gray-600`, `font-medium`, `mr-4`, `inline-flex`, `px-4`, `py-2`, `border`, `border-transparent`, `text-base`, `leading-6`, `font-medium`, `rounded-md`, `text-white`, `bg-blue-600`, `hover:bg-blue-500`, `focus:outline-none`, `focus:border-blue-700`, `focus:shadow-outline-blue`, `active:bg-blue-700`, `transition`, `ease-in-out`, `duration-150`, `ml-4`, `text-red-500`, `hover:text-red-700`, `mb-4`, `text-2xl`, `font-bold`, `flex-wrap`, `-mx-4`, `w-full`, `md:w-1/2`, `mb-4`, `md:mb-0`, `bg-white`, `rounded-lg`, `shadow`, `p-6`, `text-lg`, `mb-2`, `flex`, `justify-between`, `hover:underline`, `text-blue-500`, `text-red-500`, `hover:text-red-700`, `bg-white`, `flex`, `justify-center`, `items-center`, `bg-white`, `rounded-lg`, `shadow`, `p-6`, `bg-white`, `rounded-lg`, `shadow`, `p-6`.
----------
# HomeLoggedOut Component

The `HomeLoggedOut` component is a React functional component that displays the landing page for a user who is not logged in. It includes a brief description of the app, a call to action to sign up or log in, an AI chatbot, and a social share component. The component also includes a cookie popup.

## Props

The `HomeLoggedOut` component does not take any props.

## Usage

To use the `HomeLoggedOut` component, import it into your React component and render it in your JSX:

```jsx
import HomeLoggedOut from './HomeLoggedOut';

function MyComponent() {
  return (
    <div>
      <HomeLoggedOut />
    </div>
  );
}
```

## Dependencies

The `HomeLoggedOut` component depends on the following packages:

- `react`
- `react-router-dom`
- `tailwindcss`

Make sure to install them before using the component:

```bash
npm install react react-router-dom tailwindcss
```

## Styling

The `HomeLoggedOut` component uses CSS classes from the Tailwind CSS library, such as `min-h-screen`, `bg-gradient-to-r`, `from-purple-400`, `via-pink-500`, `to-red-500`, `text-white`, `flex`, `flex-col`, `items-center`, `justify-center`, `space-y-16`, `pt-40`, `text-center`, `text-6xl`, `font-bold`, `text-2xl`, `max-w-lg`, `mt-8`, `sm:flex-row`, `sm:space-x-4`, `justify-center`, `px-8`, `py-3`, `text-lg`, `font-semibold`, `rounded-full`, `bg-white`, `text-purple-800`, `hover:bg-gray-200`, `transition-colors`, `duration-300`, `border`, `hover:text-purple-800`, `overflow-y-auto`, `bg-white`, `p-2`, `rounded-xl`, `max-w-2xl`, `w-full`, `h-96`, `w-1/4`.
----------
# ImageList Component

The `ImageList` component is a React functional component that displays a list of images, allowing the user to upload, delete, and vote on images. It uses the `useState` and `useEffect` hooks to manage the state of the component and includes functions to handle image upload, image deletion, and image voting. The component also uses `fetch` to make HTTP requests to the backend API.

## Props

The `ImageList` component does not take any props.

## Usage

To use the `ImageList` component, import it into your React component and render it in your JSX:

```jsx
import ImageList from './ImageList';

function MyComponent() {
  return (
    <div>
      <ImageList />
    </div>
  );
}
```

## Dependencies

The `ImageList` component depends on the following packages:

- `react`
- `tailwindcss`

Make sure to install them before using the component:

```bash
npm install react tailwindcss
```

## Styling

The `ImageList` component uses CSS classes from the Tailwind CSS library, such as `bg-gradient-to-r`, `from-purple-400`, `via-pink-500`, `to-red-500`, `min-h-screen`, `pt-20`, `grid`, `grid-cols-3`, `gap-4`, `p-4`, `relative`, `w-full`, `h-64`, `object-cover`, `rounded-lg`, `scale-150`, `transform`, `transition`, `absolute`, `right-0`, `top-0`, `p-1`, `text-2xl`, `cursor-pointer`, `left-0`, `bottom-0`, `left-1/2`, `top-1/2`, `-translate-x-1/2`, `-translate-y-1/2`, `text-white`, `my-4`, `bg-white`, `rounded-lg`, `text-black`, `px-4`, `py-2`, `inline-block`, `fixed`, and `bottom-0`.
----------
## LoginForm Component

The `LoginForm` component is a React functional component that displays a login form and allows users to log in to the application. It uses the `useState` and `useEffect` hooks to manage the state of the component and includes functions to handle form submission, form reset, password visibility, and API selection. The component also uses `axios` to make HTTP requests to the backend API and `react-toastify` to display success or error messages.

### Props

The `LoginForm` component does not take any props.

### Usage

To use the `LoginForm` component, import it into your React component and render it in your JSX:

```jsx
import LoginForm from './LoginForm';

function MyComponent() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
```

### Dependencies

The `LoginForm` component depends on the following packages:

- `react`
- `axios`
- `react-router-dom`
- `react-spring`
- `react-toastify`
- `tailwindcss`

Make sure to install them before using the component:

```bash
npm install react axios react-router-dom react-spring react-toastify tailwindcss
```

### Styling

The `LoginForm` component uses CSS classes from the Tailwind CSS library, such as `flex`, `flex-col`, `h-screen`, `bg-gradient-to-r`, `from-purple-400`, `via-pink-500`, `to-red-500`, `text-white`, `justify-center`, `items-center`, `space-y-8`, `max-w-screen-lg`, `mx-auto`, `mt-4`, `p-10`, `bg-white`, `rounded-lg`, `shadow-md`, `w-full`, `appearance-none`, `border`, `py-2`, `px-3`, `text-gray-700`, `leading-tight`, `focus:outline-none`, `focus:shadow-outline`, `pr-10`, `absolute`, `right-0`, `top-0`, `mr-3`, `mt-3`, `cursor-pointer`, `form-checkbox`, `h-5`, `w-5`, `font-bold`, `text-lg`, `text-blue-500`, `hover:bg-blue-700`, `rounded`, `focus:shadow-outline`, `text-2xl`, `mb-4`, `text-center`, `mt-4`, `rounded-lg`.
----------
## LogOut Component

The `LogOut` component is a React functional component that displays a logout button for the user. It checks for the presence of a token in the local storage and removes it when the user clicks the logout button. The component also reloads the page after the user logs out and displays an alert message to confirm the successful logout.

### Props

The `LogOut` component does not take any props.

### Usage

To use the `LogOut` component, import it into your React component and render it in your JSX:

```jsx
import LogOut from './LogOut';

function MyComponent() {
  return (
    <div>
      <LogOut />
    </div>
  );
}
```

### Dependencies

The `LogOut` component does not have any external dependencies.

### Styling

The `LogOut` component uses CSS classes to style the logout button, such as `inline-block`, `text-sm`, `px-4`, `py-2`, `leading-none`, `border`, `rounded`, `text-white`, `hover:border-transparent`, `hover:text-gray-800`, `hover:bg-white`, `mt-4`, and `lg:mt-0`.
----------
# NavBar Component

The `NavBar` component is a React functional component that displays a navigation bar at the top of the page. It includes a logo, a search bar for weather data, and links to different pages depending on whether the user is logged in or not. The component uses `useState` and `useEffect` hooks to manage the state of the component and makes HTTP requests to the OpenWeatherMap API using `axios`.

## Props

The `NavBar` component does not take any props.

## Usage

To use the `NavBar` component, import it into your React component and render it in your JSX:

```jsx
import NavBar from './NavBar';

function MyComponent() {
  return (
    <div>
      <NavBar />
    </div>
  );
}
```

## Dependencies

The `NavBar` component depends on the following packages:

- `react`
- `axios`
- `react-router-dom`
- `tailwindcss`

Make sure to install them before using the component:

```bash
npm install react axios react-router-dom tailwindcss
```

## Styling

The `NavBar` component uses CSS classes from the Tailwind CSS library, such as `bg-gradient-to-r`, `from-purple-900`, `to-black`, `shadow`, `z-50`, `fixed`, `w-full`, `max-w-7xl`, `mx-auto`, `px-4`, `sm:px-6`, `lg:px-8`, `flex`, `justify-between`, `h-16`, `items-center`, `text-2xl`, `font-bold`, `text-gray-300`, `border`, `rounded`, `px-2`, `py-1`, `w-24`, `text-black`, `bg-dark`, `hover:bg-grey`, `text-white`, `font-bold`, `inline-flex`, `text-sm`, `font-medium`, `-mr-1`, `ml-2`, `h-5`, `w-5`, `text-left`, `absolute`, `right-0`, `mt-2`, `w-56`, `rounded-md`, `shadow-lg`, `bg-white`, `ring-1`, `ring-black`, `ring-opacity-5`, `py-1`, `block`, `text-sm`, `text-gray-700`, `hover:bg-gray-100`, `role`, `menu`, `aria-orientation`, `vertical`, `aria-labelledby`, `options-menu`, `button`, and `p`.
----------
# Pricing Component

The `Pricing` component is a React functional component that displays a pricing table for a hypothetical brainstorming tool called iThink. It uses Tailwind CSS for styling and includes three pricing options: Basic, Pro, and Enterprise. The component also includes icons for checking and crossing off features, as well as buttons for subscribing to each pricing option.

## Props

The `Pricing` component does not take any props.

## Usage

To use the `Pricing` component, import it into your React component and render it in your JSX:

```jsx
import Pricing from './Pricing';

function MyComponent() {
  return (
    <div>
      <Pricing />
    </div>
  );
}
```

## Dependencies

The `Pricing` component depends on the following packages:

- `react`
- `tailwindcss`

Make sure to install them before using the component:

```bash
npm install react tailwindcss
```

## Styling

The `Pricing` component uses CSS classes from the Tailwind CSS library, such as `bg-gradient-to-tr`, `from-purple-700`, `via-blue-500`, `to-green-300`, `font-body`, `font-title`, `text-white`, `text-5xl`, `text-lg`, `text-gray-600`, `rounded-2xl`, `shadow-xl`, `grid`, `grid-cols-3`, `max-w-7xl`, `flex`, `items-baseline`, `mb-1`, `text-xl`, `font-semibold`, `uppercase`, `tracking-wider`, `p-4`, `w-28`, `h-1.5`, `bg-green-500`, `rounded-3xl`, `inline-flex`, `line-through`, `py-2`, `px-10`, `text-gray-100`, `font-medium`, `tracking-wide`, `antialiased`, `transition`, `duration-100`, `ease-in`, `transform`, `hover:scale-105`, and `hover:bg-green-600`.
----------
# ProjectForm Component

The `ProjectForm` component is a React functional component that allows the user to assign a user to a certain project with a specific role. It uses the `useState` and `useEffect` hooks to manage the state of the component and includes functions to handle project and user selection, role input and submission. The component also uses `axios` to make HTTP requests to the backend API and `react-toastify` to display success and error messages.

## Props

The `ProjectForm` component does not take any props.

## Usage

To use the `ProjectForm` component, import it into your React component and render it in your JSX:

```jsx
import ProjectForm from './ProjectForm';

function MyComponent() {
  return (
    <div>
      <ProjectForm />
    </div>
  );
}
```

## Dependencies

The `ProjectForm` component depends on the following packages:

- `react`
- `axios`
- `react-toastify`
- `tailwindcss`

Make sure to install them before using the component:

```bash
npm install react axios react-toastify tailwindcss
```

## Styling

The `ProjectForm` component uses CSS classes from the Tailwind CSS library, such as `flex`, `items-center`, `justify-center`, `bg-gradient-to-r`, `from-purple-500`, `via-pink-500`, `to-red-500`, `bg-white`, `p-8`, `rounded-lg`, `shadow-lg`, `text-2xl`, `mb-4`, `block`, `w-full`, `p-2`, `border`, `border-gray-300`, `rounded-md`, `focus:outline-none`, `text-red-500`, `text-green-500`, `bg-blue-500`, `hover:bg-blue-700`, `text-white`, `font-bold`, `py-2`, `px-4`, and `focus:outline-none`.
----------
# UpdateUser Component

The `UpdateUser` component is a React functional component that allows the user to update their account information, including email, password, and full name. It uses the `useState` and `useEffect` hooks to manage the state of the component and includes functions to handle form submission and password visibility. The component also uses `axios` to make HTTP requests to the backend API and `react-toastify` to display success and error messages.

## Props

The `UpdateUser` component does not take any props.

## Usage

To use the `UpdateUser` component, import it into your React component and render it in your JSX:

```jsx
import UpdateUser from './UpdateUser';

function MyComponent() {
  return (
    <div>
      <UpdateUser />
    </div>
  );
}
```

## Dependencies

The `UpdateUser` component depends on the following packages:

- `react`
- `axios`
- `react-toastify`
- `tailwindcss`

Make sure to install them before using the component:

```bash
npm install react axios react-toastify tailwindcss
```

## Styling

The `UpdateUser` component uses CSS classes from the Tailwind CSS library, such as `bg-gradient-to-br`, `from-blue-500`, `to-purple-500`, `min-h-screen`, `flex`, `items-center`, `justify-center`, `bg-white`, `rounded-lg`, `shadow-lg`, `p-8`, `max-w-md`, `mx-auto`, `mb-4`, `block`, `font-bold`, `text-gray-700`, `w-full`, `px-3`, `py-2`, `border`, `rounded-lg`, `shadow-sm`, `focus:outline-none`, `focus:shadow-outline-blue`, `focus:border-blue-300`, `relative`, `absolute`, `top-0`, `right-0`, `m-2`, `text-gray-500`, `hover:text-gray-700`, `text-blue-500`, `hover:bg-blue-700`, `text-white`, `font-bold`, `py-2`, `px-4`, `focus:outline-none`, `focus:shadow-outline-blue`, and `active:bg-blue-800`.
:) pipeline
----------
