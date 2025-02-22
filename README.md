# 🐝 Mighty Bee POS Check-In Service

Mighty Bee is a powerful and scalable Point of Sale (POS) check-in service built specifically for nail salons. Designed to enhance customer experience and streamline business operations, Mighty Bee offers an intuitive interface for both salon owners and customers.

## 🚀 Features

- **Customer Check-In System**: Fast and easy check-in experience with Twilio-powered SMS notifications.
- **Loyalty Rewards Program**: Integrated points and rewards system to encourage repeat visits and boost customer retention.
- **Admin Dashboard**: Comprehensive business management for salon owners, including customer checkouts and loyalty tracking.
- **Multi-App Architecture**: Built using Turborepo for scalable and efficient monorepo management.

---

## 🏗️ Architecture Overview

Mighty Bee is structured as a monorepo using **Turborepo**, consisting of three distinct applications:

### 1. **Marketing App** (`/apps/marketing`)

- **Purpose**: User-facing website for the Bee business, showcasing services and engaging potential customers.
- **Tech Stack**:
  - **Framework**: Next.js
  - **Styling**: Tailwind CSS
  - **Deployment**: Vercel

### 2. **Admin App** (`/apps/admin`)

- **Purpose**: Internal dashboard for managing and monitoring the entire Mighty Bee platform.
- **Tech Stack**:
  - **Framework**: Next.js
  - **Deployment**: Vercel

### 3. **Business App** (`/apps/business`)

- **Purpose**: Admin dashboard for nail salon owners to manage check-ins, process customer checkouts, and track loyalty points.
- **Tech Stack**:
  - **Framework**: Next.js
  - **Database**: MongoDB with Prisma
  - **Notifications**: Twilio for SMS alerts
  - **Deployment**: Vercel

### 4. **Customer App** (`/apps/customer`)

- **Purpose**: Customer-facing app for checking into the salon, viewing loyalty points, and receiving notifications.
- **Tech Stack**:
  - **Framework**: Next.js
  - **Database**: MongoDB with Prisma
  - **Notifications**: Twilio for SMS alerts
  - **Deployment**: Vercel

---

## 📦 Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/peynguyen72/bee.git
   cd bee
   ```

2. **Install Dependencies**:

   ```bash
   yarn install
   ```

3. **Set Up Environment Variables**:

   - Create `.env` for each app (`marketing`, `business`, and `customer`)
   - Required variables:

   ```
    NEXT_PUBLIC_API_URL=
    DATABASE_URL=
    AUTH_SECRET=
    AUTH_GOOGLE_ID=
    AUTH_GOOGLE_SECRET=
    TWILIO_ACCOUNT_SID=
    TWILIO_AUTH_TOKEN=
    TWILIO_PHONE_NUMBER=
   ```

4. **Run Development Servers**:

   ```bash
   yarn dev
   ```

5. Visit the following local URLs:

- Marketing App: `http://localhost:3000`
- Admin App: `http://localhost:3001`
- Business App: `http://localhost:3002`
- Customer App: `http://localhost:3003`

## 📜 Scripts

Mighty Bee is powered by Turborepo for monorepo management, and the following scripts are available:

### General Commands

- **`yarn dev`** - Start development server for all apps
- **`yarn build`** - Build all applications for production
- **`yarn lint`** - Lint and fix code
- **`yarn format`** - Format code using Prettier
- **`yarn prisma:generate`** - Generate Prisma client for `business` and `customer` apps

### App-Specific Commands

- **Admin App**

  - `yarn dev:admin` - Start development server for Admin App
  - `yarn build:admin` - Build Admin App for production

- **Marketing App**

  - `yarn dev:marketing` - Start development server for Marketing App
  - `yarn build:marketing` - Build Marketing App for production

- **Business App**

  - `yarn dev:business` - Start development server for Business App
  - `yarn build:business` - Build Business App for production

- **Customer App**
  - `yarn dev:customer` - Start development server for Customer App
  - `yarn build:customer` - Build Customer App for production

---

## 🚀 Deployment

Mighty Bee is optimized for deployment on **Vercel**.

- **Vercel**: Ideal for quick and scalable deployments.

---

## 📜 License

This project is licensed under the **Proprietary License**.  
Unauthorized copying, distribution, modification, or commercial use of this software is strictly prohibited without prior written permission from the author.  
[View the License](./LICENSE)

---

**Star ⭐ the repo if you find it helpful!**

Happy Coding! 🚀
