Certainly! Here's an updated **README** tailored for your project, now deployed as a React + Vite application:

---

# Req2Test.AI – AI-Powered Healthcare Test Case Generator

## Overview

**Req2Test.AI** is an AI-driven solution that automates the generation of test cases for healthcare software from natural-language requirements. It interprets complex healthcare specifications, generates structured JSON test cases, maintains full requirement-to-test traceability, and supports integration with enterprise toolchains like Jira, Polarion, and Azure DevOps. The system also supports GDPR-compliant testing using synthetic datasets.

This project is deployed as a React + Vite application with a user-friendly interface for uploading requirements, generating test cases, reviewing them, and exporting to downstream workflows.

🔗 Live Demo: [https://req2testai.lovable.app/](https://req2testai.lovable.app/)

---

## Project Structure

* **src/** – Main React application code

  * **components/** – Reusable UI components
  * **pages/** – Page-level components and routes
  * **services/** – Backend API calls, AI integration logic
* **backend/** – Python backend code for AI test case generation, requirement ingestion, and database operations
* **database/** – SQLite database file (`traceability.db`) storing generated test cases and traceability data
* **sample\_testcases.json** – Offline test case samples for demo mode

---

## Technologies Used

* **Frontend:** React, Vite, TypeScript, Tailwind CSS, shadcn-ui
* **Backend:** Python (FastAPI/Flask optional), Vertex AI, Gemini AI
* **Database:** SQLite (for traceability), BigQuery (optional for large-scale deployments)
* **APIs & Toolchain Integration:** Jira, Polarion, Azure DevOps

---

## How to Run the Project Locally

To work with the code locally, ensure you have **Node.js** and **npm** installed. You can install Node.js using [nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

Follow these steps:

```bash
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project folder
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

After running the dev server, the app will be accessible in your browser, typically at `http://localhost:5173`.

---

## Deployment

To deploy the app:

```bash
# Build the React + Vite app
npm run build

# Serve the production build
npm run preview
```

You can deploy the app to any standard React hosting platform (Vercel, Netlify, Firebase Hosting, etc.).

---

## License

This project is released under the MIT License.

---

If you need further assistance or have any questions, feel free to ask!
