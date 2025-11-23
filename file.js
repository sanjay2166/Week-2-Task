
    const taskInput = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks() {
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        li.innerHTML = `
          <span>${task.text}</span>
          <div class="btns">
            <button class="completeBtn">✔</button>
            <button class="deleteBtn">✖</button>
          </div>
        `;

        li.querySelector(".completeBtn").addEventListener("click", () => {
          tasks[index].completed = !tasks[index].completed;
          saveTasks();
          renderTasks();
        });

        li.querySelector(".deleteBtn").addEventListener("click", () => {
          tasks.splice(index, 1);
          saveTasks();
          renderTasks();
        });

        taskList.appendChild(li);
      });
    }

    addBtn.addEventListener("click", () => {
      const text = taskInput.value.trim();
      if (text === "") return alert("Please enter a task!");

      tasks.push({ text, completed: false });
      saveTasks();
      renderTasks();

      taskInput.value = "";
    });

    renderTasks();
