import React, { useEffect, useState } from "react";
import axios from "axios";

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:5000/api/reports", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-400 mt-10 text-lg">Fetching reports...</div>
    );
  }

  return (
    <div className="p-10 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">📊 Reports Dashboard</h2>

      {reports.length === 0 ? (
        <p className="text-center text-gray-400">No reports found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-gray-800 bg-opacity-70 hover:bg-gray-700 transition-all duration-300 rounded-2xl shadow-lg p-6 border border-gray-700 hover:border-blue-500"
            >
              <h3 className="text-xl font-semibold text-blue-400 mb-2">{report.title}</h3>
              <p className="text-gray-300 mb-2">📅 Date: {report.date}</p>
              <p
                className={`font-medium ${
                  report.status === "Completed" ? "text-green-400" : "text-yellow-400"
                }`}
              >
                Status: {report.status}
              </p>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
