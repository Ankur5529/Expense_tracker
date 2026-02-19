import React, { useMemo } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie,
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#d0ed57', '#a4de6c', '#8dd1e1', '#83a6ed', '#8e44ad', '#e74c3c', '#f1c40f', '#2ecc71', '#3498db'];

const ExpensesGraph = ({ expenses }) => {

    const { barData, pieData, totalMonthAmount, currentMonthName } = useMemo(() => {
        const monthlyData = {};
        const categoryData = {};
        let currentMonthTotal = 0;

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();
        const currentMonthLabel = now.toLocaleString('default', { month: 'long' });

        expenses.forEach(exp => {
            const date = new Date(exp.date);
            const expYear = date.getFullYear();
            const expMonth = date.getMonth();

            // 1. Process for Bar Chart (Monthly Trends)
            const key = `${expYear}-${String(expMonth + 1).padStart(2, '0')}`;
            const label = date.toLocaleString('default', { month: 'short', year: 'numeric' });

            if (!monthlyData[key]) {
                monthlyData[key] = { amount: 0, label: label };
            }
            monthlyData[key].amount += exp.amount;

            // 2. Process for Pie Chart & Total (Current Month Only)
            if (expYear === currentYear && expMonth === currentMonth) {
                currentMonthTotal += exp.amount;

                const cat = exp.category || 'Other';
                categoryData[cat] = (categoryData[cat] || 0) + exp.amount;
            }
        });

        // Format Bar Data
        const barData = Object.keys(monthlyData).sort().map((key, index) => ({
            name: monthlyData[key].label,
            amount: monthlyData[key].amount,
            fill: COLORS[index % COLORS.length]
        }));

        // Format Pie Data
        const pieData = Object.keys(categoryData).map((cat, index) => ({
            name: cat,
            value: categoryData[cat],
            fill: COLORS[index % COLORS.length]
        }));

        return { barData, pieData, totalMonthAmount: currentMonthTotal, currentMonthName: currentMonthLabel };
    }, [expenses]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>

            {/* Top Row: Total & Pie Chart */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>

                {/* Total Expense Card */}
                <div style={{ flex: '1', minWidth: '300px', background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', borderRadius: '16px', padding: '2rem', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.4)' }}>
                    <h3 style={{ margin: 0, opacity: 0.9, fontSize: '1.2rem', fontWeight: 500 }}>Total Spent in {currentMonthName}</h3>
                    <h1 style={{ margin: '1rem 0 0 0', fontSize: '3.5rem', fontWeight: 700 }}>₹{totalMonthAmount.toLocaleString()}</h1>
                </div>

                {/* Pie Chart Card */}
                <div style={{ flex: '2', minWidth: '300px', background: '#fff', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h3 style={{ margin: '0 0 1rem 0', color: '#1f2937' }}>Category Breakdown ({currentMonthName})</h3>
                    {pieData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `₹${value}`} />
                                <Legend layout="vertical" verticalAlign="middle" align="right" />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <p style={{ color: '#9ca3af', marginTop: 'auto', marginBottom: 'auto' }}>No expenses this month</p>
                    )}
                </div>
            </div>

            {/* Bottom Row: Bar Chart */}
            <div style={{ width: '100%', height: 400, padding: '1.5rem', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#1f2937' }}>Monthly Trends</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={barData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
                        <Tooltip
                            formatter={(value) => [`₹${value}`, 'Amount']}
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                        />
                        <Bar dataKey="amount" fill="#6366f1" radius={[6, 6, 0, 0]} maxBarSize={60}>
                            {barData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ExpensesGraph;
