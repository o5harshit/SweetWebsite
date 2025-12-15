# SweetNest 🍬

A full-stack web application for a sweet store, allowing users to browse, search, and purchase sweets, with admin functionality for managing inventory.

## Features

- **User Authentication**: Secure login and registration system using JWT tokens.
- **Sweet Browsing**: View a list of available sweets with search functionality.
- **Shopping Cart**: Add sweets to cart, manage quantities, and proceed to purchase.
- **Admin Dashboard**: Admins can add, update, and manage sweet inventory.
- **Image Upload**: Upload and store sweet images using Cloudinary.
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS and Radix UI components.
- **Real-time Notifications**: Toast notifications for user actions.

## Tech Stack

### Frontend
- **React 19**: Modern JavaScript library for building user interfaces.
- **Vite**: Fast build tool and development server.
- **Redux Toolkit**: State management for React applications.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Radix UI**: Accessible UI components.
- **Axios**: HTTP client for API requests.
- **React Router**: Client-side routing.

### Backend
- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database with Mongoose ODM.
- **JWT**: JSON Web Tokens for authentication.
- **bcrypt**: Password hashing.
- **Cloudinary**: Cloud-based image storage and management.
- **express-fileupload**: Middleware for handling file uploads.

## Installation

### Prerequisites
- Node.js (version 18 or higher)
- MongoDB (local installation or cloud service like MongoDB Atlas)
- Git

### Backend Setup

1. **Clone the repository** (if not already done):
   ```bash
   git clone https://github.com/yourusername/sweetnest.git
   cd sweetnest
   ```

2. **Navigate to the server directory**:
   ```bash
   cd server
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Create environment file**:
   Create a `.env` file in the `server` directory with the following variables:
   ```
   PORT=8080
   ORIGIN=http://localhost:5173
   MONGO_URL=mongodb+srv://yourusername:yourpassword@cluster0.d3d2vqd.mongodb.net/sweetnest?retryWrites=true&w=majority
   JWT_KEY=your_super_secret_jwt_key_here
   CLOUD_NAME=your_cloudinary_cloud_name
   api_key=your_cloudinary_api_key
   api_secret=your_cloudinary_api_secret
   ```

5. **Start the backend server**:
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:8080`.

### Frontend Setup

1. **Open a new terminal and navigate to the client directory**:
   ```bash
   cd client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the frontend development server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## Usage

1. **Access the application**:
   Open your browser and go to `http://localhost:5173`.

2. **Register/Login**:
   - Create a new account or log in with existing credentials.
   - Admin accounts have additional privileges.

3. **Browse Sweets**:
   - View the sweet store page to see available products.
   - Use the search bar to find specific sweets.

4. **Shopping**:
   - Add sweets to your cart.
   - View and manage cart items.
   - Proceed to purchase.

5. **Admin Functions** (for admin users):
   - Access the admin dashboard.
   - Delete sweets.
   - Update the sweet stock.

## Screenshots

### Login Page
![Login Page]<img width="1920" height="1080" alt="login" src="https://github.com/user-attachments/assets/4ef0b1ae-209e-4c81-a03c-028886cb4a03" />
*Main Login page where the user and admin will login or SignIn.*

### Sweet Store
![Sweet Store]("C:\Users\sriva\OneDrive\Pictures\Screenshots\sweetsCreation.png")
*Browse and search available sweets.*

### Admin Dashboard
![Admin Dashboard]("C:\Users\sriva\OneDrive\Pictures\Screenshots\admin-dashboard.png")
*Admin interface for managing sweet inventory.*

### Shopping Cart
![Shopping Cart]("C:\Users\sriva\OneDrive\Pictures\Screenshots\cart.png")
*View and manage cart items before purchase.*

## My AI Usage

This project was developed with the assistance of GitHub Copilot, an AI-powered coding assistant provided by GitHub. Copilot helped in several ways:

- **Code Suggestions**: Provided intelligent code completions and suggestions for React components, Express routes, and MongoDB schemas.
- **Debugging Assistance**: Helped identify and fix bugs in authentication logic and API endpoints.
- **Boilerplate Generation**: Generated repetitive code structures like CRUD operations and UI components.
- **Best Practices**: Suggested improvements for code organization, error handling, and security measures.
- **Documentation**: Assisted in writing clear comments and documentation for functions and components.

While Copilot significantly accelerated development, all code was reviewed and modified by the developer to ensure correctness and adherence to project requirements.

## Contributing

We welcome contributions to SweetNest! Here's how you can get involved:

1. **Fork the repository** on GitHub.

2. **Clone your fork**:
   ```bash
   git clone https://github.com/o5harshit/SweetWebsite
   ```

3. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes** and commit them:
   ```bash
   git commit -m "Add your commit message"
   ```

5. **Push to your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request** on the main repository.

Please ensure your code follows the existing style.



## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## Repository

[GitHub Repository](https://github.com/o5harshit/SweetWebsite)

## Deployment

The application is deployed and live at: [SweetNest Live](https://sweetwebsite.onrender.com/)

---

Built with ❤️ using React, Node.js, and MongoDB.
