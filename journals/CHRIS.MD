5/10/23
used openai model to train an ai bot
to yell at us in russian.
work in progress.. tbc
<|endoftext|>

5/18/23
tested form to see if users can login

may 19-21

Over the past few days, I have been diligently working on several key features for our web application. One of my primary focuses has been the implementation of a dynamic navigation bar that changes based on the user's login status. When a user is logged out, they are presented with options to create an account or log in. Meanwhile, two different home pages have been created, with one being rendered exclusively for logged-in users based on their local token.

As part of the login page, I have added a "show password" field button, making it easier for users to check their passwords for accuracy. Upon successful login, the page refreshes, a confirmation message is displayed, and the user is redirected to the appropriate logged-in home page. Additionally, I have incorporated try-catch error handling to alert users if their login credentials are incorrect.

To add a little extra flair, I have also been experimenting with API keys and have created a weather API call based on the user's zip code. I have utilized the draggable feature built into React, allowing users to move objects around the site with ease.

Furthermore, I have created an account update page that automatically fetches the user's email and full name based on their local token. The page allows users to update their name and password, but not their email, ensuring that their account information stays secure. I have also included a double password verification field and a "show password" button, providing an extra layer of security and convenience.

For the account creation page, I have added a double password verification field and a "show password" button. I had initially planned to include a captcha, but opted for a robot button instead due to time constraints.

The navigation bar was a significant undertaking, but I have simplified it by creating two lists that automatically populate based on the user's login status. This makes it incredibly easy for our team to add new routes to the navigation bar, as they only need to add the name and pathing to the list.

Finally, I have fixed the display logic for the navigation bar, ensuring that it always displays based on the user's login status, regardless of screen size. Additionally, I have added a refresh on logout to prevent users from being redirected to the previously rendered logged-in home page.
