let currentUser = null;

const publicFilesEl = document.getElementById('public-files');
const privateFilesEl = document.getElementById('private-files');
const publicCount = document.getElementById('public-count');
const privateCount = document.getElementById('private-count');

const authSection = document.getElementById('auth-section');
const privateSection = document.getElementById('private-section');
const publicUpload = document.getElementById('public-upload');
const loginMsg = document.getElementById('login-msg');

function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '{}');
}

function setUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function getFiles() {
  return JSON.parse(localStorage.getItem('files') || '{"public":[],"private":{}}');
}

function setFiles(files) {
  localStorage.setItem('files', JSON.stringify(files));
}

function signup() {
  const username = document.getElementById('signup-username').value.trim();
  const password = document.getElementById('signup-password').value.trim();
  if (!username || !password) return alert('Fields required!');

  const users = getUsers();
  if (users[username]) return alert('User already exists!');
  users[username] = { password };
  setUsers(users);
  alert('Sign up successful!');
}

function login() {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();
  const users = getUsers();

  if (users[username] && users[username].password === password) {
    currentUser = username;
    authSection.classList.add('hidden');
    privateSection.classList.remove('hidden');
    publicUpload.classList.remove('hidden');
    loginMsg.textContent = '';
    renderFiles();
  } else {
    loginMsg.textContent = 'Invalid credentials.';
  }
}

function logout() {
  currentUser = null;
  authSection.classList.remove('hidden');
  privateSection.classList.add('hidden');
  publicUpload.classList.add('hidden');
  renderFiles();
}

function uploadFile(type) {
  const input = type === 'public' ? document.getElementById('public-file-input') : document.getElementById('private-file-input');
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function () {
    const base64 = reader.result;
    const files = getFiles();

    const entry = { name: file.name, data: base64 };
    if (type === 'public') {
      files.public.push(entry);
    } else {
      if (!files.private[currentUser]) files.private[currentUser] = [];
      files.private[currentUser].push(entry);
    }

    setFiles(files);
    input.value = '';
    renderFiles();
  };
  reader.readAsDataURL(file);
}

function downloadFile(base64, filename) {
  const a = document.createElement('a');
  a.href = base64;
  a.download = filename;
  a.click();
}

function renderFiles() {
  const files = getFiles();

  // Public
  publicFilesEl.innerHTML = '';
  files.public.forEach(file => {
    const li = document.createElement('li');
    li.innerHTML = `${file.name} <button onclick="downloadFile('${file.data}', '${file.name}')">Download</button>`;
    publicFilesEl.appendChild(li);
  });
  publicCount.textContent = files.public.length;

  // Private
  privateFilesEl.innerHTML = '';
  if (currentUser && files.private[currentUser]) {
    files.private[currentUser].forEach(file => {
      const li = document.createElement('li');
      li.innerHTML = `${file.name} <button onclick="downloadFile('${file.data}', '${file.name}')">Download</button>`;
      privateFilesEl.appendChild(li);
    });
    privateCount.textContent = files.private[currentUser].length;
  } else {
    privateCount.textContent = 0;
  }
}

renderFiles();
