# TaskFlow AI – Collaborative Kanban SaaS

TaskFlow AI is a full-stack collaborative project management platform inspired by modern Kanban workflows. It enables teams to manage workspaces, track tasks in real time, collaborate efficiently, and leverage AI-powered task summarization.

## 🌐 Live Demo

👉 https://taskflow-ai-vineeth1.vercel.app/

⚠️ **Note:** The backend is hosted on Render's free tier and may take 30–60 seconds to wake up after inactivity.

---

## 🚀 Features

* 🔐 JWT Authentication & Authorization
* 👥 Workspace & Board Management
* ✅ Task Creation, Assignment & Status Tracking
* 🎯 Drag-and-Drop Kanban Workflow
* 👤 Role-Based Access Control (Owner / Member)
* ⚡ Real-Time Task Updates using Socket.IO
* 🤖 AI-Powered Task Summarization (OpenAI)
* 📎 File Attachments
* 📝 Activity Timeline & Audit Logs
* 📱 Modern Responsive UI with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend

* React.js (TypeScript)
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* Prisma ORM

### Database

* PostgreSQL (Neon)

### Real-Time Communication

* Socket.IO

### AI Integration

* OpenAI API

### Deployment

* Vercel (Frontend)
* Render (Backend)
* Neon PostgreSQL (Database)

---

## 🧩 Architecture

```text
Frontend (Vercel)
       ↓
Backend API (Render)
       ↓
PostgreSQL Database (Neon)
```

---

## Key Highlights

* Multi-user collaborative workspace management
* Five-stage Kanban workflow:

  * TODO
  * IN_PROGRESS
  * REVIEW
  * TESTING
  * DONE
* Real-time synchronization across users
* Secure JWT-based authentication
* Role-based permissions
* File attachment support
* AI-generated task summaries
* Activity tracking and audit history

---

## Future Improvements

* AWS S3 integration for file storage
* In-app notifications and notification center
* Dark mode support
* Docker containerization
* CI/CD with GitHub Actions
* Email invitations and workspace sharing
