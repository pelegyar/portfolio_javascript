function addTask() {
    const taskInput = document.getElementById("taskInput");
    const dateInput = document.getElementById("taskDate");

    const taskText = taskInput.value.trim();
    const taskDate = dateInput.value;

    if (taskText === "") return;

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    const leftDiv = document.createElement("div");
    leftDiv.className = "d-flex align-items-center";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-check-input me-2";
    checkbox.onchange = () => {
        span.classList.toggle("completed");
    };

    const span = document.createElement("span");
    span.textContent = taskText;

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(span);

    const rightDiv = document.createElement("div");
    rightDiv.className = "text-end";

    if (taskDate) {
        const dateSpan = document.createElement("div");
        dateSpan.className = "date-text";
        dateSpan.textContent = `Due: ${taskDate}`;
        rightDiv.appendChild(dateSpan);
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm mt-1";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => li.remove();

    rightDiv.appendChild(deleteBtn);

    li.appendChild(leftDiv);
    li.appendChild(rightDiv);

    document.getElementById("taskList").appendChild(li);
    taskInput.value = "";
    dateInput.value = "";
}
