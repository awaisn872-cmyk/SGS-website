let students = JSON.parse(localStorage.getItem("students")) || [];

function addStudent() {
    let student = {
        id: document.getElementById("id").value,
        name: document.getElementById("name").value,
        marks: [
            +m1.value, +m2.value, +m3.value, +m4.value, +m5.value
        ],
        gpa: 0,
        grade: "-"
    };

    students.push(student);
    save();
    display();
}

function calculateGPA(marks) {
    let avg = marks.reduce((a, b) => a + b, 0) / marks.length;

    if (avg >= 85) return 4.0;
    if (avg >= 70) return 3.0;
    if (avg >= 60) return 2.0;
    if (avg >= 50) return 1.0;
    return 0.0;
}

function assignGrade(gpa) {
    if (gpa === 4.0) return "A";
    if (gpa === 3.0) return "B";
    if (gpa === 2.0) return "C";
    if (gpa === 1.0) return "D";
    return "F";
}

function calculateAll() {
    students.forEach(s => {
        s.gpa = calculateGPA(s.marks);
        s.grade = assignGrade(s.gpa);
    });
    save();
    display();
}

function sortByGPA() {
    students.sort((a, b) => b.gpa - a.gpa);
    display();
}

function display() {
    let table = document.getElementById("studentTable");
    table.innerHTML = "";

    students.forEach(s => {
        table.innerHTML += `
            <tr>
                <td>${s.id}</td>
                <td>${s.name}</td>
                <td>${s.gpa}</td>
                <td>${s.grade}</td>
            </tr>
        `;
    });
}

function generateReport() {
    let pass = students.filter(s => s.gpa > 0).length;
    let fail = students.length - pass;

    let text = "===== TOPPERS =====\n";
    students.slice(0, 3).forEach(s => {
        text += `${s.name} - GPA: ${s.gpa}\n`;
    });

    text += `\nPass: ${pass}\nFail: ${fail}`;
    document.getElementById("report").textContent = text;
}

function save() {
    localStorage.setItem("students", JSON.stringify(students));
}

display();
