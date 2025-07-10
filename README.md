# Live Score App
A real-time sports score web application built with Next.js (v15) and React (v19). It features a responsive UI, theme toggling with styled-components, and is fully typed using TypeScript. The app supports filtering matches by status and displays live match details with up-to-date scores.

---

## 1. Environment Versions

- **Node.js**: v20.x (recommended, based on `@types/node` version)
- **npm**: v9.x or later (compatible with Node 20)
- **React**: 19.x
- **Next.js**: 15.3.5
- **Styled-components**: 6.1.19

> Ensure your local environment matches these versions for best compatibility.

---

## 2. Cloning and Installation

### Clone the repository
To get started, clone the repository and navigate into the project directory:

```bash
git clone https://github.com/laysonaljon/live-score-app.git
cd live-score-app
```

### Install Dependencies

Install all necessary dependencies by running:

`` npm install ``

---

## 3. Running the App

Start the development server with:

`` npm run dev ``

This will launch the app locally (usually at http://localhost:3000).

---

## 4. Available Scripts

| Script               | Description                                         |
|----------------------|-----------------------------------------------------|
| `npm run dev`        | Runs the app in development mode with Turbopack     |
| `npm run build`      | Builds the app for production                        |
| `npm run start`      | Starts the production server                         |
| `npm run lint`       | Runs ESLint to check code quality                    |
| `npm run test`       | Runs Jest tests once                                 |
| `npm run test:watch` | Runs Jest in watch mode for continuous testing      |
| `npm run test:coverage` | Runs Jest and generates test coverage report    |

---

## 4. Notes

- This project uses **Next.js 15.3.5** with **React 19** and **styled-components 6**.
- Testing is set up with **Jest** and **React Testing Library**.
- TypeScript is used for type safety.
- ESLint is configured with Next.js recommended rules.
