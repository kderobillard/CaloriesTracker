const form = document.getElementById("food-form");
const summaryDiv = document.getElementById("summary");
const summaryBtn = document.getElementById("get-summary");
const summaryClear = document.getElementById("clear-summary");
const foodList = document.getElementById("foods-list");
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
        loadFood();
    } else {
        alert("Error occured while adding !");
    }
});

summaryBtn.addEventListener("click", async () => {
    const res = await fetch(`${API_URL}/daily-summary`);
    const data = await res.json();
    loadFood();
    summaryDiv.innerHTML = `
        <p>Total calories : ${data.total_calories}</p>
        <p>Total protein: ${data.total_protein}</p>
        <p>Total carbs : ${data.total_carbs}</p>
        <p>Total fat : ${data.total_fat}</p> `;
});

summaryClear.addEventListener("click", async () => {
    if (!confirm("Delete all of today's food ?")) {
        return;
    }
    await fetch(`${API_URL}/clear-summary`, { method: "DELETE" });
    loadFood();
    summaryDiv.innerHTML = "";
});


async function loadFood() {
    const res = await fetch(API_URL);
    const foods = await res.json();
    foodList.innerHTML = "";
    foods.forEach(food => {
        const li = document.createElement("li");
        li.className = "flex justify-between bg-gray-100 p-2 rounded";
        li.innerHTML = `
            <span>${food.name} - ${food.calories} kcal</span>
            <button class="text-red-500" onclick="deleteFood(${food.id})">
                X
            </button> `;
        foodList.appendChild(li);
    });
}

async function deleteFood(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
    loadFood();
}