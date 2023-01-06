const App = () => {
    const [students, setStudents] = React.useState([]);

    const handleRefreshPresentStatus = () => {
        const currentTime = new Date();
        const updatedStudents = students.map(student => {
            const checkInTime = new Date();
            checkInTime.setHours(student.checkInTime.split(':')[0]);
            checkInTime.setMinutes(student.checkInTime.split(':')[1]);
            checkInTime.setSeconds(0);
            const checkOutTime = new Date();
            checkOutTime.setHours(student.checkOutTime.split(':')[0]);
            checkOutTime.setMinutes(student.checkOutTime.split(':')[1]);
            checkOutTime.setSeconds(0);
            const currentTime = new Date();
            if (currentTime >= checkInTime && currentTime <= checkOutTime) {
                student.presentNow = 'Yes';
            } else {
                student.presentNow = 'No';
            }
            return student;
        });
        setStudents(updatedStudents);
    }

    return (
        <div className="container">
            <h1>React Attendance System</h1>
            <h2>Attendance Form</h2>
            {AttendanceForm(setStudents)}

            <h2>Attendance Table</h2>
            <div className="attendance-summary">
                <p>Total Students: {students.length}</p>
                <p className="refresh-button" onClick={handleRefreshPresentStatus}>Refresh Present Status</p>
                <p>Present Students: {students.filter(student => student.presentNow === 'Yes').length}</p>
            </div>
            <table className="attendance-table">
                <thead className="table-header">
                    <tr>
                        <th>Name</th>
                        <th>Enrollment Number</th>
                        <th>Check-in Time</th>
                        <th>Check-out Time</th>
                        <th>Present Now</th>
                    </tr>
                </thead>
                <tbody className="table-body">
                    {students.map((student, index) => {
                        return (
                            <tr key={index}>
                                <td>{student.name}</td>
                                <td>{student.enrollmentNumber}</td>
                                <td>{student.checkInTime}</td>
                                <td>{student.checkOutTime}</td>
                                <td>{student.presentNow}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);