import { useState, useEffect } from "react";
import axios from "axios";
import ExpensesGraph from "./ExpensesGraph";
import "./Dashboard.css";
import { API_BASE } from "../config";

const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Other");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [expenses, setExpenses] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Search, Filter, Sort States
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Date (Newest)");

  // Fetch expenses on load
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/expenses`);
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
        await axios.put(`${API_BASE}/api/expenses/${editId}`, expenseData);
        setEditId(null);
      } else {
        await axios.post(`${API_BASE}/api/expenses`, expenseData);
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
      await axios.delete(`${API_BASE}/api/expenses/${id}`);
      setExpenses(expenses.filter((exp) => exp._id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  // Apply Search, Filter, and Sort
  const filteredAndSortedExpenses = expenses
    .filter((exp) => exp.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((exp) => (filterCategory === "All" ? true : exp.category === filterCategory))
    .sort((a, b) => {
      if (sortBy === "Date (Newest)") return new Date(b.date) - new Date(a.date);
      if (sortBy === "Date (Oldest)") return new Date(a.date) - new Date(b.date);
      if (sortBy === "Amount (Highest)") return b.amount - a.amount;
      if (sortBy === "Amount (Lowest)") return a.amount - b.amount;
      return 0;
    });

  // Export to CSV function
  const exportToCSV = () => {
    if (filteredAndSortedExpenses.length === 0) {
      alert("No expenses to export!");
      return;
    }

    const headers = ["Title", "Amount", "Category", "Date"];
    const rows = filteredAndSortedExpenses.map(exp => [
      `"${exp.title}"`,
      exp.amount,
      exp.category,
      new Date(exp.date).toLocaleDateString()
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `expenses_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dashboard-container">

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <h2>My Expenses 💸</h2>
        <button onClick={exportToCSV} className="btn" style={{ padding: '0.5rem 1rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          📥 Export to CSV
        </button>
      </div>

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
      <ExpensesGraph expenses={filteredAndSortedExpenses} />

      {/* Expense List */}
      <div className="expense-list" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0 }}>Recent Transactions</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #ccc' }}>
              <option value="All">All Categories</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #ccc' }}>
              <option value="Date (Newest)">Date (Newest)</option>
              <option value="Date (Oldest)">Date (Oldest)</option>
              <option value="Amount (Highest)">Amount (Highest)</option>
              <option value="Amount (Lowest)">Amount (Lowest)</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : filteredAndSortedExpenses.length === 0 ? (
          <p className="empty">No expenses found.</p>
        ) : (
          filteredAndSortedExpenses.map((exp) => (
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
