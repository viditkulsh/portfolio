# Portfolio

This is a personal portfolio project built using React. It showcases various sections such as a landing page, about me, projects, and contact information. The project is hosted on [Vercel](https://portfolio-iditvk.vercel.app/) and [Vercel](https://vidit-kulshrestha-portfolio.vercel.app/).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Components](#components)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/viditkulsh/portfolio.git
    ```
2. Navigate to the project directory:
    ```sh
    cd portfolio
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

To start the development server, run:
```sh
npm start
This will start the app on http://localhost:3000.

## Project Structure
PORTFOLIO/
├── node_modules/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── About/
│   │   │   ├── About.js
│   │   │   ├── About.css
│   │   ├── Background/
│   │   │   ├── Background.js
│   │   │   ├── Background.css
│   │   ├── Contact/
│   │   │   ├── Contact.js
│   │   │   ├── Contact.css
│   │   ├── Header/
│   │   │   ├── Header.js
│   │   │   ├── Header.css
│   │   ├── LandingCard/
│   │   │   ├── Landing.js
│   │   │   ├── Landing.css
│   │   ├── Projects/
│   │   │   ├── Projects.js
│   │   │   └── Projects.css
│   ├── App.jsx
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   └── reportWebVitals.js
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
├── tailwind.config.json

## Components
App.jsx: The main component that renders the entire application.
Background: A component that handles the background visuals.
LandingCard: The landing page component that is shown initially.
Header: The header component that contains navigation links.
About: A component that provides information about you.
Projects: A component that showcases your projects.
Contact: A component that provides contact information.