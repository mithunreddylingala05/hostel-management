# 🎥 HostelHub
> **Next-Generation Residential Management Operations.**

HostelHub is a high-performance, role-based residential management platform defined by its signature **Cinematic Noir** aesthetic. This repository contains both the **React/Vite Frontend** and the **Node.js/Express Backend**.

---

### 🚀 High-Speed Initialization (Easy Run)

Follow these **3 steps** to deploy the system locally:

#### 1. Clone & Prep
```bash
git clone https://github.com/mithunreddylingala05/hostel-management.git
cd "hostel management"
```

#### 2. Launch Backend (Server)
```bash
cd backend
npm install
npm start
```

#### 3. Launch Frontend (UI)
*Open a new terminal window:*
```bash
cd frontend
npm install
npm run dev
```
**Access HUD at:** `http://localhost:5173`

---

### 📂 Command Architecture (File Structure)

```text
hostel-management/
├── 📁 backend/               # Express Command Core
│   ├── 📁 models/            # Database Intelligence (Mongoose)
│   ├── 📁 routes/            # API Protocols
│   ├── 📁 controllers/       # Operational Logic
│   └── 📄 server.js          # Main Entry Point
├── 📁 frontend/              # Cinematic UI HUD
│   ├── 📁 src/
│   │   ├── 📁 pages/         # Screen Modules (Dashboard, Settings, etc)
│   │   ├── 📁 components/    # Reusable UI Elements
│   │   ├── 📁 context/       # Auth & Role Intelligence
│   │   └── 📄 index.css      # Core Cinematic Styling
│   ├── 📁 public/            # Static Assets & Redirects
│   ├── 📄 netlify.toml       # Deployment Manifest
│   └── 📄 vite.config.js     # Build Logic
└── 📄 README.md              # Global Protocol Guide
```

---

### 🏛️ Operational Hierarchy

| Role | Access Level | Primary Objectives |
| :--- | :--- | :--- |
| **Admin** | Command Core | System diagnostics, global analytics, terminal configuration. |
| **Warden** | Management | Resident ID, gate pass authorization, ticket resolution. |
| **Student** | Resident | Cryptographic gate requests, maintenance ticketing. |

---

### ✨ Core Features

*   **🌑 Cinematic Design**: Aura-Glass Interface with glowing micro-interactions.
*   **🔐 Auth Intelligence**: Full role-based security (Admin/Warden/Student).
*   **🎫 Digital Access**: Cryptographic Gate Pass system with QR validation.
*   **🛠️ Support Bureau**: Real-time technical ticketing & resolution workflow.

---

### ⚓ Netlify Deployment
1. Connect repository to Netlify.
2. Build Command: `npm run build` | Publish Directory: `dist`
3. Client-side routing is handled via our pre-configured `netlify.toml`.
