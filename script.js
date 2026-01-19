const BASE_URL = "https://student-rank-backend-1.onrender.com";

function showTab(tabId, element) {
    document.getElementById("rankTab").classList.add("hidden");
    document.getElementById("branchTab").classList.add("hidden");

    document.querySelectorAll(".tab").forEach(tab => {
        tab.classList.remove("active");
    });

    document.getElementById(tabId).classList.remove("hidden");
    element.classList.add("active");
}

/* Get My Rank */
async function getMyRank() {
    const rollNo = document.getElementById("rollInput").value.trim();
    const resultDiv = document.getElementById("rankResult");

    if (!rollNo) {
        resultDiv.innerHTML = "<p class='error'>Please enter roll number</p>";
        return;
    }

    resultDiv.innerHTML = "<p class='loading'>Loading...</p>";

    try {
        const response = await fetch(`${BASE_URL}/user/rank/${rollNo}`);
        if (!response.ok) throw new Error("Invalid roll number");

        const data = await response.json();

        resultDiv.innerHTML = `
            <table>
                <tr><th>Name</th><td>${data.name}</td></tr>
                <tr><th>Branch</th><td>${data.branch}</td></tr>
                <tr><th>SGPA</th><td>${data.sgpa}</td></tr>
                <tr><th>Overall Rank</th><td>${data.rank}</td></tr>
                <tr><th>Branch Rank</th><td>${data.branch_rank}</td></tr>
            </table>
        `;
    } catch (error) {
        resultDiv.innerHTML = `<p class='error'>${error.message}</p>`;
    }
}

/* Branch Rank List */
async function getBranchRanks() {
    const branch = document.getElementById("branchInput").value;
    const resultDiv = document.getElementById("branchResult");

    if (!branch) {
        resultDiv.innerHTML = "<p class='error'>Please select a branch</p>";
        return;
    }

    resultDiv.innerHTML = "<p class='loading'>Loading...</p>";

    try {
        const response = await fetch(`${BASE_URL}/branch/${branch}`);
        if (!response.ok) throw new Error("Branch not found");

        const data = await response.json();

        let rows = data.map(student => `
            <tr>
                <td>${student.roll_no}</td>
                <td>${student.name}</td>
                <td>${student.sgpa}</td>
                <td>${student.rank}</td>
                <td>${student.branch_rank}</td>
            </tr>
        `).join("");

        resultDiv.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Roll No</th>
                        <th>Name</th>
                        <th>SGPA</th>
                        <th>Overall Rank</th>
                        <th>Branch Rank</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        `;
    } catch (error) {
        resultDiv.innerHTML = `<p class='error'>${error.message}</p>`;
    }
}

