import { useState, useEffect } from "react";

function TeacherDashboard() {
  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const fetchAssignments = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/assignments");
      const data = await res.json();
      setAssignments(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addAssignment = async () => {
    if (!title || !description || !dueDate) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/assignments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, dueDate }),
      });

      if (res.ok) {
        setTitle("");
        setDescription("");
        setDueDate("");
        fetchAssignments();
      } else {
        alert("Failed to add assignment");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div style={{ margin: "50px" }}>
      <h2>Teacher Dashboard</h2>

      <h3>Add Assignment</h3>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /><br /><br />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /><br /><br />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      /><br /><br />
      <button onClick={addAssignment}>Add Assignment</button>

      <h3>All Assignments</h3>
      <ul>
        {assignments.map((a) => (
          <li key={a._id}>
            {a.title} - {a.description} - Due: {a.dueDate}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeacherDashboard;
