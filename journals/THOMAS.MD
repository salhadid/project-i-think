## May 21, 2023

- Updated README

* Created Issues for

  - Collection Page
  - Vote Page as a team member
  - Vote page as a project owner
  - Vote page as a project owner, keep/delete votes functionality
  - Uploaded Figma and Excalidraw designs

* Set database to ignore so we stop pushing the entire database.
* Will need to create unit tests soon

## May 19, 2023

- Worked with Shahem and Chris to brainstorm out ideas. Decided to put Delete funcionality on hold as a stretch goal. Decided to hold of on more chat bot work as well, until project is complete.

## May 18, 2023

- Navigated while Chris set up Form for create
- Navigated while Shahem wrote out the update function

Update was a bit of a pain because we wanted to use PATCH instead of PUT. Once we figured it out, we had to implement it in fastAPI language. Quite the ordeal. Figured it out eventually with debugging.

## May 17, 2023

- Added mongodb-data to .gitignore

* Added Pydantic to req.
* Added pydantic-mongo to req.
* Added jwtdown to req.
* Set up authenticator

Today I learned we need individual feature branches. Will implement.

- Handed over driver to Shahem
- Set up login/logout and create authenticator methods

Did all of this working together with entire team (Chris, Shahem, Rysa)

## May 16, 2023

- Set up mongodb-data
- Set up routers
- Created users.py
  Created CRUD operations for users
- Set up database
  added UserQueries to database.

Worked with Chris, Rysa and Shahem.
