### Documentation


### Architecture:

The application follows a Model-View-Controller (MVC) like architecture, although it's implemented across a frontend (React) and a backend (Node.js/Express) rather than a traditional single-framework MVC.

### Frontend (React):

The frontend is built using React, a JavaScript library for building user interfaces. It is responsible for:

### View (Components):
 Rendering the user interface, including displaying lists of expenses (ExpenseList), forms for adding/editing expenses (ExpenseForm), a dashboard with charts (Dashboard), and authentication pages (SignupPage, SigninPage).
Controller (Component Logic & State Management): Handling user interactions, managing component state using useState and useEffect hooks, and making API calls to the backend.
Routing: Using react-router-dom to handle navigation between different pages (Expenses list, Add Expense, Dashboard, Sign Up, Sign In).

### State Management:
 Primarily using local component state (useState). User authentication status (loggedInUsername) is managed at the App component level and passed down. Token-based authentication relies on storing the JWT in localStorage.
Key Frontend Components and their Roles:

### App:
 The root component. Sets up routing using BrowserRouter and Routes. Manages the overall layout (header, main content, footer), user authentication state, and navigation links.
### ExpenseList:
 Displays a list of expenses fetched from the backend. Allows users to edit or delete expenses.
### ExpenseForm:
 Provides a form for adding new expenses or editing existing ones. Interacts with the backend API to create or update expense data.
### Dashboard:
 Fetches expense data and displays it visually using charts (Pie chart for category-wise spending, Bar chart for monthly spending) rendered with react-chartjs-2.
### SignupPage:
 Handles user registration by sending user details to the backend.
### SigninPage:
 Handles user login by sending credentials to the backend and receiving a JWT upon successful authentication. Stores the token in localStorage and updates the logged-in status in the App component.


### B. Backend (Node.js/Express):

The backend is built using Node.js and the Express.js framework. It is responsible for:

### Routing:
 Defining API endpoints using express.Router to handle requests for expenses and authentication.
### Controller (Route Handlers):
 Implementing the logic for handling incoming requests, interacting with the database, and sending responses. (expense.controller.js, authController.js).
### Model (Mongoose Schemas):
 Defining the data structure for users (User.js) and expenses (Expense.js) using Mongoose schemas.
### Data Access (Mongoose Models):
 Interacting with the MongoDB database using Mongoose models to perform CRUD (Create, Read, Update, Delete) operations.
### Authentication and Authorization:
 Implementing user registration and login, generating JWTs for authentication, and using middleware (authMiddleware.js) to protect expense-related routes.
### Database:
 Using MongoDB as the database to store user and expense data.


Key Backend Components and their Roles:

### server.js:
 The main entry point for the backend application. Sets up the Express server, connects to MongoDB, uses middleware (CORS, JSON parsing, custom request logging), and mounts the route handlers.
routes/route.js: Defines the API routes for managing expenses (/api/expenses). These routes are protected by the authenticate middleware.
routes/authRoute.js: Defines the API routes for user authentication (/api/auth/signup, /api/auth/signin).
controller/expense.controller.js: Contains the logic for handling expense-related requests (getting all expenses, creating, updating, and deleting expenses). It ensures that users can only access and modify their own expenses.
controller/authController.js: Contains the logic for user signup (hashing password and saving to the database) and signin (verifying credentials and generating a JWT).
models/User.js: Defines the Mongoose schema for the user document.
models/Expense.js: Defines the Mongoose schema for the expense document, including a reference to the User who created it.
middleware/authMiddleware.js: Implements the authentication middleware that checks for a valid JWT in the Authorization header of incoming requests. It verifies the token and attaches the user ID to the req object for use in subsequent route handlers.

### II. Application Flow:

The application flow can be broken down into several key user interactions:

### A. Initial Load:

