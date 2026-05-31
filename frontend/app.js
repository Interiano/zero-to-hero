const API_URL = 'https://mjrsupys38.execute-api.us-east-1.amazonaws.com/dev/habits';

const form = document.getElementById('habitForm');
const message = document.getElementById('message');

form.addEventListener('submit', async function(event) {
  event.preventDefault();

  const userId = document.getElementById('userId').value;
  const habitName = document.getElementById('habitName').value;
  const frequency = document.getElementById('frequency').value;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
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
