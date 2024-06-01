document.getElementById('send-button').addEventListener('click', async function() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    // Display user's message
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerHTML = '<span class="name">User:</span> ' + userInput;
    document.getElementById('chat-output').appendChild(userMessage);

    // Clear input field
    document.getElementById('user-input').value = '';

    // Scroll to the bottom of the chat output
    document.getElementById('chat-output').scrollTop = document.getElementById('chat-output').scrollHeight;

    // Send user's message to the server and get bot response
    try {
        const response = await fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot-message';
        botMessage.innerHTML = '<span class="name">Bot:</span> ' + data.message;
        document.getElementById('chat-output').appendChild(botMessage);

        // Scroll to the bottom of the chat output
        document.getElementById('chat-output').scrollTop = document.getElementById('chat-output').scrollHeight;
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('send-button').click();
    }
});
