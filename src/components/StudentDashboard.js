import { useState, useEffect } from "react";

// Replace this with the logged-in student's email
const studentEmail = "aravindkumar06062006@gmail.com";

function StudentDashboard() {
  const [assignments, setAssignments] = useState([]);

  // Fetch assignments from backend
  const fetchAssignments = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/assignments");
      const data = await res.json();

      // Ensure completedBy array exists
      const safeData = data.map(a => ({
        ...a,
        completedBy: a.completedBy || []
      }));

      setAssignments(safeData);
    } catch (err) {
      console.error("Error fetching assignments:", err);
    }
  };

  // Toggle Complete / Undo
  const toggleComplete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/assignments/${id}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: studentEmail }),
      });

      if (res.ok) {
        fetchAssignments(); // Refresh assignments
      } else {
        console.error("Failed to update assignment");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Dashboard</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {assignments.map((a) => (
          <li key={a._id} style={{ marginBottom: "10px" }}>
            {/* Assignment details */}
            <span
              style={{
                textDecoration: a.completedBy.includes(studentEmail) ? "line-through" : "none",
                marginRight: "10px",
              }}
            >
              {a.title} - {a.description} - Due: {a.dueDate}
            </span>

            {/* Complete / Undo button */}
            <button onClick={() => toggleComplete(a._id)}>
              {a.completedBy.includes(studentEmail) ? "Undo" : "Complete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentDashboard;
