# 📋 Kanban Board - Frontend Developer Assessment

A comprehensive Kanban Board application designed to implement frontend programming assessment requirements. The application focuses on efficiency in state management, data fetching, and seamless user experience.

## 🎯 Implemented Requirements

Based on the task PDF, the following has been implemented:
- **4 Main Columns:** (Backlog, In Progress, Review, Done).
- **Complete CRUD Operations:** Create, update, and delete tasks.
- **Drag & Drop:** Move tasks between columns using `@hello-pangea/dnd`.
- **Search Bar:** Filter tasks by title or description.
- **Infinite Scroll:** Progressive task loading within each column to ensure high performance.
- **Styling:** Using **Material UI (MUI)** to build a modern and responsive interface.
- **Data Management:** Using **React Query** for data caching and synchronization.
- **State Management:** Using **Zustand** to manage UI and search state.

## 🛠️ Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Material UI v6
- **Data Fetching:** TanStack Query (React Query) & Axios
- **State Management:** Zustand
- **Form Handling:** React Hook Form
- **Drag & Drop:** @hello-pangea/dnd

## 📦 Setup & Installation

### Prerequisites
- Node.js 18.17 or higher
- npm or yarn
- Git (optional)

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables Setup
Create a `.env.local` file at the project root:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
npm run dev
```
The application will be available at: `http://localhost:3000`

### 4. Run Database Server
In a separate terminal window:
```bash
npm run db:start
```
JSON Server runs on: `http://localhost:3001`

### 5. Production Build
```bash
npm run build
npm run start
```

### 6. Testing & Linting
```bash
npm run lint
npm run type-check
```

## 📁 Project Structure
```
src/
├── app/              # Next.js App Router
├── components/       # React Components
├── hooks/           # Custom Hooks
├── services/        # API Services
├── store/           # Zustand Store
└── types/           # TypeScript Types

public/              # Static Files
db.json             # Mock Database
```

## 🚀 How to Use

### Basic Operations:
1. **Create a New Task:** Click "Add Task" in the header
2. **Edit a Task:** Click on a task to open details and edit
3. **Delete a Task:** Click the delete button on the task
4. **Move Between Columns:** Drag and drop tasks between columns
5. **Search:** Use the Search Bar to find tasks

## 🔧 Available Commands
- `npm run dev` - Start development server
- `npm run build` - Build the application
- `npm run start` - Run production
- `npm run db:start` - Start database server
- `npm run lint` - Check code

## 📝 Important Notes
- The application uses JSON Server as a mock database for development
- Make sure to run both dev server and db server together
- The `db.json` file contains initial task data

## 🐛 Troubleshooting

**Problem:** Cannot connect to the database
- **Solution:** Make sure `npm run db:start` is running in a separate terminal

**Problem:** TypeScript errors
- **Solution:** Run `npm run type-check` to check all errors

**Problem:** Libraries not working
- **Solution:** Delete `node_modules` and `.next`, then run `npm install` and `npm run dev` again
