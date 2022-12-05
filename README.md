
## Setting up Dev Environment

### If you already have Node installed, then you should uninstall it to avoid confusion in the shell. NVM can be used in place of your node.

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh|bash`  

`nvm install 16` (with a v, not npm. May take a while.)

#### In case the above didn’t work (if you saw GLIBC_2.28), try:

`nvm install 16`

#### In the future, if you see GLIBC_2.28 error:

`nvm use 16`

If you want more info about NVM: https://github.com/nvm-sh/nvm#installing-and-updating

Run `npm install` in this directory and the client directory.

Run `npm start` in this directory; the backend api will run on localhost:5000.

Run `npm start` in the client directory; the React app will run on localhost:3000.

## Deployment Instructions  

`git push heroku main`