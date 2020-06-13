# AC-Flower-Genetic-Calculator

This is an online calculator to determine the genetics of certain flowers for Animal Crossing.

## Table of Contents <!-- omit in toc -->

- [AC-Flower-Genetic-Calculator](#ac-flower-genetic-calculator)
  - [How it runs](#how-it-runs)
  - [Required Technology](#required-technology)
  - [React Component Tree](#react-component-tree)
  - [How to run locally](#how-to-run-locally)

## How it runs

This is primarily a Javascript program that uses Docker to containerize all aspects of it so that it makes running the program very easy on a local machine. It uses the React framework as the basis of the user interface, which talks to an Express backend. The express backend has endpoints which speak to certain JS scripts to perform calaculations, as well as communicating with a MySQL database when necessary.

## Required Technology

To run this app, the only thing you need to have installed is Docker. I built this using Docker for Windows 10, and have not tested it for Linux or Mac, although I'd assume that it would work fine.

## React Component Tree

The following is a visual representation of the component tree for this React app. This explains the general hierarchy of the React application.

- App (App.js)
  - Generic Container (Container.js)
    - Database Search Section (SearchDatabase.js)
  - Generic Container (Container.js)
    - Flower Breeding Section (BreedFlower.js)
      - Individual Flower (IndividualFlower.js)
        - Gene Selection (GeneComponent.js)

Each main component is wrapped in a container to better isolate it from the main application. For the flower breeding component, there are individual flower components which allow the user to modify the genes of a particular flower. Each of these gene selections are themselves a component. There are two flowers available, and pressing the submit button will display the resulting flower genes and colors.

The database search section allows the user to query the backend database and search for particular flowers. If they are looking for a black rose, they can enter that into the form inside the Database search section and the results will be displayed after calling an endpoint, which will look at the db container and retrieve the information.

## How to run locally

To run this locally, you need to follow these steps:

- Ensure that docker is installed on your computer
- Run `docker-compose build` in the root directory
- Run `docker-compose up -d` in the root directory
- Navigate to `localhost:3000` to view the webpage
  - Alternatively, you can also go to localhost:5000 to view the API endpoints
