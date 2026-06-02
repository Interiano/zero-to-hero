const API_URL = 'https://mjrsupys38.execute-api.us-east-1.amazonaws.com/dev/habits';

const form = document.getElementById('habitForm');
const message = document.getElementById('message');
const loadBtn = document.getElementById('loadHabits');
const habitsList = document.getElementById('habits');

// CREATE HABIT
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
      message.textContent = 'Habit created successfully!';
      message.className = 'success';
      form.reset();
    } else {
      message.textContent = 'Error: ' + JSON.stringify(data);
      message.className = 'error';
    }
  } catch (error) {
    message.textContent = 'Network error. Please try again.';
    message.className = 'error';
  }
});

// READ HABITS
loadBtn.addEventListener('click', async function() {
  const userId = document.getElementById('userId').value;

  if (!userId) {
    message.textContent = 'Enter your User ID first.';
    message.className = 'error';
    return;
  }

  try {
    const response = await fetch(API_URL + '?userId=' + userId, {
      method: 'GET'
    });

    const habits = await response.json();
    habitsList.innerHTML = '';

    habits.forEach(function(habit) {
      const li = document.createElement('li');
      li.textContent = habit.habitName + ' (' + habit.frequency + ')';

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.onclick = function() { deleteHabit(userId, habit.habitDate); };

      li.appendChild(deleteBtn);
      habitsList.appendChild(li);
    });
  } catch (error) {
    message.textContent = 'Could not load habits.';
    message.className = 'error';
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
      message.textContent = 'Habit deleted.';
      message.className = 'success';
      
      // Directly refresh the list
      const getResponse = await fetch(API_URL + '?userId=' + userId, {
        method: 'GET'
      });
      const habits = await getResponse.json();
      habitsList.innerHTML = '';
      habits.forEach(function(habit) {
        const li = document.createElement('li');
        li.textContent = habit.habitName + ' (' + habit.frequency + ')';
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = function() { deleteHabit(userId, habit.habitDate); };
        li.appendChild(deleteBtn);
        habitsList.appendChild(li);
      });
    }
  } catch (error) {
    message.textContent = 'Could not delete habit.';
    message.className = 'error';
  }
}
