const form = document.querySelector('#chatForm');
const input = document.querySelector('#messageInput');
const messages = document.querySelector('#messages');
const promptGrid = document.querySelector('#promptGrid');
const welcomeBlock = document.querySelector('#welcomeBlock');
const sendButton = document.querySelector('#sendButton');
const newChatButton = document.querySelector('#newChatButton');
const themeButton = document.querySelector('#themeButton');
const recentList = document.querySelector('#recentList');

const responses = [
  { test: /hello|hi|hey|good morning|good evening/i, answer: "Hey there! I'm Orbit, your creative copilot. What are we exploring today?" },
  { test: /who are you|what are you/i, answer: "I'm Orbit Assistant — a lightweight thinking partner for ideas, explanations, plans, and everything in between. I'm running right here in your browser, so no account or API key is needed." },
  { test: /html|css|javascript|code|website|web/i, answer: "A great web project starts small: define the one action you want visitors to take, create a clear visual hierarchy, then add interaction with JavaScript. Want me to sketch a specific feature or layout?" },
  { test: /project|idea|brainstorm|build/i, answer: "Try this: build a tiny tool that solves one recurring annoyance. A habit tracker with a mood slider, a reading queue, or a personal launchpad are all great places to start. The best idea is the one you can ship this weekend." },
  { test: /learn|learning|skill|study/i, answer: "Use a simple loop: choose one concrete outcome, practice for 25 minutes a day, build a tiny project each week, and review what confused you. Consistency beats intensity." },
  { test: /quantum|complex|explain|simple/i, answer: "Here's the short version: quantum computers use unusual properties of tiny particles to represent and manipulate information. They are not faster at everything — they are promising for a few special problems, like simulating molecules." },
  { test: /thank|thanks/i, answer: "Anytime! I'm happy to keep exploring with you." }
];

function getResponse(message) {
  const match = responses.find((item) => item.test.test(message));
  if (match) return match.answer;
  return `That's an interesting direction. I'd start by breaking “${message.length > 70 ? `${message.slice(0, 67)}…` : message}” into one clear goal, one constraint, and one next action. What outcome would make this feel successful?`;
}

function addMessage(text, type) {
  const message = document.createElement('div');
  message.className = `message ${type}`;
  if (type === 'assistant') {
    message.innerHTML = `<div class="message-avatar">✦</div><div class="message-bubble"></div>`;
    message.querySelector('.message-bubble').textContent = text;
  } else {
    message.innerHTML = `<div class="message-bubble"></div>`;
    message.querySelector('.message-bubble').textContent = text;
  }
  messages.appendChild(message);
  message.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showTyping() {
  const typing = document.createElement('div');
  typing.className = 'message assistant';
  typing.id = 'typingIndicator';
  typing.innerHTML = '<div class="message-avatar">✦</div><div class="typing"><i></i><i></i><i></i></div>';
  messages.appendChild(typing);
  typing.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function submitMessage(text) {
  const message = text.trim();
  if (!message || sendButton.disabled) return;
  welcomeBlock.hidden = true;
  promptGrid.hidden = true;
  addMessage(message, 'user');
  input.value = '';
  input.style.height = 'auto';
  sendButton.disabled = true;
  showTyping();
  window.setTimeout(() => {
    document.querySelector('#typingIndicator')?.remove();
    addMessage(getResponse(message), 'assistant');
    sendButton.disabled = false;
    input.focus();
  }, 650 + Math.random() * 500);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  submitMessage(input.value);
});

input.addEventListener('input', () => {
  input.style.height = 'auto';
  input.style.height = `${Math.min(input.scrollHeight, 130)}px`;
});

input.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
    event.preventDefault();
    form.requestSubmit();
  }
  if (event.key === 'Enter' && !event.shiftKey && !event.metaKey && !event.ctrlKey) {
    event.preventDefault();
    form.requestSubmit();
  }
});

promptGrid.addEventListener('click', (event) => {
  const card = event.target.closest('[data-prompt]');
  if (card) submitMessage(card.dataset.prompt);
});

newChatButton.addEventListener('click', () => {
  messages.innerHTML = '';
  welcomeBlock.hidden = false;
  promptGrid.hidden = false;
  input.value = '';
  input.focus();
});

themeButton.addEventListener('click', () => {
  document.body.classList.toggle('light');
  themeButton.textContent = document.body.classList.contains('light') ? '☾' : '☼';
});

recentList.addEventListener('click', (event) => {
  const button = event.target.closest('.recent-chat');
  if (!button) return;
  document.querySelectorAll('.recent-chat').forEach((item) => item.classList.remove('selected'));
  button.classList.add('selected');
  submitMessage(button.textContent);
});
