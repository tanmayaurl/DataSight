import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LogOut, Bell, User, Activity } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "User" });
  const [recentActivities, setRecentActivities] = useState([]);

  // Simulate fetching user + activity data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");

    // mock data
    setUser({ name: "Babe" });
    setRecentActivities([
      { id: 1, action: "Joined SmartMeet Scheduler", time: "2 mins ago" },
      { id: 2, action: "Scheduled a meeting with HR", time: "15 mins ago" },
      { id: 3, action: "Updated profile details", time: "30 mins ago" },
      { id: 4, action: "Checked analytics dashboard", time: "1 hr ago" },
    ]);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-gray-700 bg-gray-800/40 backdrop-blur-sm sticky top-0 z-10">
        <h1 className="text-2xl font-semibold tracking-wide">
          SmartMeet <span className="text-indigo-400">Dashboard</span>
        </h1>
        <div className="flex items-center gap-5">
          <Bell className="hover:text-indigo-400 cursor-pointer transition" />
          <User className="hover:text-indigo-400 cursor-pointer transition" />
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition font-medium"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="px-8 py-10">
        {/* Welcome Section */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {user.name}! 👋</h2>
          <p className="text-gray-400">
            Here’s what’s happening with your account today.
          </p>
        </section>

        {/* Stat Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { title: "Meetings Today", value: 3 },
            { title: "Pending Requests", value: 5 },
            { title: "Tasks Completed", value: 12 },
            { title: "Team Members", value: 8 },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-gray-800/70 hover:bg-gray-800 transition-all rounded-2xl p-6 shadow-lg"
            >
              <p className="text-gray-400">{card.title}</p>
              <h3 className="text-3xl font-semibold mt-2 text-indigo-400">
                {card.value}
              </h3>
            </div>
          ))}
        </section>

        {/* Recent Activities */}
        <section>
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Activity className="text-indigo-400" /> Recent Activities
          </h3>
          <div className="bg-gray-800/70 rounded-2xl p-6 shadow-md">
            {recentActivities.length > 0 ? (
              <ul className="space-y-3">
                {recentActivities.map((act) => (
                  <li
                    key={act.id}
                    className="flex items-center justify-between border-b border-gray-700/60 pb-3 last:border-0"
                  >
                    <span>{act.action}</span>
                    <span className="text-gray-400 text-sm">{act.time}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center">No recent activity.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
