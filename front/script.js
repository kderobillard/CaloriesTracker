const form = document.getElementById("food-form");
const summaryDiv = document.getElementById("summary");
const summaryBtn = document.getElementById("get-summary");

const API_URL = "http://127.0.0.1:8000/foods";

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        calories: parseFloat(document.getElementById("calories").value),
        protein: parseFloat(document.getElementById("protein").value),
        carbs: parseFloat(document.getElementById("carbs").value),
        fat: parseFloat(document.getElementById("fat").value),
        quantity: parseFloat(document.getElementById("quantity").value)
    };

    const res = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        alert("Food added !");
        form.reset();
    } else {
        alert("Error occured while adding !");
    }
});

summaryBtn.addEventListener("click", async () => {
    const res = await fetch(`${API_URL}/daily-summary`);
    const data = await res.json();

    summaryDiv.innerHTML = `
        <p>Total calories : ${data.total_calories.toFixed(2)}</p>
        <p>Total protein: ${data.total_protein.toFixed(2)}</p>
        <p>Total carbs : ${data.total_carbs.toFixed(2)}</p>
        <p>Total fat : ${data.total_fat.toFixed(2)}</p> `;
});
