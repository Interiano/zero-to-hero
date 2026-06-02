const API_URL = 'https://mjrsupys38.execute-api.us-east-1.amazonaws.com/dev/habits';

const form = document.getElementById('habitForm');
const message = document.getElementById('message');
const loadBtn = document.getElementById('loadHabits');
const habitsList = document.getElementById('habits');

function showMessage(text, type) {
  message.textContent = text;
  message.className = type;
  setTimeout(function() {
    message.textContent = '';
    message.className = '';
  }, 3000);
}

function renderHabits(habits, userId) {
  habitsList.innerHTML = '';
  if (habits.length === 0) {
    habitsList.innerHTML = '<div class="empty-state">No habits yet. Create your first one above.</div>';
    return;
  }
  habits.forEach(function(habit) {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="habit-info">
        <span class="habit-name">${habit.habitName}</span>
        <span class="habit-freq">${habit.frequency}</span>
      </div>
      <button class="btn-delete">Delete</button>
    `;
    li.querySelector('.btn-delete').onclick = function() {
      deleteHabit(userId, habit.habitDate);
    };
    habitsList.appendChild(li);
  });
}

form.addEventListener('submit', async function(event) {
  event.preventDefault();
  const userId = document.getElementById('userId').value;
  const habitName = document.getElementById('habitName').value;
  const frequency = document.getElementById('frequency').value;
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, habitName, frequency })
    });
    const data = await response.json();
    if (response.ok) {
      showMessage('Habit created successfully!', 'success');
      form.reset();
    } else {
      showMessage('Error: ' + JSON.stringify(data), 'error');
    }
  } catch (error) {
    showMessage('Network error. Please try again.', 'error');
  }
});

loadBtn.addEventListener('click', async function() {
  const userId = document.getElementById('userId').value;
  if (!userId) {
    showMessage('Enter your User ID first.', 'error');
    return;
  }
  try {
    const response = await fetch(API_URL + '?userId=' + userId, { method: 'GET' });
    const habits = await response.json();
    renderHabits(habits, userId);
  } catch (error) {
    showMessage('Could not load habits.', 'error');
  }
});

async function deleteHabit(userId, habitDate) {
  try {
    const response = await fetch(API_URL, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, habitDate })
    });
    if (response.ok) {
      showMessage('Habit deleted.', 'success');
      const getResponse = await fetch(API_URL + '?userId=' + userId, { method: 'GET' });
      const habits = await getResponse.json();
      renderHabits(habits, userId);
    }
  } catch (error) {
    showMessage('Could not delete habit.', 'error');
  }
}
