## June 7th, 2023

-   Removed all hard-coded localhost:8000 in prep for deployment (did in tandem with everyone).
-   Started writing some more unit tests. These are fun.
-   Wrote out gitlab-cy.yaml in prep for deployment (did in tandem with everyone).

## June 6th, 2023

-   Worked on unit tests with everyone, making sure they all passed when merged onto main branch.

## June 5th, 2023

-   Created unit test for get_project_by_id. Worked with Hanna and Rysa.
-   Run tests with python -m pytest.
-   Copied over all code onto main branch. Still can't merge because of wiredtiger authentication breaking the branch.

## June 1st, 2023

-   Finished up my portion of editResponses.js. Decided not to make it a modal to the homepage. Rysa took over to implement delete functionality

## May 31st, 2023

-   Worked with everyone on editResponses.js. Created backend api call for get_project_by_id
-   Need to make one for delete_project_by_id

## May 30th, 2023

-   Worked on editResponses component so we can see responses saved to projects, add to them, and delete them.

## May 29th, 2023

-   Team decided to implement an editResponses funcionality. This will allow a team manager to access a project, see its responses, and update them. We are thinking of making it a modal from the home page.

## May 25th, 2023

-   I keep forgetting to use the journal. We have a three day weekend coming up. Will be sure to post more after that.

## May 18, 2023

-   Navigated while Chris set up Form for create
-   Navigated while Shahem wrote out the update function

Update was a bit of a pain because we wanted to use PATCH instead of PUT. Once we figured it out, we had to implement it in fastAPI language. Quite the ordeal.

## May 17, 2023

-   Added mongodb-data to .gitignore

*   Added Pydantic to req.
*   Added pydantic-mongo to req.
*   Added jwtdown to req.
*   Set up authenticator

Today I learned we need individual feature branches. Will implement.

-   Handed over driver to Shahem
-   Set up login/logout and create authenticator methods

Did all of this working together with entire team (Chris, Shahem, Rysa)

## May 16, 2023

-   Set up mongodb-data
-   Set up routers
-   Created users.py
    Created CRUD operations for users
-   Set up database
    added UserQueries to database.

Worked with Chris, Rysa and Shahem.
