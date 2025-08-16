// Sample student data is already in localStorage from previous code

// Handle student login
function handleStudentLogin(event) {
    event.preventDefault();
    const emailInput = document.getElementById('student-email').value;
    const errorMessage = document.getElementById('error-message');
    const students = JSON.parse(localStorage.getItem('students'));

    const student = students.find(s => s.email.toLowerCase() === emailInput.toLowerCase());

    if (student) {
        // Hide login form and display student list
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('student-list-container').style.display = 'block';
        displayStudentList(students);
    } else {
        errorMessage.textContent = "Student not found!";
    }
}

// Display the student list in a table
function displayStudentList(students) {
    const studentListBody = document.getElementById('student-list-body');
    studentListBody.innerHTML = ""; // Clear existing data

    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.ID}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.age}</td>
            <td>${student.grade}</td>
            <td>${student.degree}</td>
        `;
        studentListBody.appendChild(row);
    });
}

// Logout function to go back to login page
function logout() {
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('student-list-container').style.display = 'none';
}
