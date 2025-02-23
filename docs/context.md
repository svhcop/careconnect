# CareConnect Application Documentation

## Overview
CareConnect is a healthcare platform that connects patients with healthcare providers. The application is built using React with TypeScript and follows a modern, component-based architecture.

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── auth/        # Authentication related components
│   │   ├── layout/      # Layout components (Navbar, BottomNav)
│   │   └── ui/          # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and configurations
│   ├── pages/          # Page components
│   └── styles/         # Global styles
├── public/             # Static assets
└── index.html         # Entry HTML file
```

## Key Components

### Layout Components

#### Navbar (`/components/layout/navbar.tsx`)
- Main navigation component
- Handles user authentication status
- Provides profile dropdown menu

#### BottomNav (`/components/layout/bottom-nav.tsx`)
- Mobile-friendly bottom navigation
- Role-based navigation items (Patient/Doctor)

### Authentication

#### AuthForm (`/components/auth/auth-form.tsx`)
- Handles both sign-in and sign-up functionality
- Supports email/password and Google authentication
- Includes password reset functionality

### Pages

#### Landing Page (`/pages/landing.tsx`)
- Public landing page
- Features section
- Call-to-action components

#### Authentication Pages
- SignIn (`/pages/auth/sign-in.tsx`)
- SignUp (`/pages/auth/sign-up.tsx`)

## Styling
The application uses Tailwind CSS for styling with a light theme. All components are styled using Tailwind's utility classes for consistency and maintainability.

## State Management
- React Query for server state management
- React Context for authentication state
- Local state with useState for component-level state

## Authentication Flow
1. Users can sign up/in using email/password or Google
2. Role selection (patient/doctor) during signup
3. Authentication state managed through Firebase
4. Protected routes require authentication

## Navigation
- Uses Wouter for routing
- Role-based route protection
- Responsive navigation (top navbar and bottom nav for mobile)

## Best Practices
1. Component composition for reusability
2. TypeScript for type safety
3. Consistent error handling
4. Responsive design principles
5. Accessibility considerations

## Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Start development server: `npm run dev`

## Development Guidelines
1. Follow the existing component structure
2. Use TypeScript for all new components
3. Implement responsive design
4. Write meaningful commit messages
5. Test components before submitting PR