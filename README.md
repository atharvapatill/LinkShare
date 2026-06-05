# LinkShare

LinkShare is a backend-focused file sharing system built with **Node.js, Express, MongoDB, and EJS**.  
It allows users to upload files, generate shareable download links, and optionally send them via email.  
The system also supports scheduled cleanup jobs using cron to manage file lifecycle.

---

## 🚀 Features

- 📁 File upload with Multer
- 🔗 Unique shareable download links (UUID-based)
- 📩 Email sharing via Nodemailer
- ⏳ Automated cleanup using cron jobs
- 🗄️ MongoDB for file metadata storage
- 🎨 EJS-based server rendered UI
- 🧩 Modular architecture (controllers, services, routes, jobs)

---

## ⚙️ Installation

### 1. Clone repository
```bash
git clone https://github.com/your-username/linkshare.git
cd linkshare
```
### 2. Install dependencies
```bash
npm install
```
### 3. Environment Variables
```bash
MONGODB_URI=<your-mongodb-connection-string>
DB_NAME=<your-database-name>

PORT=3000

USER_MAIL=<your-email@gmail.com>
GOOGLE_APP_PASSWORD=<your-google-app-password>
```
### 4. Running the Project
```bash
node app.js
```
