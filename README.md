# 💪 Workout Logger

A full-stack web application for tracking workouts with AI-powered workout tips via ChatGPT integration.

![Workout Logger Demo](screenshots/demo.gif)
*Add a screenshot or GIF here*

## 🎯 Features

- **User Authentication**: Secure registration and login system with password hashing
- **Workout Tracking**: Log exercises with date, type, sets, reps, and duration
- **Search & Filter**: Find specific workouts by exercise type or date
- **AI Integration**: Real-time workout tips and advice powered by OpenAI's ChatGPT API
- **Workout History**: View all past workouts organized by date

## 🛠️ Tech Stack

**Frontend:**
- HTML5
- CSS3
- JavaScript (Vanilla)

**Backend:**
- PHP
- MySQL

**APIs:**
- OpenAI GPT API

**Development Environment:**
- XAMPP (Apache, MySQL, PHP)

## 📸 Screenshots

### Login Page
![Login](screenshots/login.jpg)

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Workout Log
![Workout](Workout-Logger/final-project/screenshots/workout.png)

### AI Assistant
![ChatGPT](screenshots/chatgpt.png)

## 🚀 Installation & Setup

### Prerequisites
- XAMPP (or any PHP/MySQL environment)
- OpenAI API key

### Steps

1. **Clone the repository**
```bash
   git clone https://github.com/MahirAsef999/Workout-Logger.git
   cd Workout-Logger
```

2. **Move to XAMPP htdocs**
```bash
   # Copy the project to XAMPP's htdocs folder
   # Windows: C:/xampp/htdocs/
   # Mac: /Applications/XAMPP/htdocs/
```

3. **Setup Database**
   - Open phpMyAdmin (http://localhost/phpmyadmin)
   - Create a new database called `workout_logger`
   - Import `workout_log.sql` file

4. **Configure API Key**
   - Create a `config.php` file (or update existing)
   - Add your OpenAI API key:
```php
   
```

5. **Run the application**
   - Start XAMPP (Apache + MySQL)
   - Visit: `http://localhost/Workout-Logger`

## 📋 Database Schema
```sql
-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Workouts table
CREATE TABLE workouts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    exercise_name VARCHAR(100) NOT NULL,
    sets INT,
    reps INT,
    duration INT,
    workout_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## 🎥 Demo Video

[Coming soon - Link to YouTube demo]

## 🔮 Future Enhancements

- [ ] Add workout analytics and progress charts
- [ ] Implement workout templates for common routines
- [ ] Add social features (share workouts with friends)
- [ ] Mobile responsive design
- [ ] Export workout data to CSV
- [ ] Integration with fitness wearables

## 📝 License

MIT License - feel free to use this project for learning!

## 👤 Author

**Mahir Asef**
- LinkedIn: [linkedin.com/in/mahir-asef](https://www.linkedin.com/in/mahir-asef-46b3ba203/)
- Email: mahirasef74@gmail.com

---

⭐ If you found this project helpful, please give it a star!
