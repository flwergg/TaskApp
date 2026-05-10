function login() {
  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    })
  })
  .then(res => res.json())
  .then(() => {
    document.getElementById('login').style.display = 'none';
    document.getElementById('tasks').style.display = 'block';
    loadTasks();
  });
}

function createTask() {
  const title = document.getElementById('taskTitle').value;

  fetch('/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  })
  .then(() => loadTasks());
}

function loadTasks() {
  fetch('/tasks')
    .then(res => res.json())
    .then(tasks => {
      const list = document.getElementById('taskList');
      list.innerHTML = '';
      tasks.forEach(t => {
        const li = document.createElement('li');
        li.textContent = t;
        list.appendChild(li);
      });
    });
}