When a user opens the application in their browser, the index.js file renders the App component.
The App component sets up the routing and renders the appropriate component based on the initial URL path.
The useEffect hook in App checks for a token in localStorage. If a token exists, it might be used (though the provided code doesn't explicitly fetch user data based on the token on initial load).
### B. User Signup:

The user navigates to the /signup route, rendering the SignupPage component.
The user fills out the signup form (username, email, password) and submits it.
The handleSignup function in SignupPage makes a POST request to the /api/auth/signup endpoint on the backend.
The backend (authController.js) receives the request, checks if the email is already registered, hashes the password, creates a new user in the MongoDB database, and sends a success or error response back to the frontend.
Upon successful signup, the frontend may display a success message and redirect the user to the sign-in page.
### C. User Sign In:

The user navigates to the /signin route, rendering the SigninPage component.
The user enters their email and password and submits the form.
The handleSignin function in SigninPage makes a POST request to the /api/auth/signin endpoint on the backend.
The backend (authController.js) receives the request, queries the database for the user with the provided email, compares the provided password with the stored hashed password, and if successful, generates a JWT.
The backend sends a success response back to the frontend, including the JWT and the username.
The handleSignInSuccess function in App is called, which updates the loggedInUsername state. The SigninPage also stores the JWT in localStorage and navigates the user to the home page (/).
### D. Viewing Expenses:

When the user navigates to the / route (or after successful sign-in), the ExpenseList component is rendered.
The useEffect hook in ExpenseList checks for a token in localStorage. If a token exists, it calls the fetchExpenses function.
fetchExpenses makes a GET request to the /api/expenses endpoint on the backend, including the JWT in the Authorization header.
The backend (authMiddleware.js) intercepts the request, verifies the JWT, and if valid, allows the request to proceed to the getAllExpenses function in expense.controller.js.
getAllExpenses retrieves all expenses associated with the authenticated user's ID from the MongoDB database and sends them back to the frontend as a JSON response.
The ExpenseList component receives the data and renders the list of expenses.
### E. Adding a New Expense:

The user navigates to the /add route, rendering the ExpenseForm component.
The user fills out the expense form (amount, category, description, date) and submits it.
The handleSubmit function in ExpenseForm makes a POST request to the /api/expenses endpoint on the backend, including the expense data in the request body and the JWT in the Authorization header.
The backend (authMiddleware.js) verifies the JWT. The createExpense function in expense.controller.js receives the data, adds the authenticated user's ID to the expense object, saves the new expense to the MongoDB database, and sends a success response back to the frontend.
Upon successful creation, the frontend navigates the user back to the expenses list (/).
### F. Editing an Expense:

From the ExpenseList, the user clicks the "Edit" button for a specific expense, navigating to the /edit/:id route.
The ExpenseForm component is rendered, and the useParams hook extracts the id of the expense to be edited.
The useEffect hook in ExpenseForm (when id is present and a token exists) makes a GET request to the /api/expenses endpoint to fetch all expenses, finds the one with the matching id, and populates the form with its data.
The user modifies the expense details and submits the form.
The handleSubmit function in ExpenseForm makes a PUT request to the /api/expenses/:id endpoint on the backend, including the updated expense data in the request body and the JWT in the Authorization header.
The backend (authMiddleware.js) verifies the JWT. The updateExpense function in expense.controller.js finds and updates the expense with the matching id and the authenticated user's ID in the MongoDB database, and sends a success response back to the frontend.
Upon successful update, the frontend navigates the user back to the expenses list (/).
### G. Deleting an Expense:

From the ExpenseList, the user clicks the "Delete" button for a specific expense.
The handleDelete function in ExpenseList is called, which (after confirmation) makes a DELETE request to the /api/expenses/:id endpoint on the backend, including the JWT in the Authorization header.
The backend (authMiddleware.js) verifies the JWT. The deleteExpense function in expense.controller.js finds and deletes the expense with the matching id and the authenticated user's ID from the MongoDB database, and sends a success response back to the frontend.
Upon successful deletion, the fetchExpenses function is called again to refresh the expense list.
### H. Viewing the Dashboard:

The user navigates to the /dashboard route, rendering the Dashboard component.
The useEffect hook in Dashboard checks for a token in localStorage. If a token exists, it fetches all expenses for the authenticated user from the /api/expenses endpoint (similar to viewing expenses).
Once the expense data is received, the component processes it to calculate category-wise and monthly spending summaries using the reduce method.
This summarized data is then used to configure the data objects for the Pie and Bar charts rendered using react-chartjs-2.
### I. User Logout:

When the user clicks the "Logout" button in the header, the handleLogout function in the App component is called.
handleLogout removes the token from localStorage and sets the loggedInUsername state to null.
The header updates to display the "Sign In" and "Sign Up" links, and the user is effectively logged out. They will likely be redirected to the sign-in page or the expenses list page (which will now not be able to fetch data without a token).