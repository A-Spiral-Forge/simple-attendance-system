function AttendanceForm(setStudents) {
    const [attendance, setAttendance] = useState({
        name: '',
        enrollmentNumber: '',
        checkInTime: '',
        checkOutTime: '',
        presentNow: ''
    });

    const handleChanges = e => {
        setAttendance({ ...attendance, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = e => {
        e.preventDefault();

        // check of check in time is less than check out time
        if (attendance.checkInTime > attendance.checkOutTime) {
            alert('Check-in time cannot be greater than check-out time');
            return;
        }

        // check if student is present now
        const checkInTime = new Date();
        checkInTime.setHours(attendance.checkInTime.split(':')[0]);
        checkInTime.setMinutes(attendance.checkInTime.split(':')[1]);
        checkInTime.setSeconds(0);
        const checkOutTime = new Date();
        checkOutTime.setHours(attendance.checkOutTime.split(':')[0]);
        checkOutTime.setMinutes(attendance.checkOutTime.split(':')[1]);
        checkOutTime.setSeconds(0);
        const currentTime = new Date();
        currentTime.setSeconds(0);
        if (currentTime >= checkInTime && currentTime <= checkOutTime) {
            attendance.presentNow = 'Yes';
        } else {
            attendance.presentNow = 'No';
        }

        // clear all the fields
        setAttendance({
            name: '',
            enrollmentNumber: '',
            checkInTime: '',
            checkOutTime: '',
            presentNow: ''
        });

        // add student to the list
        setStudents(students => [...students, attendance]);
    };
    
    return (
        <div>
            <form className="attendance-form" onSubmit={handleSubmit}>
                <div className="form-element">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={attendance.name}
                        onChange={handleChanges}
                        required={true}
                    />
                </div>
                <div className="form-element">
                    <label htmlFor="enrollmentNumber">Enrollment Number</label>
                    <input
                        type="text"
                        name="enrollmentNumber"
                        value={attendance.enrollmentNumber}
                        onChange={handleChanges}
                        required={true}
                    />
                </div>
                <div className="form-element">
                    <label htmlFor="checkInTime">Check-in Time</label>
                    <input
                        type="time"
                        name="checkInTime"
                        value={attendance.checkInTime}
                        onChange={handleChanges}
                        required={true}
                    />
                </div>
                <div className="form-element">
                    <label htmlFor="checkOutTime">Check-out Time</label>
                    <input
                        type="time"
                        name="checkOutTime"
                        value={attendance.checkOutTime}
                        onChange={handleChanges}
                        required={true}
                    />
                </div>
                <div className="form-element">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};