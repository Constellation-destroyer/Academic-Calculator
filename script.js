document.addEventListener("DOMContentLoaded", () => {
    // Navigation
    const cards = document.querySelectorAll(".card");
    const pages = document.querySelectorAll(".page");
    const backButtons = document.querySelectorAll(".back-btn");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            const targetId = card.dataset.target;
            pages.forEach(page => page.classList.remove("active"));
            document.getElementById(targetId).classList.add("active");
        });
    });

    backButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            pages.forEach(page => page.classList.remove("active"));
            document.getElementById("home-page").classList.add("active");
        });
    });

    // GPA Calculator
    const gpaSubjects = document.getElementById("gpa-subjects");
    const addSubjectBtn = document.getElementById("add-subject");
    const calculateGpaBtn = document.getElementById("calculate-gpa");
    const resetGpaBtn = document.getElementById("reset-gpa");

    addSubjectBtn.addEventListener("click", () => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>Subject</td>
            <td><input type="number" min="0" step="0.5" placeholder="0" class="credits"></td>
            <td><input type="number" min="0" max="100" placeholder="0" class="marks"></td>
            <td><button class="remove-btn">Remove</button></td>
        `;
        gpaSubjects.appendChild(row);

        row.querySelector(".remove-btn").addEventListener("click", () => {
            gpaSubjects.removeChild(row);
        });
    });

    calculateGpaBtn.addEventListener("click", () => {
        const creditInputs = document.querySelectorAll(".credits");
        const markInputs = document.querySelectorAll(".marks");

        let totalCredits = 0;
        let totalPoints = 0;

        for (let i = 0; i < creditInputs.length; i++) {
            const credits = parseFloat(creditInputs[i].value);
            const marks = parseFloat(markInputs[i].value);

            if (!isNaN(credits) && !isNaN(marks)) {
                const gradePoint = marksToGpa(marks);
                totalCredits += credits;
                totalPoints += gradePoint * credits;
            }
        }

        const finalGpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : "0.00";
        document.getElementById("total-credits").textContent = totalCredits.toFixed(2);
        document.getElementById("total-points").textContent = totalPoints.toFixed(2);
        document.getElementById("final-gpa").textContent = finalGpa;
    });

    resetGpaBtn.addEventListener("click", () => {
        gpaSubjects.innerHTML = `
            <tr>
                <td>Subject 1</td>
                <td><input type="number" min="0" step="0.5" placeholder="0" class="credits"></td>
                <td><input type="number" min="0" max="100" placeholder="0" class="marks"></td>
                <td><button class="remove-btn">Remove</button></td>
            </tr>
        `;

        gpaSubjects.querySelector(".remove-btn").addEventListener("click", (e) => {
            const row = e.target.closest("tr");
            if (row) gpaSubjects.removeChild(row);
        });

        document.getElementById("total-credits").textContent = "0";
        document.getElementById("total-points").textContent = "0";
        document.getElementById("final-gpa").textContent = "0.00";
    });

function marksToGpa(marks) {
    if (marks >= 93) return 10;     // A+
    if (marks >= 85) return 9;      // A
    if (marks >= 77) return 8;      // B+
    if (marks >= 69) return 7;      // B
    if (marks >= 61) return 6;      // C+
    if (marks >= 53) return 5;      // C
    if (marks >= 45) return 4;      // D
    return 0;                       // F
}

    // MARKS PREDICTOR
    const predictBtn = document.getElementById("predict-marks");
    const resetBtn = document.getElementById("reset-predictor");

    predictBtn.addEventListener("click", () => {
        const currentMarksInput = document.getElementById("current-marks");
        const desiredGradeSelect = document.getElementById("desired-grade");
        const resultCurrentMarks = document.getElementById("result-current-marks");
        const resultDesiredGrade = document.getElementById("result-desired-grade");
        const requiredMarksOutput = document.getElementById("required-marks");
        const feasibilityMessage = document.getElementById("feasibility-message");

        const currentMarks = parseFloat(currentMarksInput.value);
        const desiredGrade = desiredGradeSelect.value;

        if (isNaN(currentMarks) || currentMarks < 0 || currentMarks > 40) {
            alert("Please enter valid current marks between 0 and 40.");
            return;
        }

        const gradeThresholds = {
            "A+": 93,
            "A": 85,
            "B+": 77,
            "B": 69,
            "C+": 61,
            "C": 53,
            "D": 45,
            "F": 0
        };

        const requiredTotal = gradeThresholds[desiredGrade];
        const requiredMarksOutOf60 = requiredTotal - currentMarks;

        resultCurrentMarks.textContent = currentMarks;
        resultDesiredGrade.textContent = desiredGrade;

        if (requiredMarksOutOf60 > 60) {
            requiredMarksOutput.textContent = "Not possible";
            feasibilityMessage.textContent = "Unfortunately, it’s not possible to achieve this grade.";
            feasibilityMessage.style.color = "red";
        } else if (requiredMarksOutOf60 <= 0) {
            requiredMarksOutput.textContent = "0 (Already achieved)";
            feasibilityMessage.textContent = "Congratulations! You’ve already secured this grade.";
            feasibilityMessage.style.color = "green";
        } else {
            requiredMarksOutput.textContent = requiredMarksOutOf60.toFixed(2);
            feasibilityMessage.textContent = `You need ${requiredMarksOutOf60.toFixed(2)} out of 60 in your final to achieve a ${desiredGrade}.`;
            feasibilityMessage.style.color = "blue";
        }
    });

    resetBtn.addEventListener("click", () => {
        document.getElementById("current-marks").value = "";
        document.getElementById("desired-grade").selectedIndex = 0;
        document.getElementById("result-current-marks").textContent = "0";
        document.getElementById("result-desired-grade").textContent = "-";
        document.getElementById("required-marks").textContent = "0";
        document.getElementById("feasibility-message").textContent = "";
    });
});
