# ExpenseMate 💸  
**ExpenseMate** is a sleek, full-stack personal finance tracker designed to help you monitor your daily spending, visualize trends, and take control of your money with ease. Built using the **MERN Stack**, it combines a modern UI with powerful analytical features.

---

## 🚀 Key Features

- **Intuitive Dashboard**: A premium, clean interface to view your financial status at a glance.
- **Smart Analytics**: Real-time data visualization including:
  - **Monthly Trends**: Bar charts showing spending patterns over time.
  - **Category Breakdown**: Pie charts illustrating your spending by category (Food, Transport, Health, etc.).
- **Full CRUD Support**: Add, edit, and delete expense entries with instant updates.
- **Data Export**: One-click **Export to CSV** feature for offline reporting and spreadsheets.
- **Search & Filter**: Quickly find specific transactions using search, category filters, and sorting (by date or amount).
- **Responsive Design**: fully optimized for a smooth experience across various screen sizes.

---

## 🛠️ Tech Stack

### **Frontend**
- **React.js** (v19)
- **Recharts** (Interactive Data Visualization)
- **Axios** (API Requests)
- **React Router** (Navigation)
- **Vanilla CSS** (Custom Premium Styling)

### **Backend**
- **Node.js**
- **Express.js** (v5)
- **MongoDB Atlas** (Cloud Database)
- **Mongoose** (ODM)
- **CORS & Dotenv** (Environmental & Security management)

---

## 📸 Screenshots

### **1. Landing Page**
The gateway to your financial management journey.
![Landing Page](./images/main.png)

### **2. User Authentication**
Secure and simple login interface.
![Login Page](./images/login%20page.png)

### **3. Main Dashboard**
Comprehensive overview of your expenses and analytics.
![Dashboard Overview](./images/dashboard%201.png)

### **4. Detailed Transactions**
Managing and filtering your recent activities.
![Recent Transactions](./images/dashboard%202.png)

---

## ⚙️ Installation & Setup

### **Prerequisites**
- Node.js installed
- MongoDB Atlas account (for the database URI)

### **1. Clone the repository**
```bash
git clone https://github.com/Ankur5529/Expense_tracker.git
cd Expense_tracker
```

### **2. Backend Setup**
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your MongoDB connection string:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm start
   ```

### **3. Frontend Setup**
1. Open a new terminal and navigate to the client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

---

## 📄 License
Distributed under the ISC License.

---

**Built with ❤️ by [Ankur5529](https://github.com/Ankur5529)**
