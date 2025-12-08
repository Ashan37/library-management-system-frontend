<div align="center">

# 📚 Library Management System
### Frontend Application

<p align="center">
  <i>A modern, responsive web application for managing library books with full CRUD operations</i>
</p>

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4.10-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.14-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📦 Prerequisites](#-prerequisites)
- [🚀 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [🏃‍♂️ Running the Application](#️-running-the-application)
- [📁 Project Structure](#-project-structure)
- [📜 Available Scripts](#-available-scripts)
- [🔌 API Integration](#-api-integration)
- [🔒 Authentication & Security](#-authentication--security)
- [🎨 Color Theme](#-color-theme)
- [📱 Responsive Design](#-responsive-design)
- [🧪 Testing](#-testing)
- [🚀 Deployment](#-deployment)
- [🐛 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)

---

## ✨ Features

<table>
<tr>
<td>

🔐 **User Authentication**
<br/>Secure login and registration system

📚 **Book Management**
<br/>Complete CRUD operations

🎨 **Modern UI/UX**
<br/>Clean, professional interface

📱 **Fully Responsive**
<br/>Works on all devices

🔒 **Route Protection**
<br/>Secure authentication system

</td>
<td>

💾 **State Management**
<br/>Efficient with Zustand

✅ **Form Validation**
<br/>Real-time validation

🚀 **Fast Performance**
<br/>Lightning-fast with Vite

🎭 **Smooth Animations**
<br/>Professional transitions

🌐 **API Integration**
<br/>RESTful communication

</td>
</tr>
</table>

## 🛠️ Tech Stack

<div align="center">

### Core Technologies

| Technology | Version | Purpose |
|:----------:|:-------:|:-------:|
| ⚛️ React | 18.3.1 | UI Library |
| 📘 TypeScript | 5.6.2 | Type Safety |
| ⚡ Vite | 5.4.10 | Build Tool |
| 🎨 Tailwind CSS | 3.4.14 | Styling |

### Key Dependencies

| Package | Version | Purpose |
|:-------:|:-------:|:-------:|
| 🧭 React Router DOM | 6.28.0 | Routing |
| 🐻 Zustand | 5.0.2 | State Management |
| 📝 React Hook Form | 7.53.2 | Form Handling |
| 🌐 Axios | 1.7.8 | HTTP Client |
| 🎭 Lucide React | 0.460.0 | Icons |

</div>

## 📦 Prerequisites

> Before you begin, ensure you have the following installed:

```
✓ Node.js (v18.0.0 or higher)
✓ npm (v9.0.0 or higher) or yarn
✓ Git
```

## 🚀 Installation

### Step 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/library-management-system-frontend.git
cd library-management-system-frontend
```

### Step 2️⃣ Install dependencies

```bash
npm install
```

## ⚙️ Configuration

### 🔧 Backend API Configuration

Update the API base URL in `src/services/api.ts`:

```typescript
export const api = axios.create({
  baseURL: "http://localhost:5119",
});
```

### 🌍 Environment Variables (Optional)

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5119
```

Then update `src/services/api.ts`:

```typescript
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
```

## 🏃‍♂️ Running the Application

### 💻 Development Mode

```bash
npm run dev
```

> 🌐 Application will open at `http://localhost:5173`

### 📦 Production Build

```bash
npm run build
```

### 👀 Preview Production Build

```bash
npm run preview
```

### 🔍 Lint Code

```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ProtectedRoute.tsx
│   └── Sidebar.tsx
├── layouts/
│   └── MainLayout.tsx
├── pages/
│   ├── auth/
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── books/
│   │   ├── AddBook.tsx
│   │   ├── BookList.tsx
│   │   └── EditBook.tsx
│   └── Dashboard.tsx
├── routes/
│   └── router.tsx
├── services/
│   ├── api.ts
│   ├── authService.ts
│   └── bookService.ts
├── store/
│   ├── authStore.ts
│   └── booksStore.ts
├── App.tsx
├── main.tsx
└── index.css
```

## 📜 Available Scripts

<div align="center">

| Command | Description | Icon |
|:--------|:------------|:----:|
| `npm run dev` | Start development server | 🚀 |
| `npm run build` | Build for production | 📦 |
| `npm run preview` | Preview production build | 👀 |
| `npm run lint` | Run ESLint | 🔍 |

</div>

## 🔌 API Integration

### 🎯 Backend Requirements

> The frontend expects a .NET Core backend running on `http://localhost:5119`

#### 🔐 Authentication Endpoints

```http
POST /api/Auth/login
POST /api/Auth/register
```

#### 📚 Book Management Endpoints

```http
GET    /api/Book/getAllBooks
GET    /api/Book/getBook/{id}
POST   /api/Book/addBook
PUT    /api/Book/updateBook/{id}
DELETE /api/Book/deleteBook/{id}
```

### 📋 Book Model

```typescript
interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}
```

### 🔧 CORS Configuration (Backend)

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173", "http://localhost:5174")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});

app.UseCors("AllowFrontend");
```

## 🔒 Authentication & Security

### 🛡️ Protected Routes

```
🏠 /dashboard
📚 /dashboard/books
➕ /dashboard/books/add
✏️ /dashboard/books/edit/:id
```

### 🔑 Token Handling Example

```typescript
localStorage.setItem("token", token);
config.headers.Authorization = `Bearer ${token}`;

if (error.response?.status === 401) {
  localStorage.removeItem("token");
  window.location.href = "/";
}
```

## 🎨 Color Theme

<div align="center">

| Color | Hex Code | Preview | Usage |
|:-----:|:--------:|:-------:|:------|
| 🤍 **Cream** | `#F5F3EF` | ![#F5F3EF]| Background |
| 🍷 **Burgundy** | `#5E2A2B` | ![#5E2A2B]| Primary buttons, headings |
| 🤎 **Taupe** | `#C9A99A` | ![#C9A99A]| Borders, accents |

</div>

## 📱 Responsive Design

### 📐 Breakpoints

<div align="center">

| Device | Screen Size | Icon |
|:------:|:-----------:|:----:|
| 📱 **Mobile** | < 640px | 📱 |
| 📱 **Tablet** | 640px - 1023px | 📱💻 |
| 🖥️ **Desktop** | ≥ 1024px | 🖥️ |

</div>

## 🧪 Testing

### ✅ Manual Testing Checklist

- [ ] 🔐 Login with valid credentials
- [ ] ❌ Login with invalid credentials (error handling)
- [ ] 📝 Register new user
- [ ] ➕ Add new book
- [ ] 📖 View books list
- [ ] ✏️ Edit existing book
- [ ] 🗑️ Delete book (with confirmation)
- [ ] 🚪 Logout functionality
- [ ] 🔄 Refresh page while logged in
- [ ] 🛡️ Route protection verification

## 🚀 Deployment

### 📦 Build for Production

```bash
npm run build
```

> 📂 Output folder: `dist/`



## 🐛 Troubleshooting

### ⚠️ Common Issues & Solutions

<table>
<tr>
<td align="center">🚫</td>
<td><strong>CORS Errors</strong></td>
<td>→</td>
<td>Check backend CORS configuration</td>
</tr>
<tr>
<td align="center">🔐</td>
<td><strong>Login Problems</strong></td>
<td>→</td>
<td>Verify API endpoints are correct</td>
</tr>
<tr>
<td align="center">📦</td>
<td><strong>Build Errors</strong></td>
<td>→</td>
<td>Delete node_modules and reinstall</td>
</tr>
<tr>
<td align="center">🛡️</td>
<td><strong>Route Protection Issues</strong></td>
<td>→</td>
<td>Check token in localStorage</td>
</tr>
</table>

## 🤝 Contributing

### 🔀 How to Contribute

```
1️⃣  Create a feature branch (git checkout -b feature/AmazingFeature)
2️⃣  Commit your changes (git commit -m 'Add some AmazingFeature')
3️⃣  Push to the branch (git push origin feature/AmazingFeature)
4️⃣  Open a Pull Request
 
```

> We welcome all contributions! 💙

## 📝 License

<div align="center">

This project is licensed under the **MIT License**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

---

## 👥 Authors

<div align="center">

**Your Name** 

[@YourGitHub](https://github.com/Ashan37) · 📧 [Email](mailto:ashanekanayakeat@gmail.com)

</div>

---

## 📞 Support

<div align="center">

💬 **Need Help?**

📧 Email: [ashanekanayakeat@gmail.com]

⭐ Star this repository if you find it helpful!

</div>

---


---

<div align="center">

### 💖 Made with Love

Built with **React** ⚛️ · **TypeScript** 📘 · **Tailwind CSS** 🎨

⭐ **Star this repo** if you found it useful! ⭐

---

**© 2025 Library Management System. All rights reserved.**

</div>

---

