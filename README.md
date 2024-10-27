# QA Automation Project
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/srh-farghaly/QA-Automation-Project/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/srh-farghaly/QA-Automation-Project/tree/main)


This repository contains a comprehensive QA automation project that perform **UI testing** using NightwatchJS and **API testing** using Supertest and Jest. 

## Table of Contents
- [Project Overview](#project-overview)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [How to Run the Tests Locally](#how-to-run-the-tests-locally)
- [How to Run the Tests via CircleCI](#how-to-run-the-tests-via-circleci)
- [Generated HTML Reports](#generated-html-reports)


## Project Overview

The Project ensures the reliability of both **UI** and **API functionalities** by validating core features through automated testing. The project is divided into two main components:

1. **UI Tests**:  
   - Performed on the **My Store** web application using **NightwatchJS**.  
   - Focused on validating key user flows, including:  
     - **Contact Us form** submissions with various field scenarios.  
     - **Homepage search functionality** using different search terms and edge cases.

2. **API Tests**:  
   - Used the **mock-user-auth** module from [npm](https://www.npmjs.com/package/mock-user-auth) to simulate and validate API endpoints for **user authentication workflows**.  
   - Validated both **valid and invalid data inputs** to ensure proper error handling and secure responses.  
   - Implemented using **Supertest** and **Jest**.

---


## Folder Structure

- **QA-automation-Task**: Contains UI testing scripts using NightwatchJS.
- **supertest-jest-api**: Contains API testing scripts with Supertest and Jest.

## Technologies Used

- **NightwatchJS**: End-to-end browser automation testing tool.
- **Supertest**: For testing HTTP APIs.
- **Jest**: JavaScript testing framework used for API tests.
- **CircleCI**: CI/CD platform for automating the pipeline and running tests on every commit.

## How to Run the Tests Locally

### UI Tests:
1. Install dependencies:
   ```bash
   cd QA-automation-Task
   npm install
   ```
2. Run the tests:
   ```bash
   npm run test
   ```

### API Tests:
1. Install dependencies:
   ```bash
   cd supertest-jest-api
   npm install
   npm install --save mock-user-auth
   ```
2. Start the API server:
   ```bash
   npm run dev
   ```
3. Run the tests:
   ```bash
   npx jest --detectOpenHandles
   ```

## How to Run the Tests via CircleCI

This project is integrated with **CircleCI** for automated testing on every commit.

1. Ensure CircleCI is properly configured with the `.circleci/config.yml` file in the repository.
2. After each push to the repository, the UI and API tests will run automatically.
3. You can monitor the status and logs on CircleCI's dashboard.

## Generated HTML Reports

Both the UI and API tests generate **HTML reports** for better visibility of test results.

- **UI Test Reports**: 
  - Located in `QA-automation-Task/tests_output/nightwatch-html-report/`
  - Open the report in a browser by navigating to:
    ```bash
    open QA-automation-Task/tests_output/nightwatch-html-report/index.html
    ```

- **API Test Reports**: 
  - Located in `supertest-jest-api/reports/`
  - The reports are generated with **jest-html-reporter**.
  - Open the report in a browser by navigating to:
    ```bash
    open supertest-jest-api/reports/index.html
    ```

These reports provide detailed insights into the execution of the test cases, including passed and failed scenarios.



