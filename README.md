# Research Grant Management System

A full-stack MERN application designed to streamline the research grant application process for academic institutions. The platform enables faculty members to submit, track, and manage research grant applications while providing administrators with comprehensive oversight and approval workflows.

## 🔗 Reference & Resources

**ORIC Air University:** [https://au.edu.pk/pages/ORIC/oric_home.aspx](https://au.edu.pk/pages/ORIC/oric_home.aspx)

---

## Problem Statement

Traditional research grant application processes involve manual paperwork, fragmented communication, and limited visibility into application status. Faculty members struggle with tracking submissions, while administrators face difficulties in managing, reviewing, and approving applications efficiently.

## Solution Overview

This system provides a centralized digital platform where faculty can create comprehensive profiles, submit research grant applications with supporting documentation, and monitor application progress in real-time. Administrators gain access to a unified dashboard for reviewing, approving, and managing all applications with built-in email notifications and status tracking.

**Architecture Flow:**
```
Client (React SPA) ←→ REST API (Express.js) ←→ Database (MongoDB)
                      ↓
              Authentication (JWT)
              File Storage (Multer)
              Email Service (Nodemailer)
```

---

## Tech Stack

### Frontend
- **React.js 19** - Component-based UI architecture
- **React Router DOM** - Client-side routing and navigation
- **React Bootstrap** - Responsive UI components
- **Axios** - HTTP client for API communication
- **React Icons** - Icon library
- **React Select** - Enhanced select inputs

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling (ODM)

### Authentication & Security
- **JWT (JSON Web Tokens)** - Stateless authentication
- **Bcrypt.js** - Password hashing
- **Helmet** - HTTP security headers
- **CORS** - Cross-origin resource sharing
- **Express Rate Limit** - API rate limiting
- **Express Validator** - Input validation and sanitization

### File Management & Communication
- **Multer** - Multipart file upload handling
- **Nodemailer** - Email notifications
- **Crypto** - Token generation for password reset

### Development Tools
- **Nodemon** - Auto-reloading development server
- **dotenv** - Environment variable management

---

## Key Features

### User Management
- 🔐 **Secure Authentication** - JWT-based login with email verification
- 👤 **Profile Management** - Comprehensive faculty profiles with personal, educational, and employment details
- 📄 **Document Upload** - Support for CVs, certificates, publications, and research documents
- 🔑 **Password Recovery** - Email-based password reset functionality

### Research Grant Applications
- 📝 **Multi-Step Application Form** - Structured data collection across personal, educational, and employment sections
- 💾 **Draft System** - Save progress and submit when ready
- 📊 **Status Tracking** - Real-time application status (Draft, Submitted, Under Review, Approved, Rejected)
- 📎 **File Attachments** - Upload and manage supporting documents

### Administrative Dashboard
- 📈 **Application Overview** - View and manage all submitted applications
- ✅ **Review & Approval** - Approve or reject applications with comments
- 📧 **Email Notifications** - Automated status update emails to applicants
- 📊 **Analytics** - User statistics and application metrics

### Security Features
- Role-based access control (User, Reviewer, Admin)
- Protected routes with JWT middleware
- Input validation and sanitization
- Rate limiting on sensitive endpoints
- Secure password storage with bcrypt
- HTTP security headers with Helmet

---

## API & Backend Highlights

### RESTful API Architecture
- **Authentication Routes** - `/api/auth` - Register, login, password reset
- **User Routes** - `/api/users` - Profile management, user CRUD operations
- **Research Routes** - `/api/research` - Personal, educational, employment information
- **Application Routes** - `/api/applications` - Grant application submission and management

### Database Models
- **User** - Authentication and profile data
- **PersonalInformation** - Contact and demographic details
- **EducationalInformation** - Academic qualifications
- **EmploymentInformation** - Career history
- **ResearchGrantApplication** - Complete application data with status tracking

### Middleware Implementation
- `auth.js` - JWT token verification and user authentication
- `upload.js` - File upload configuration with size and type validation
- `errorHandler.js` - Centralized error handling
- `notFound.js` - 404 route handling

**Detailed API Documentation:** See [API_DOCUMENTATION.md](./backend/API_DOCUMENTATION.md)

---

## Setup & Run Locally

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

### 1. Clone Repository
```bash
git clone <repository-url>
cd University-Project
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp env.example .env

# Configure .env file with your credentials:
# - MongoDB connection string
# - JWT secret key
# - Email service credentials (SMTP)
# - Server port (default: 5000)

# Start backend server
npm start

# For development with auto-reload
npm run dev
```

**Backend runs on:** `http://localhost:5000`

### 3. Frontend Setup
```bash
# From project root
cd ..

# Install dependencies
npm install

# Start React development server
npm start
```

**Frontend runs on:** `http://localhost:3000`

### 4. Database Setup
- MongoDB must be running locally or provide a valid MongoDB Atlas connection string in the backend `.env` file
- Database collections are automatically created on first use

---

## What This Project Demonstrates

### Full-Stack Development Skills
✅ Complete MERN stack implementation with separation of concerns  
✅ RESTful API design with proper HTTP methods and status codes  
✅ React hooks (useState, useEffect, useContext) for state management  
✅ Client-side routing with protected routes  
✅ Form handling with multi-step workflows and validation

### Backend & Database Expertise
✅ MongoDB schema design with relationships and data modeling  
✅ Mongoose ODM for database operations and validation  
✅ JWT authentication implementation from scratch  
✅ Middleware architecture for authentication, validation, and error handling  
✅ File upload handling with Multer

### Security Best Practices
✅ Password hashing with bcrypt  
✅ JWT token-based authentication  
✅ Input validation and sanitization  
✅ Protected API routes with role-based access control  
✅ Rate limiting to prevent abuse  
✅ Security headers with Helmet

### Professional Development Practices
✅ Environment variable configuration for sensitive data  
✅ Error handling with centralized error middleware  
✅ Modular code structure for scalability  
✅ RESTful naming conventions  
✅ Comprehensive API documentation

---

## Project Structure

```
University-Project/
├── backend/                    # Node.js/Express backend
│   ├── models/                # Mongoose schemas
│   ├── routes/                # API route handlers
│   ├── middleware/            # Custom middleware
│   ├── utils/                 # Helper functions
│   ├── uploads/               # File upload directory
│   ├── server.js              # Entry point
│   └── package.json           # Backend dependencies
│
├── src/                       # React frontend
│   ├── Components/            # React components
│   │   ├── Auth/             # Authentication pages
│   │   ├── Dashboard/        # Main dashboard
│   │   ├── Profile/          # User profile sections
│   │   ├── Research/         # Grant application forms
│   │   └── Layout/           # App layout wrapper
│   ├── api/                   # API integration layer
│   ├── constants/             # App constants
│   ├── App.js                 # Root component with routing
│   └── index.js               # React entry point
│
├── public/                    # Static assets
├── package.json               # Frontend dependencies
└── README.md                  # Project documentation
```

---

## Future Enhancements
- Real-time notifications using WebSockets
- Advanced search and filtering for applications
- Export applications to PDF
- Data visualization dashboard with charts
- Multi-language support
- Integration with external research databases

---

## License
This project is part of an academic initiative for Air University.

---

**Built with:** MongoDB • Express.js • React.js • Node.js
