#  Personalized Horoscope API  Personalized Horoscope API 🌟

A backend service built with Node.js and Express that generates and serves personalized daily horoscopes for users based on their zodiac sign.

---

### ✨ Features

-   **User Authentication**: Secure signup and login using JWT.
-   **Automatic Zodiac Detection**: Calculates zodiac sign from birthdate on signup.
-   **Daily Horoscope**: Authenticated endpoint to fetch the daily horoscope.
-   **Horoscope History**: Retrieve the last 7 days of served horoscopes.
-   **History Persistence**: (Bonus) All served horoscopes are saved to the database.
-   **Rate Limiting**: (Bonus) Basic API rate limiting (5 requests/minute).
-   **Production-Ready**: Layered architecture, centralized error handling, and standardized API responses.

---

### 📦 Tech Stack

-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB with Mongoose ORM
-   **Authentication**: JSON Web Tokens (JWT)
-   **Validation**: `express-validator`
-   **Security**: `helmet`, `bcryptjs`
-   **Rate Limiting**: `express-rate-limit`

---

### 🚀 Setup and Installation

**1. Prerequisites**
-   Node.js (v18.x or later)
-   MongoDB (local instance or a cloud service like MongoDB Atlas)

**2. Clone the Repository**
```bash
git clone https://github.com/kunal7219/Horoscope-Backend.git
cd horoscope-api

