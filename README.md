# 🎓 Learning Management System (LMS) - Client

A modern, fast, and feature-rich Learning Management System (LMS) client built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**. This platform provides a seamless experience for instructors to manage courses and for students to learn effectively.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://learening-management-system.vercel.app)

---

## 🚀 Key Features

- **Interactive Dashboard**: Real-time analytics and statistics powered by Recharts.
- **Course Management**: Effortless course creation, management, and tracking.
- **Smooth Animations**: Enhancing UX with Framer Motion and Lucide React.
- **Multi-language Support**: Internationalization (i18n) via `next-intl`.
- **Global State Management**: Powered by Redux Toolkit for consistent data flow.
- **Secure Payments**: integrated Stripe for smooth course enrollment and transactions.
- **Responsive Design**: Mobile-first approach using Tailwind CSS 4.
- **Modern UI Components**: Built on top of Radix UI for accessibility and style.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Database/Auth**: Integrated via Backend API
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🏁 Getting Started

Follow these steps to set up the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/nayeem-miah/lms-client.git
cd lms-client
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and add your environment variables:
```env
NEXT_PUBLIC_API_URL=your_api_url
# Add other necessary variables
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## 🏗️ Project Structure

- `app/`: Next.js 16 App Router routes and pages.
- `components/`: Reusable UI components.
- `context/`: React context providers.
- `lib/`: Utility functions and shared logic.
- `messages/`: Translation files for i18n.
- `types/`: TypeScript type definitions.
- `public/`: Static assets like images and fonts.

---

## 🌐 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/). You can check the live version here:
[https://learening-management-system.vercel.app](https://learening-management-system.vercel.app)

---

## 📄 License

This project is currently for private use. Contact the author for more information.

---

Developed with ❤️ by **Nayeem Miah**
