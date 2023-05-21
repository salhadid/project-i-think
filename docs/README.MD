# Welcome to iThink

Welcome to iThink, your one stop app for any brainstorming needs.
[Flesh out closer to deployment]

## Getting Started

To get started, please create a docker volume to house your data.
\*\* In your terminal, run - docker volume create mongo-data

Once that is completed, please build your docker environment
\*\* In your terminal, run - docker compose build - docker compose up

## How it Works

You will find several pages in the application. The iThink team sought to keep the pages as few as possible, and the website as intuitive as possible

    - Home Page

        - Introduction to what we do. Login and Signup abilites

    - User Page

        - You will find a collection of everything you do here
            - Project Managers
                - Are able to add and remove people from teams
                - Create and destroy projects
                - See project collections
                - Approve projects for votes

            - Team Members
                - Are able to see project collections they are a part of
                - Navigate to vote pages

    - Brainstorm Page

        - Here you can put together ideas for projects
        - iThink ChatBot is more than happy to provide ideas and direction
            - You can choose to keep or ignore ideas
        - Saved ideas will be assigned to projects and sent for vote

    - Vote Page

        - Here team members can vote on what ideas to keep or toss
        - Project managers can see votes and ultimately keep/trash ideas
            - Saved ideas are assigned to collections

    - Collection Page

        - Here project managers can see and edit the final version of a project
            - Ideas can be added if necessary
        - Team members can see the collections they are a part of
