const sendMsg = document.getElementById('btn');
const textarea = document.getElementById('textarea');

sendMsg.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent form submission

  if (textarea.value.trim() === '') {
    console.log('Fill the form');
  } else {
    alert('Thank you for contacting us. We will soon reach out to you.');
  }
});
