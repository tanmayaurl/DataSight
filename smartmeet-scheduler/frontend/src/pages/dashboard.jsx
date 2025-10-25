import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { AuroraTextDemo } from "../components/AuroraTextDemo";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Calendar,
  Clock,
  TrendingUp,
  MessageCircle,
  XCircle,
  PlusCircle,
  Video,
  ClipboardList,
  Bell,
  Trash2,
} from "lucide-react";

const Dashboard = () => {
  const [recentActivities, setRecentActivities] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingTime, setMeetingTime] = useState("");

  const [data, setData] = useState([
    { name: "Mon", tasks: 3 },
    { name: "Tue", tasks: 5 },
    { name: "Wed", tasks: 4 },
    { name: "Thu", tasks: 6 },
    { name: "Fri", tasks: 7 },
    { name: "Sat", tasks: 3 },
    { name: "Sun", tasks: 2 },
  ]);

  useEffect(() => {
    setRecentActivities([
      "Team sync meeting scheduled for 10:30 AM",
      "Project ‘AI Bridge’ marked ‘In Progress’",
      "New member ‘Arjun Mehta’ joined your workspace",
      "Client feedback received for Sprint 4",
    ]);

    setMeetings([
      { time: "10:30 AM", title: "Daily Standup", participants: "5" },
      { time: "12:00 PM", title: "Client Presentation", participants: "3" },
      { time: "3:00 PM", title: "Design Review", participants: "4" },
    ]);

    const interval = setInterval(() => {
      setData((prev) =>
        prev.map((d) => ({
          ...d,
          tasks: Math.max(2, Math.min(8, d.tasks + (Math.random() > 0.5 ? 1 : -1))),
        }))
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      title: "Meetings",
      value: meetings.length,
      subtitle: "Today’s total",
      icon: <Calendar className="text-indigo-400" />,
      color: "from-indigo-500 to-purple-600",
      data: meetings,
    },
    {
      title: "Tasks",
      value: `${tasks.length}`,
      subtitle: "Created tasks",
      icon: <TrendingUp className="text-green-400" />,
      color: "from-green-500 to-emerald-600",
      data: tasks,
    },
    {
      title: "Messages",
      value: "2",
      subtitle: "Unread chats",
      icon: <MessageCircle className="text-pink-400" />,
      color: "from-pink-500 to-fuchsia-600",
      data: ["New reply from client", "Team update on sprint goals"],
    },
    {
      title: "Hours",
      value: "6h 30m",
      subtitle: "Total today",
      icon: <Clock className="text-yellow-400" />,
      color: "from-yellow-500 to-amber-600",
      data: ["2h meetings", "4h development", "30m review"],
    },
  ];

  const quickActions = [
    { icon: <PlusCircle />, label: "Create Task", type: "task" },
    { icon: <Video />, label: "Schedule Meeting", type: "meeting" },
    { icon: <ClipboardList />, label: "View Reports", type: "report" },
    { icon: <Bell />, label: "Notifications", type: "notification" },
  ];

  const handleCreateTask = () => {
    if (!taskTitle.trim()) return;
    const newTask = { title: taskTitle, desc: taskDesc };
    setTasks((prev) => [...prev, newTask]);
    setRecentActivities((prev) => [`Task "${taskTitle}" created`, ...prev]);
    setTaskTitle("");
    setTaskDesc("");
    setSelectedAction(null);
  };

  const handleDeleteTask = (index) => {
    const deleted = tasks[index];
    setTasks((prev) => prev.filter((_, i) => i !== index));
    setRecentActivities((prev) => [`Task "${deleted.title}" deleted`, ...prev]);
  };

  const handleScheduleMeeting = () => {
    if (!meetingTitle.trim() || !meetingTime.trim()) return;
    const newMeeting = {
      title: meetingTitle,
      time: meetingTime,
      participants: Math.floor(Math.random() * 6) + 2,
    };
    setMeetings((prev) => [...prev, newMeeting]);
    setRecentActivities((prev) => [`Meeting "${meetingTitle}" scheduled`, ...prev]);
    setMeetingTitle("");
    setMeetingTime("");
    setSelectedAction(null);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] text-gray-100 overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[400px] h-[400px] bg-purple-600/20 blur-[150px] top-20 left-10 animate-pulse"></div>
        <div className="absolute w-[500px] h-[500px] bg-indigo-600/20 blur-[160px] bottom-10 right-10 animate-pulse"></div>
      </div>

      <Navbar />

      <div className="pt-28 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Glowing Title */}
        <div className="flex flex-col items-center justify-center mb-10">
          <AuroraTextDemo />
          <p className="text-gray-400 text-sm mt-3">
            Your AI-powered meeting scheduler and productivity assistant 🚀
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => setSelectedCard(card)}
              className={`cursor-pointer bg-gradient-to-br ${card.color} p-[1px] rounded-2xl hover:scale-105 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-transform`}
            >
              <div className="bg-[#0f172a]/90 backdrop-blur-xl rounded-2xl p-6 h-full flex flex-col justify-between shadow-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">{card.title}</h2>
                  {card.icon}
                </div>
                <div>
                  <p className="text-3xl font-bold mt-2">{card.value}</p>
                  <p className="text-gray-400 text-sm">{card.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chart & Meetings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-[#1e1b4b]/80 rounded-2xl p-8 border border-white/10 shadow-md hover:shadow-indigo-600/30 transition-all">
            <h2 className="text-xl font-semibold text-indigo-300 mb-4">
              Weekly Task Progress
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="tasks"
                  stroke="#818cf8"
                  strokeWidth={3}
                  dot={{ fill: "#a5b4fc", r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[#1e1b4b]/80 rounded-2xl p-8 border border-white/10 shadow-md hover:shadow-purple-600/30 transition-all">
            <h2 className="text-xl font-semibold text-indigo-300 mb-4">
              Upcoming Meetings
            </h2>
            <ul className="space-y-4">
              {meetings.map((meeting, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-[#312e81]/60 p-4 rounded-xl hover:bg-[#4338ca]/60 transition-all"
                >
                  <div>
                    <p className="font-semibold">{meeting.title}</p>
                    <p className="text-sm text-gray-400">
                      Participants: {meeting.participants}
                    </p>
                  </div>
                  <span className="text-indigo-300 font-semibold">
                    {meeting.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-[#1e1b4b]/80 rounded-2xl p-8 border border-white/10 shadow-md mb-10 hover:shadow-fuchsia-600/30 transition-all">
          <h2 className="text-2xl font-semibold text-indigo-300 mb-4">
            Recent Activities
          </h2>
          <ul className="space-y-3 text-gray-300">
            {recentActivities.map((activity, index) => (
              <li
                key={index}
                className="border-b border-white/10 pb-2 last:border-none hover:translate-x-1 transition-transform"
              >
                {activity}
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-20">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => setSelectedAction(action)}
              className="flex flex-col items-center bg-[#312e81]/80 p-5 rounded-2xl hover:bg-[#4338ca]/80 border border-white/10 shadow-md hover:shadow-indigo-500/30 transition-all"
            >
              <div className="text-indigo-300 mb-2">{action.icon}</div>
              <span className="text-gray-200 font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Modals */}
      {selectedAction && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1e1b4b]/95 p-8 rounded-2xl w-[400px] border border-white/10 shadow-2xl relative">
            <button
              onClick={() => setSelectedAction(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              <XCircle />
            </button>

            <h2 className="text-2xl font-bold text-indigo-300 mb-4">
              {selectedAction.label}
            </h2>

            {selectedAction.type === "task" && (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Task title"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full p-3 bg-[#312e81]/60 rounded-lg outline-none text-gray-200 placeholder-gray-400"
                />
                <textarea
                  placeholder="Description"
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                  className="w-full p-3 bg-[#312e81]/60 rounded-lg outline-none text-gray-200 placeholder-gray-400"
                ></textarea>
                <button
                  onClick={handleCreateTask}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg font-medium transition"
                >
                  Create Task
                </button>

                {tasks.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3 text-indigo-300">
                      Your Tasks
                    </h3>
                    <ul className="space-y-2">
                      {tasks.map((t, i) => (
                        <li
                          key={i}
                          className="flex justify-between items-center bg-[#312e81]/50 p-3 rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{t.title}</p>
                            <p className="text-sm text-gray-400">{t.desc}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteTask(i)}
                            className="text-red-400 hover:text-red-500"
                          >
                            <Trash2 size={18} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {selectedAction.type === "meeting" && (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Meeting title"
                  value={meetingTitle}
                  onChange={(e) => setMeetingTitle(e.target.value)}
                  className="w-full p-3 bg-[#312e81]/60 rounded-lg outline-none text-gray-200 placeholder-gray-400"
                />
                <input
                  type="time"
                  value={meetingTime}
                  onChange={(e) => setMeetingTime(e.target.value)}
                  className="w-full p-3 bg-[#312e81]/60 rounded-lg outline-none text-gray-200 placeholder-gray-400"
                />
                <button
                  onClick={handleScheduleMeeting}
                  className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg font-medium transition"
                >
                  Schedule
                </button>
              </div>
            )}

            {selectedAction.type === "report" && (
              <div className="text-gray-300">
                <h3 className="text-lg font-semibold mb-3 text-indigo-300">
                  Weekly Performance Snapshot
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>✅ Tasks completed: {tasks.length}</li>
                  <li>📅 Meetings scheduled: {meetings.length}</li>
                  <li>💬 Active discussions: 2</li>
                  <li>⚡ Productivity score: {(tasks.length * 10 + meetings.length * 5)}%</li>
                </ul>
              </div>
            )}

            {selectedAction.type === "notification" && (
              <ul className="space-y-2 text-gray-300">
                <li className="border-b border-gray-700 pb-2">You have 2 unread messages</li>
                <li className="border-b border-gray-700 pb-2">Team meeting starts in 30 mins</li>
                <li className="border-b border-gray-700 pb-2">New task assigned by Riya</li>
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
