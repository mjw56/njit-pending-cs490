# README

## Project Description

This is a project called Crush It for NJIT CS490 Fall 2023, a planner app. More details coming soon.

Team Name: ...pending...

## WSL Development Setup
Assuming you are using Windows Subsystem for Linux, run the following commands to install `nvm`, `node`, and `yarn`. 

    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
    nvm install --lts
    curl -o- -L https://yarnpkg.com/install.sh | bash

Then, install the project

```
yarn install
```

Then start the development server:

```
yarn redwood dev
```

Your browser should automatically open to [http://localhost:8910](http://localhost:8910) where you'll see the Welcome Page, which links out to many great resources.

## Load the .env file with required fields
```
This is a placeholder for later, we will put credentials in here for Google OAuth
```
