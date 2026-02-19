import { useState, useEffect } from "react";
import axios from "axios";
import ExpensesGraph from "./ExpensesGraph";
import "./Dashboard.css";

const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Other");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [expenses, setExpenses] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch expenses on load
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/expenses");
      setExpenses(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching expenses:", err);
      setLoading(false);
    }
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();

    if (!title || !amount) return alert("Fill required fields");

    const expenseData = {
      title,
      amount: parseFloat(amount),
      category,
      date: date ? new Date(date) : new Date()
    };

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/expenses/${editId}`, expenseData);
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/api/expenses", expenseData);
      }
      fetchExpenses(); // Refresh list
      setTitle("");
      setAmount("");
      setCategory("Other");
      setDate(new Date().toISOString().split('T')[0]);
    } catch (error) {
      console.error("Error saving expense:", error);
      alert("Failed to save expense");
    }
  };

  const handleEdit = (exp) => {
    setTitle(exp.title);
    setAmount(exp.amount);
    setCategory(exp.category);
    setDate(exp.date ? new Date(exp.date).toISOString().split('T')[0] : "");
    setEditId(exp._id); // Use _id from MongoDB
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      setExpenses(expenses.filter((exp) => exp._id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <div className="dashboard-container">

      <h2>My Expenses 💸</h2>

      {/* Add Expense Form */}
      <form className="expense-form" onSubmit={handleAddOrUpdate}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Expense Title (e.g. Food)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="number"
            placeholder="Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button type="submit" className="btn filled" style={{ marginTop: '10px' }}>
          {editId ? "Update Expense" : "Add Expense"}
        </button>
      </form>

      {/* Graph Component */}
      <ExpensesGraph expenses={expenses} />

      {/* Expense List */}
      <div className="expense-list" style={{ marginTop: '2rem' }}>
        <h3>Recent Transactions</h3>
        {loading ? (
          <p>Loading...</p>
        ) : expenses.length === 0 ? (
          <p className="empty">No expenses added yet.</p>
        ) : (
          expenses.map((exp) => (
            <div className="expense-card" key={exp._id}>
              <div className="expense-info">
                <h4>{exp.title}</h4>
                <small>{new Date(exp.date).toLocaleDateString()} • {exp.category}</small>
              </div>
              <div className="expense-amount">
                <p>₹ {exp.amount}</p>
              </div>

              <div className="actions">
                <button onClick={() => handleEdit(exp)} aria-label="Edit">✏️</button>
                <button onClick={() => handleDelete(exp._id)} aria-label="Delete">🗑️</button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Dashboard;
