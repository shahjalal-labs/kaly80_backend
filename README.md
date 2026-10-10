# ⚽ Kaly80 Recruit — Football Scouting & Athlete Talent Recruitment API

![Architecture Banner](./assets/banner.svg)

<p align="center">
  <a href="https://www.postman.com/shahjalal-backend-9458759/shahjalal-api-portfolio/collection/48491387-5189bf5d-7d36-40f6-ba77-f22f7b8f4407" target="_blank">
    <img src="https://run.pstmn.io/button.svg" alt="View in Postman" />
  </a>
  <a href="https://www.postman.com/shahjalal-backend-9458759/shahjalal-api-portfolio/collection/48491387-5189bf5d-7d36-40f6-ba77-f22f7b8f4407" target="_blank">
    <img src="https://img.shields.io/badge/Postman-Instant_Live_API_Docs-FF6C37?style=for-the-badge&logo=postman&logoColor=white" alt="Live API Documentation" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Sports_Tech-06B6D4?style=for-the-badge&logo=activity&logoColor=white" alt="Sports_Tech" />
  
</p>

---

## 📌 Executive Overview

Kaly80 Recruit bridges professional sports clubs, scouts, coaches, and athletes. It delivers match performance telemetry, talent scouting evaluation reports, trial job postings, and contract negotiation milestones.

---

## 🚀 Key Architectural Highlights

- **Scout Evaluation Reports**: Standardized physical, tactical, and technical rating rubrics.
- **Match Telemetry**: Track player match appearances, goals, cards, and scout observations.
- **Job & Trial Board**: Football clubs post trial opportunities and academy openings.
- **Role-Based Security**: Strict access boundaries separating Scouts, Coaches, Players, and Club Admins.
- **Notification Feed**: Real-time trial invites and scouting shortlist alerts.

---

## 📬 API Documentation & Interactive Postman Collection

The complete REST API specification is published in our public Postman showcase workspace:

* 🌐 **Instant Live API Documentation**: [Explore kaly80_backend in Postman (Instant Web View)](https://www.postman.com/shahjalal-backend-9458759/shahjalal-api-portfolio/collection/48491387-5189bf5d-7d36-40f6-ba77-f22f7b8f4407)
* 📁 **Local Postman File**: [`docs/postman_collection.json`](./docs/postman_collection.json) (import directly into Postman Desktop or Newman CLI).

### Core Endpoint Modules

| Module | Base Route | Key Capabilities |
|---|---|---|
| **Authentication** | `/api/v1/auth` | Multi-role sports identity verification (Player, Coach, Scout) |
| **Players** | `/api/v1/player` | Player profiles, athletic metrics, match history, video highlights |
| **Scouts & Coaches** | `/api/v1/scout` | Scouting reports, talent evaluation forms, club affiliations |
| **Matches** | `/api/v1/match` | Fixtures, tournament results, player performance logs |
| **Jobs & Trials** | `/api/v1/job` | Club trial listings, athlete applications, status tracking |

---

## 📂 Project Architecture

```plaintext
kaly80_backend/
├── assets/
│   └── banner.svg               # Project architecture visual banner
├── docs/
│   └── postman_collection.json  # Full Postman API collection v2.1
├── src/
│   ├── app/
│   │   ├── middlewares/         # Global error handlers, auth & validation guards
│   │   ├── modules/             # Domain-driven feature modules
│   │   └── routes/              # Centralized route aggregator
│   ├── config/                  # Environment & external service configurations
│   └── server.ts                # Application bootstrapper & HTTP server
├── prisma/
│   └── schema.prisma            # Database schema definition
├── .env.example                 # Sanitized environment template
├── package.json
└── tsconfig.json
```

---

## 🛠️ Quickstart & Local Setup

### Prerequisites
* **Node.js**: `v20.x` or higher
* **Database**: MongoDB or PostgreSQL (as specified in `schema.prisma`)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/shahjalal-labs/kaly80_backend.git
cd kaly80_backend
npm install
```

### 2. Environment Configuration
Copy the provided `.env.example` file to create your local `.env`:
```bash
cp .env.example .env
```

### 3. Initialize Prisma Client
```bash
npx prisma generate
```

### 4. Run Development Server
```bash
npm run dev
```

---

## 👨‍💻 Engineering & Authorship

Developed and maintained by **Md. Shahjalal**.

* **GitHub**: [@shahjalal-labs](https://github.com/shahjalal-labs)
* **Email**: [muhommodshahjalal@gmail.com](mailto:muhommodshahjalal@gmail.com)

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).
