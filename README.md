
🎓 **Student Performance & Placement Tracking System**
A full-stack web application designed to manage student performance, track placement progress,job application statuses and streamline communication between students and the college placement cell. The system offers real-time job role visibility, showcases top-placed students, and simplifies the job application process for both students and administrators.

📚 **Table of Contents**
🔍 **Overview**

✨ Features

🛠️ Tech Stack

📸 Screenshots

🚀 Installation & Setup

🧩 Folder Structure

👩‍💻 Author



🔍 **Overview**
The Student Performance & Placement Tracking System is an intuitive, role-based web application aimed at simplifying how institutions manage student performance records, job applications, and placement progress.

With dedicated panels for students and administrators, the platform facilitates job role publication, filtering based on criteria , student application tracking, and performance monitoring—all from a single portal.

✨ Features
🎓 Student Panel
Secure registration and login

Profile update with personal info, skills, and CGPA

View available job roles with detailed descriptions posted by the admin.

Apply to job postings

Update application status: Applied, Selected, Rejected

Track all job applications in one dashboard

View a leaderboard of top-placed students

🛠️ Admin Panel 
Add or edit job postings with eligibility criteria

Monitor student applications and statuses

Filter the students based on criteria 

Maintain job and performance records


🛠️** Tech Stack**
**Layer	Technologies Used**
Frontend             -	React.js, Material UI (MUI), Axios
Backend              - 	Node.js, Express.js
Database             -	MongoDB (via Mongoose ORM)
Authentication       -	Custom authentication using MongoDB (no JWT or OAuth )
API Communication    - 	RESTful APIs (Axios for client-server interaction)
Server Tools	       -  body-parser, cors, dotenv, nodemon (for development)
Deployment	         -  Currently local (can be deployed using Vercel/Netlify for frontend and Render/Heroku for backend)
Tools                - 	VS Code, Postman (for API testing), Git & GitHub (version control)


📸 **Video demo**
 Visit - https://drive.google.com/drive/u/0/folders/15KnPPCloEESDN_W4o5od5JORkVnsLGEH

🚀** Installation & Setup (VS Code + MongoDB)**
🔧 **Prerequisites**
Ensure the following are installed on your machine:

✅ Node.js & npm

✅ MongoDB (running locally or use MongoDB Atlas)

✅ VS Code

✅ Git (optional, for cloning)

📦 Local Development Setup
1. Clone the Repository

git clone https://github.com/JeyashreeTN/PLACEMENT_CONNECT_WEBAPPLICATION.git
cd PLACEMENT_CONNECT_WEBAPPLICATION

2. Install Node.js Dependencies

If the project has a package.json file, install dependencies:
npm install

3. Configure Environment Variables

Create a .env file in the root directory:
PORT=5000
MONGO_URI=mongodb://localhost:27017/placement_db
JWT_SECRET=your_jwt_secret( you can use in above file or use your own secret jwt)


4. Run MongoDB

Start the MongoDB server if you're running it locally:
mongod


5. Run the Server

npm start
This will start the backend server
http://localhost:5000/

and to run front end as well use npm start

🌐 Accessing the App
Once the server is running:

Open http://localhost:3000/ in your browser ).

API endpoints will be available at http://localhost:5000/api/

👩‍💻 Author
Jeyashree TN
Developed as part of an academic project.

📎 https://github.com/JeyashreeTN/PLACEMENT_CONNECT_WEBAPPLICATION
📎 LinkedIn - https://www.linkedin.com/in/jeyashree-t-n-7636022a9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app


