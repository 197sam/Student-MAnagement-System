var count = localStorage.getItem('count') ? parseInt(localStorage.getItem('count')) : 0;
var students = JSON.parse(localStorage.getItem('students')) || [];
var global_id;

function isDuplicate(email) {
    return students.some(student => student.email.toLowerCase() === email.toLowerCase());
}

function addStudent() {
    const nameValue = document.getElementById('name').value;
    const emailValue = document.getElementById('email').value;
    const ageValue = document.getElementById('age').value;
    const gradeValue = document.getElementById('grade').value;
    const degreeValue = document.getElementById('degree').value;

    if (document.querySelector("#submit").innerText == "Edit Student") {
        let index;

        for (let i = 0; i < students.length; i++) {
            if (students[i]['ID'] == global_id) {
                index = i;
                break;
            }
        }

        let studentObj = students[index];
        studentObj['name'] = nameValue;
        studentObj['email'] = emailValue;
        studentObj['grade'] = gradeValue;
        studentObj['age'] = ageValue;
        studentObj['degree'] = degreeValue;

        students[index] = studentObj;
        localStorage.setItem('students', JSON.stringify(students));
        showTable();
        document.querySelector("#submit").innerHTML = "Add Student";

        document.getElementById('name').value = "";
        document.getElementById('email').value = "";
        document.getElementById('age').value = "";
        document.getElementById('grade').value = "";
        document.getElementById('degree').value = "";

        return;
    }
    
    if (nameValue == '' || emailValue == '' || ageValue == '' || gradeValue == '' || degreeValue == "") {
        alert("All fields are required!");
        return;
    }
    
    if (isDuplicate(emailValue)) {
        alert("A student with this email already exists!");
        return;
    }

    count = students.length + 1;  // Ensure ID count matches the number of students
    students.push({
        ID: count,
        name: nameValue,
        email: emailValue,
        age: ageValue,
        grade: gradeValue,
        degree: degreeValue
    });

    localStorage.setItem('students', JSON.stringify(students));

    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('age').value = "";
    document.getElementById('grade').value = "";
    document.getElementById('degree').value = "";
    showTable();
}

function showTable() {
    const table = document.getElementById('tbody');
    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }

    students.forEach((student, index) => {
        student.ID = index + 1;  // Ensure IDs are in sequential order in the display
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.ID}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.age}</td>
            <td>${student.grade}</td>
            <td><div class='degree'><div>${student.degree}</div>
                <div class="icons">
                    <a onClick="edit(${student.ID})" class='fa'>&#xf044;</a>
                    <a onClick="del(${student.ID})" class='fa'>&#xf1f8;</a>
                </div>
            </div></td>
        `;

        table.appendChild(row);
    });
}

function search() {
    var input, filter, table, tr, td, i, txtValue, txtValue1, txtValue2;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("tbody");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        td1 = tr[i].getElementsByTagName("td")[2];
        td2 = tr[i].getElementsByTagName("td")[5];
        if (td || td1 || td2) {
            txtValue = td.textContent || td.innerText;
            txtValue1 = td1.textContent || td1.innerText;
            txtValue2 = td2.textContent || td2.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue1.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function edit(id) {
    let student;
    for (let i = 0; i < students.length; i++) {
        if (students[i]['ID'] == id) {
            student = students[i];
            break;
        }
    }

    document.querySelector("#name").value = student['name'];
    document.querySelector("#email").value = student['email'];
    document.querySelector("#grade").value = student['grade'];
    document.querySelector("#age").value = student['age'];
    document.querySelector("#degree").value = student['degree'];

    document.getElementById("submit").innerText = "Edit Student";

    global_id = id;
}

function del(id) {
    students = students.filter(student => student.ID !== id); // Remove the student
    localStorage.setItem('students', JSON.stringify(students));
    showTable();
}

// Initial load
showTable();
