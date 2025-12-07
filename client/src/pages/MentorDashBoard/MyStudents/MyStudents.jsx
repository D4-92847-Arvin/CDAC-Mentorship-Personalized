import "./MyStudents.css";
import StudentCard from "../../../components/MentorComponents/StudentCard/StudentCard";

const students = [
  { name: "Alex Thompson", sessions: 12, progress: 85, next: "Oct 8, 2:00 PM" },
  { name: "Emma Wilson", sessions: 8, progress: 72, next: "Oct 9, 3:30 PM" },
  { name: "Michael Chen", sessions: 15, progress: 91, next: "Oct 10, 1:00 PM" }
];

function MyStudents() {
  return (
    <div className="my-students-page">
      <div className="page-header">
        <h1 className="page-title">My Students</h1>
        <p className="page-subtitle">View and manage your assigned students</p>
      </div>
      
      <div className="row">
        {students.map(s => <StudentCard key={s.name} data={s} />)}
      </div>
    </div>
  );
}

export default MyStudents;
