# 🎓 EduLearn Pro - Advanced Learning Management System (LMS)

[![Live Demo](https://img.shields.io/badge/Demo-Live_Preview-cyan?style=for-the-badge&logo=vercel)](https://learening-management-system.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux)](https://redux-toolkit.js.org/)

**EduLearn Pro** is a high-performance, premium LMS client designed for the modern educational era. Built with a focus on speed, aesthetics, and real-time data synchronization, it provides a seamless bridge between instructors and thirsty learners.

---

## 🔑 Demo Access (Login Credentials)

For testing and exploration, you can use the following pre-configured accounts:

| Role | Email | Password |
| :--- | :--- | :--- |
| 🛡️ **Admin** | `admin@lms.com` | `123456` |
| 👨‍🏫 **Instructor** | `teacher@gmail.com` | `123456` |
| 🎓 **Student** | `student@gmail.com` | `123456` |

---

## ✨ Features at a Glance

### 💎 Premium User Experience
- **Dynamic Student Dashboard**: Real-time progress tracking, peer leaderboard, and personalized course recommendations.
- **Glassmorphism UI**: A state-of-the-art aesthetic with smooth `framer-motion` transitions and high-contrast dark mode support.
- **Responsive Mastery**: Fluid layout that adapts perfectly from 4K displays down to the smallest smartphones.

### 🛠️ Advanced Functionality
- **Real-Time Analytics**: Visual data representation using `Recharts` for identifying learning trends and course performance.
- **Smart Course Builder**: (For Instructors) Intuitive interface for modular course creation with multi-media support.
- **Global Internationalization**: Seamlessly switch between languages (English/Bengali) via `next-intl`.
- **RBAC (Role Based Access Control)**: Secure and isolated environments for Admins, Instructors, and Students.

### 🏗️ Technical Excellence
- **Global State**: Centralized state management using Redux Toolkit with RTK Query for efficient API caching.
- **Atomic Components**: Reusable, accessible UI components built with Radix UI and Tailwind CSS 4.
- **SEO Optimized**: Pre-configured meta tags, semantic HTML, and optimized performance metrics.

---

## 🛠️ Tech Stack & Dependencies

- **Frontend core**: Next.js 15+ (App Router), React 19
- **Styling**: Tailwind CSS 4, Vanilla CSS (Design Tokens)
- **State/Data**: Redux Toolkit, RTK Query, Context API
- **Animations**: Framer Motion, Lucide React (Icons)
- **Forms/Validation**: React Hook Form, Zod
- **Infrastructure**: Vercel (Hosting), GitHub (CI/CD)

---

## 🏁 Getting Started

### 1. Prerequisite
Ensure you have [Node.js 20+](https://nodejs.org/) installed.

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/nayeem-miah/lms-client.git
cd lms-client

# Install dependencies
npm install
```

### 3. Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api/v1
```

### 4. Development
```bash
npm run dev
```

---

## 📁 System Architecture

```text
├── app/             # Application routes (I18n, RBAC)
├── components/      # UI components (Dashboard, Layout, UI)
├── context/         # Global Context Providers
├── lib/             # Redux Slices, Utils, API Config
├── messages/        # Translation JSONs (i18n)
├── public/          # Static Media Assets
└── types/           # Global TypeScript Interfaces
```

---

