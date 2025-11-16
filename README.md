# Todo Admin Panel

A modern, responsive todo management admin panel built with Next.js, TypeScript, and Tailwind CSS. This application provides a complete task management solution with user authentication, profile management, and advanced todo operations.

## Features

### Authentication

- User login and signup
- Cookie-based authentication
- Protected routes

### Todo Management

- Create, read, update, and delete todos
- Search todos by title
- Filter todos by deadline (Today, 5 Days, 10 Days, 30 Days)
- Responsive todo cards and table view

### User Profile

- Update user information (name, email, phone, address, date of birth)
- Profile image upload with preview
- Real-time profile updates

### UI/UX

- Fully responsive design for mobile, tablet, and desktop
- Modern sidebar navigation
- Clean and intuitive interface
- Loading states and error handling
- Toast notifications for user feedback

## Tech Stack

- **Framework:** Next.js 14.2.30 (Pages Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **Authentication:** Cookie-based (js-cookie)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd todo-web-application
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The application will be available at [http://localhost:3022](http://localhost:3022)

### 5. Build for production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── components/
│   ├── FormField/          # Reusable form components
│   │   ├── TextField.tsx
│   │   ├── PasswordField.tsx
│   │   ├── DatePickerInput.tsx
│   │   ├── TextArea.tsx
│   │   ├── SearchField.tsx
│   │   └── ImageUploader.tsx
│   ├── layouts/            # Layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── PageHeader.tsx
│   ├── TodoManagement/     # Todo-related components
│   │   ├── TodoForm.tsx
│   │   ├── TodoTable.tsx
│   │   └── TodoCard.tsx
│   └── common/             # Common components
│       └── Modal.tsx
├── contexts/               # React Context providers
│   └── UserContext.tsx
├── hooks/                  # Custom React hooks
│   └── useAuth.ts
├── lib/                    # External library configurations
│   └── axios.ts
├── pages/                  # Next.js pages
│   ├── _app.tsx
│   ├── index.tsx
│   ├── login.tsx
│   ├── signup.tsx
│   ├── reset-password.tsx
│   ├── profile.tsx
│   └── todos/
│       ├── index.tsx
│       └── create.tsx
├── styles/                 # Global styles
│   └── globals.css
└── utils/                  # Utility functions
    └── APIRequester.ts
```

## Key Features Explained

### Search and Filter

The todo list supports:

- **Real-time search:** Filter todos by title and description
- **Date-based filtering:** Filter by deadline dates
- API-driven filtering for optimal performance

### Component Architecture

All form fields are modular and reusable:

- `TextField` - Standard text input with label
- `PasswordField` - Password input with visibility toggle
- `DatePickerInput` - Native HTML5 date picker
- `TextArea` - Multi-line text input
- `SearchField` - Search input with icon
- `ImageUploader` - Image upload with preview and camera icon

### State Management

- Uses React Context API for global user state
- Local state management with React hooks
- Automatic token refresh on user updates

## API Integration

The application expects a REST API with the following endpoints:

### Authentication

- `POST /login/` - User login
- `POST /register/` - User registration
- `POST /password-reset/` - Password reset

### User

- `GET /user/` - Get current user
- `PUT /user/` - Update user profile

### Todos

- `GET /todos/` - Get todos (supports search and date filter)
- `POST /todos/` - Create todo
- `PUT /todos/:id/` - Update todo
- `DELETE /todos/:id/` - Delete todo              

## Available Scripts

| Command         | Description                           |
| --------------- | ------------------------------------- |
| `npm run dev`   | Start development server on port 3022 |
| `npm run build` | Build for production                  |
| `npm run start` | Start production server               |
| `npm run lint`  | Run ESLint                            |
