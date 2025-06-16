import React, { useEffect, useState } from 'react';
import axios from 'axios';



const SalaryList = () => {
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    axios.get('/api/incomes')
      .then((res) => {
        console.log('Fetched incomes:', res.data);
        setIncomes(res.data);
      })
      .catch((error) => {
        console.error('Error fetching incomes:', error);
      });
  }, []);
  // Fetch incomes when the component mounts for delete
 const handleDelete = (id) => {
  axios.delete(`/api/incomes/${id}`)
    .then(() => {
      setIncomes((prev) => prev.filter((salary) => salary.id !== id));
    })
    .catch((error) => {
      console.error('Error deleting salary:', error);
    });
};


  return (
    <div className="min-h-screen bg-red-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-red-800 mb-8 text-center">Salary Records</h1>

      <div className="max-w-4xl mx-auto space-y-4">
        {Array.isArray(incomes) && incomes.length > 0 ? (
          incomes.map((salary) => (
            <div
              key={salary._id}
              className="bg-white shadow-md rounded-lg p-6 border border-red-300 flex justify-between items-center hover:shadow-lg transition"
            >
              <div>
                <h2 className="text-xl font-semibold text-red-700">{salary.title}</h2>
                <p className="text-gray-600">Amount: <span className="font-medium">${salary.amount}</span></p>
                <p className="text-gray-600">Date: <span className="font-medium">{salary.date}</span></p>
                <p className="text-gray-600">Description: <span className="italic">{salary.description}</span></p>
              </div>
              <button
                onClick={() => handleDelete(salary._id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
              >
                Delete
              </button>

            </div>
          ))
        ) : (
          <p className="text-center text-gray-700">No salary records found.</p>
        )}
      </div>
    </div>
  );
};

export default SalaryList;
