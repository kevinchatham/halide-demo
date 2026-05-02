<p align="center">
  <img src="https://github.com/kevinchatham/halide/blob/main/images/halide-logo.png?raw=true" alt="halide" width="150px" height="150px"/>
  <br/>
  <em>Stability by composition</em>
  <br/><br/>
  <a href="https://github.com/kevinchatham/halide/tree/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License"/>
  </a>
  <img style="margin-left:8px;" src="https://img.shields.io/npm/v/halide" alt="npm"/>
  <a style="margin-left:8px;" href="https://nodejs.org">
    <img src="https://img.shields.io/badge/node-%3E%3D24-1e293b" alt="Node.js"/>
  </a>
</p>

## Overview

This demo showcases [Halide](https://github.com/kevinchatham/halide) powering an Angular 21 SPA with a full BFF layer—JWT auth, user CRUD, proxy routing, and OpenAPI docs. It demonstrates how Halide handles the frontend backend boundary in a real application.

## Get started

```bash
git clone https://github.com/kevinchatham/halide-demo.git
cd halide-demo
npm install
npm run start
```

Open http://localhost:3553 in your browser.

## What's in the demo?

The demo is a monorepo with three packages:

```
halide-demo/
├── projects/
│   ├── backend/     # Node.js API server (port 3000)
│   ├── angular/     # Angular 21 SPA + Halide BFF (port 3553)
│   └── shared/      # Zod schemas + route types
```

### Backend API

A Node.js server exposing user management endpoints:

| Method | Path             | Description          |
| ------ | ---------------- | -------------------- |
| GET    | `/api/health`    | Health check         |
| POST   | `/api/login`     | JWT token generation |
| GET    | `/api/users`     | List all users       |
| GET    | `/api/users/:id` | Get user by ID       |
| POST   | `/api/users`     | Create user          |
| PUT    | `/api/users/:id` | Update user          |
| DELETE | `/api/users/:id` | Delete user          |

### Angular SPA + BFF

The Angular application runs alongside a Halide BFF server that:

- Serves the static SPA build
- Proxies `/api/*` requests to the backend
- Validates JWTs on protected routes
- Serves OpenAPI documentation
