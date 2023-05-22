const api='Enter-API-KEY-Here';
const url= 'https://api.openai.com/v1/chat/completions';

const form = document.querySelector('form');
const promptInput = document.querySelector('#prompt');
const chatLog = document.querySelector('.chat-log');

form.addEventListener('submit', e => {
    e.preventDefault();
    let value = promptInput.value;
    if (value !== '') {
        createMessageInstance(value);
        askChatGPT(value);
        handleScroll();
        promptInput.value = '';
    }
});


function createMessageInstance(prompt) {

    console.log(prompt);
    chatLog.innerHTML +=
    `
    <div class="message-instance-container">
        <div class="message user-message">
            <div class="content">
                <div class="message-image"></div>
                <p>${prompt}</p>
            </div>
        </div>
        <div class="message ai-message">
            <div class="content">
                <div class="message-image">     
                    <img src="./images/ss-icon.png" alt="Seminole State Icon">                         
                </div>
                <p class="thinking">Thinking...</p>
            </div>
        </div>
    </div>
    
    `
}

function askChatGPT(prompt) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${api}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: 200,
        })
    })
    .then(res => res.json())
    .then(data => updateMessage(data))
}

function handleScroll() {
    chatLog.scrollTop = chatLog.scrollHeight;
}

function updateMessage(message) {
    const p = document.querySelector('.thinking');
    console.log(message);
    p.textContent = message.choices[0].message.content;
    p.classList.remove('thinking');
    handleScroll();
}