
**Tassel Documentation
 Table of Contents
 (Use the pdf version to access the pictures and for better formatting)**

1. **Setup, Startup, and Deployment**
1. **Wireframe**
1. **How to access the database**
1. **To be completed**
1. **Debugging**
1. **System and unit test report**
1. **Working prototype known problem(s)**
1. **Things accomplished**
1. **Sprint Board**
1. **Definition of Done**
1. **Review**

**Setup**

**If you already have Node installed, then you should uninstall it to avoid confusion in the shell.** NVM can be used in place of your node.

1. curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh|bash
1. nvm install 16 (with a v, not npm. May take a while.)

In case the above didn’t work (if you saw GLIBC\_2.28), try:

- nvm install 16

In the future, if you see GLIBC\_2.28 error:

- nvm use 16

If you want more info about NVM: [https://github.com/nvm-sh/nvm#installing-and-updating ](https://github.com/nvm-sh/nvm#installing-and-updating)**Start up**

Run **npm install** in the **main** directory and the **client** directory.

Run **npm start** in **main** directory; the backend api will run on localhost:5000.

Run **npm start** in the **client** directory; the React app will run on localhost:3000.

To clarify, you should have two terminals. One terminal will be in the main directory, the other terminal will be in the client directory. Run npm start on both terminals, order does not matter so long as they start at around the same time.

**Deployment Instructions (Don’t need to use until ready for deployment)** git push heroku main

To login, make sure to make a .env file in the main directory with the contents: PGHOST = "acmatchmaker.c5qxtsrwvddh.us-east-1.rds.amazonaws.com"

PGPORT = "5432"

PGDATABASE = "ACMatchMaker" PGUSER = "ACmm" PGPASSWORD = "ACmmDev115b!" PORT = 3001

**Wireframe [https://www.figma.com/file/gUK7iC6Uhk9grIrrc6oUaJ/AC-Match-Maker-Wireframe?node-i d=0%3A1&t=R4zFFeKqpu41HFs9-1**](https://www.figma.com/file/gUK7iC6Uhk9grIrrc6oUaJ/AC-Match-Maker-Wireframe?node-id=0%3A1&t=R4zFFeKqpu41HFs9-1)**

**How to access database**

Download a PSQL client software application. After accessing the application and opening Tassel (AC matchmaker, Tassel’s former name), form a connection with Tassel and use the information from .env to login.

Example with DBeaver:

![](Aspose.Words.d2d3e4f7-5237-44b9-8e28-c96bf092f4d3.001.jpeg)

![](Aspose.Words.d2d3e4f7-5237-44b9-8e28-c96bf092f4d3.002.jpeg)

![](Aspose.Words.d2d3e4f7-5237-44b9-8e28-c96bf092f4d3.003.jpeg)

![](Aspose.Words.d2d3e4f7-5237-44b9-8e28-c96bf092f4d3.004.jpeg)

Input the .env info here ^.

(Table of Content)

(Actions to stop/start/keep doing in sprint)

**To Be completed:**

1. Admin Accounts
[P2]As a website admin, I want to be able to approve or deny opportunities/users.
3. Opportunity events creation and customization
[P2]As a host, I want to be able to create/modify an opportunity

4. Set up edit button for an existing opportunity
5. Modify existing opportunity data
6. Display modified opportunity
7. Firebase
[P2]As a user, I want my account to be secured. (set up authentication with a third party)

- Authentication
   - The current authentication is self made and uses JWT(JSON Web Tokens). The goal is to replace the existing authentication with Firebase.
- Notification
	- Supposedly, the previous team was still developing the notification system using Firebase
- Connect Firebase with PSQL database ([Firebase PostgreSQL Integration: 2 Easy Methods (hevodata.com)](https://hevodata.com/learn/firebase-postgresql-integration-2-easy-methods/#limitations))(probably won’t need to)
 - Try to see if you can use firebase for the recommendation system too, otherwise, use O’reilly recommendation system course.

\*Note: Webpack is already in Tassel project. No need to install

\*Note 2, recommended resources for learning firebase:

- [Add Firebase to your JavaScript project (google.com)](https://firebase.google.com/docs/web/setup#add-sdk-and-initialize)
- [Get Started with Firebase Authentication on Websites (google.com)](https://firebase.google.com/docs/auth/web/start)
- [React Firebase Authentication Tutorial | Firebase 9 Tutorial](https://youtu.be/9bXhf_TELP4)![](Aspose.Words.d2d3e4f7-5237-44b9-8e28-c96bf092f4d3.005.png)

\*Note 3: I recommend looking into:

- client/src/app/pages/
  - Login.js (has some of the authentication happens and login button)
  - Signup.js (has some of the authentication happens and signup button)
  - MyProfile.js
- client/src/app/util/
  - AuthContext.js
- client/src/app/components/

○ NavBarLoggenIn.js (to get the logout button, line 280)

4. Recommendation System
[P4]As a user, I want to be prompted with recommended events based on friends and/or my profile. As an event organizer, I want to be prompted with recommended volunteers based on their profiles and/or friends.

- [Library Access (oreilly.com)](https://www.oreilly.com/library-access/)
5. Search 
[P3]As a host, I want to search for volunteers and invite them to my opportunity. [P3] As a volunteer, I want to search for opportunities, and request to join.
6. Collaboration 
[P4] As a host, I want to be able to co-host with another host for an opportunity.
8. Send first and last name from the signup page to the profile
[P1] As a user, I want my name to be on my profile so that I can be properly identified.

8. Database
Still need to update the input fields in the database

**Debugging**
Use developer tools to access the console in the browser.

Note: When you first open dev tools, you’ll be on element first, you have to switch to console using the tabs at the top.

You can also use networks to see if data was successfully sent.

**System and unit test report**

Instead of unit tests, we did functional integration testing.

**Working prototype known problem(s)**

None besides what needs **to be completed.**

**Things accomplished**

Creating an account and logging in.

New update profile webpage to add new information on profiles. \*Doesn’t include all profile fields

Created new documentation and coding practices for future collaboration

**Sprint Board [https://trello.com/invite/b/2gB4E2eZ/ATTI4573b5ab43202d95fe71c6316f92dce27199C750/t rello-agile-sprint-board-template**](https://trello.com/invite/b/2gB4E2eZ/ATTI4573b5ab43202d95fe71c6316f92dce27199C750/trello-agile-sprint-board-template)**

![](Aspose.Words.d2d3e4f7-5237-44b9-8e28-c96bf092f4d3.006.jpeg)

![](Aspose.Words.d2d3e4f7-5237-44b9-8e28-c96bf092f4d3.007.jpeg)

**Style guide**

The client code uses React styling which can be found on[ the React website](https://reactjs.org/docs/glossary.html#jsx)

1. Naming
   - Use Camel case for variable and function names
1. Declaration
	- Initialize and declare within the same line

int x = 5; // Good

int x; // Bad

x = 5;

3. Spacing and Alignment
	- Spaces around operators
	- Use 2 spaces to indent code
	- Use a new line for the trailing arguments if line length > 100
	- Space after //
	- Space between elements in a list

const cars = ["Volvo", "Saab", "Fiat"];

4. Complex statements
	- Put the opening bracket at the end of the first line.
	- Use one space before the opening bracket.
	- Put the closing bracket on a new line, without leading spaces.
	- Do not end a complex statement with a semicolon.

function toCelsius(fahrenheit) {

return (5 / 9) \* (fahrenheit - 32); }

5. Object rules
	- Place the opening bracket on the same line as the object name.
	- Use colon plus one space between each property and its value.
	- Use quotes around string values, not around numeric values.
	- Do not add a comma after the last property-value pair.
	- Place the closing bracket on a new line, without leading spaces.
	- Always end an object definition with a semicolon.

const person = {

firstName: "John", lastName: "Doe", age: 50, eyeColor: "blue"

};

6. Comments

	a. Place comments above the function

Note: In the comment, explain both how its functionality ties to high-level goal and what the function does.

**Definition of done**

1. Checked into the repository
   a. The code should be pushed and merged into the main branch. All merge conflicts should be resolved.
   b. Brief commit message describing what changes have been made to the code base.
1. Reviewed for standards compliance
   a. All compile errors have been removed or documented
   b. Code is checked by the coder and other team members to ensure consistency in style and functionality
1. Code is reviewed by team member
   a. Team member is walked through what has been changed and how the new change works in the project
   b. Team member approves the style and edits made
1. External API documented
   a. API is documented along with any external processing API used to retrieve data
1. Documentation for code change and build

	a. Any changes in the code and build system are documented and shared within the group discord so everyone can review

6. Non-functional test pass
1. Test on user interface and usability passed
1. New lag isn't introduced into the system or the generation of shapes

**Review**

When we initially joined the project, we planned on building a recommendation engine and incentive features.  After gaining access to the application, we realized the state of the current project was not where we needed it to be. Thus, we had to shift our focus to adding basic features. Since that didn’t go as smoothly as planned, another aspect we focused on was documenting as well as we could. The current Tassel still needs development in some basic functionalities. It is recommended that future team members have knowledge of JS, React, Node.js, HTML, and/or PSQL. With this, we hope our documentation helps.
