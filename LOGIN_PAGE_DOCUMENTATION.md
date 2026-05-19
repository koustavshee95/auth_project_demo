# Login Page Implementation Guide

## Overview
This document explains the reusable components created for the login page and how they work together.

## Components Created

### 1. **Reusable Input Component** (`src/components/common/input/Input.tsx`)
A flexible input component used for email, password, and captcha fields.

**Features:**
- Multiple input types (text, email, password, etc.)
- Error handling and validation messages
- Placeholder support
- Disabled state support
- Customizable styling

**Usage:**
```tsx
<Input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(value) => setEmail(value)}
  error={errors.email}
/>
```

**Props:**
- `type`: Input type (default: "text")
- `placeholder`: Placeholder text
- `value`: Current input value
- `onChange`: Callback function when value changes
- `name`: Input name attribute
- `error`: Error message to display
- `disabled`: Disable the input
- `required`: Mark as required

---

### 2. **Reusable Button Component** (`src/components/common/button/Button.tsx`)
A versatile button component used for login and other actions.

**Features:**
- Loading state support
- Multiple button variants (primary, secondary)
- Disabled state
- Customizable text
- Smooth transitions and hover effects

**Usage:**
```tsx
<Button
  text="Login"
  onClick={handleLogin}
  loading={isLoading}
  type="submit"
/>
```

**Props:**
- `text`: Button text
- `onClick`: Click handler
- `type`: Button type (button, submit, reset)
- `disabled`: Disable the button
- `loading`: Show loading state
- `variant`: Button style (primary, secondary)

---

### 3. **Login Page Component** (`src/pages/login/LoginPage.tsx`)
Main login page that uses both Input and Button components.

**Features:**
- Email validation (format check)
- Password validation (minimum 6 characters)
- Captcha field validation
- Real-time error clearing as user types
- Backend API integration for login validation
- Navigation to home page on successful login
- Loading state during API call

**Usage:**
```tsx
import { LoginPage } from "./pages/login/LoginPage";

// Used inside AuthLayout
<LoginPage />
```

---

### 4. **Home Page Component** (`src/pages/home/HomePage.tsx`)
Protected dashboard page that users see after successful login.

**Features:**
- Displays logged-in user's email
- Logout functionality
- Protected route (redirects to login if not authenticated)

---

### 5. **Auth Services** (`src/services/AuthServices.tsx`)
Centralized service for authentication operations.

**Methods:**
- `login(credentials)`: Validates credentials with backend
- `logout()`: Clears authentication data
- `isAuthenticated()`: Checks if user is logged in
- `getUserEmail()`: Gets stored user email

---

## Login Flow

### Step 1: User Enters Credentials
```
User enters Email → Input component updates state
User enters Password → Input component updates state
User enters Captcha → Input component updates state
```

### Step 2: Validation
```
Email → Format validation (regex check)
Password → Length validation (min 6 characters)
Captcha → Non-empty check
```

### Step 3: Backend Call
```
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123",
  "captcha": "captcha_value"
}
```

### Step 4: Success Response
```
{
  "success": true,
  "message": "Login successful",
  "data": {
    "email": "user@example.com",
    "token": "jwt_token_here"
  }
}
```

### Step 5: Navigation
```
Store auth data → Navigate to /home → Protected route allows access
```

---

## File Structure

```
frontend/src/
├── components/
│   ├── common/
│   │   ├── button/
│   │   │   ├── Button.tsx       (Reusable button)
│   │   │   └── Button.css
│   │   └── input/
│   │       ├── Input.tsx        (Reusable input)
│   │       └── input.css
│   └── layout/
│       └── authLayout/
│           ├── AuthLayout.tsx   (Login layout)
│           └── authLayout.css
├── pages/
│   ├── login/
│   │   ├── LoginPage.tsx        (Login form)
│   │   └── LoginPage.css
│   └── home/
│       ├── HomePage.tsx         (Dashboard)
│       └── HomePage.css
├── services/
│   └── AuthServices.tsx         (API calls)
└── App.tsx                      (Router configuration)
```

---

## Backend Setup

The backend has been configured with:
- FastAPI server
- CORS middleware for frontend communication
- Auth routes with login endpoint
- Pydantic models for validation

### Backend Endpoint: `/api/auth/login`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "captcha": "captcha_text"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "email": "user@example.com",
    "token": "jwt_token"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Login failed",
  "error": "Invalid credentials"
}
```

---

## Running the Application

### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
# Runs on http://localhost:8000
```

---

## Protected Routes

The application uses a `ProtectedRoute` component:
- If user is authenticated: Shows the page
- If user is not authenticated: Redirects to login page

```tsx
<Route
  path="/home"
  element={
    <ProtectedRoute>
      <HomePage />
    </ProtectedRoute>
  }
/>
```

---

## Component Reusability

### Input Component Can Be Used For:
- Email fields
- Password fields
- Text inputs
- Captcha inputs
- Any other text-based input

### Button Component Can Be Used For:
- Login button
- Submit buttons
- Action buttons
- Cancel buttons

---

## Next Steps to Enhance

1. **Captcha Implementation**: Integrate real captcha service (Google reCAPTCHA, hCaptcha)
2. **Database Integration**: Connect backend to actual database
3. **Password Hashing**: Implement bcrypt/argon2 for password security
4. **JWT Tokens**: Generate real JWT tokens for authentication
5. **Refresh Tokens**: Implement token refresh mechanism
6. **Error Handling**: Add more specific error messages from backend
7. **Form Validation**: Add stronger client-side validation
8. **Remember Me**: Add "Remember Me" functionality
9. **Forgot Password**: Add password reset flow
10. **Email Verification**: Add email verification step

---

## API Configuration

The frontend connects to the backend using:
```
API_BASE_URL = "http://localhost:8000/api"
```

To change the backend URL, update `src/services/AuthServices.tsx`:
```tsx
const API_BASE_URL = "your-backend-url/api";
```

---

## Styling

All components have CSS files:
- **Button.css**: Responsive button styles
- **input.css**: Input field styles with error states
- **LoginPage.css**: Login form layout and spacing
- **HomePage.css**: Dashboard page styling

---

## Key Features Implemented

✅ Reusable Input component
✅ Reusable Button component
✅ Login form with validation
✅ Backend API integration
✅ Protected routes
✅ Navigation after login
✅ Error handling
✅ Loading states
✅ Responsive design
✅ Type-safe (TypeScript)

---

## Tips

1. **Add Loading Indicator**: The Button component shows "Loading..." during API calls
2. **Clear Errors**: Errors clear when user starts typing
3. **Form Validation**: Validates email format, password length, captcha presence
4. **Protected Routes**: Prevents unauthorized access to home page
5. **Local Storage**: Stores user email for reference (enhance with JWT tokens in production)
