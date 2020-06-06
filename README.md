# AC-Flower-Genetic-Calculator

This is an online calculator to determine the genetics of certain flowers for Animal Crossing.

## Table of Contents <!-- omit in toc -->

- [AC-Flower-Genetic-Calculator](#ac-flower-genetic-calculator)
  - [How it runs](#how-it-runs)
  - [How to run locally](#how-to-run-locally)

## How it runs

This is primarily a Javascript program that uses Docker to containerize all aspects of it so that it makes running the program very easy on a local machine. It uses the React framework as the basis of the user interface, which talks to an Express backend. The express backend has endpoints which speak to certain JS scripts to perform calaculations, as well as communicating the a MySQL database when necessary.

## How to run locally

To run this locally, you need to follow these steps:

- Ensure that docker is installed on your computer
- Run `docker-compose build` in the root directory
- Run `ducker-compose up -d` in the root directory
- Navigate to `localhost:3000` to view the webpage
