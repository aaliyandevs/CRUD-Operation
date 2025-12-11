let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
let editIndex = null;

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('contact-form').addEventListener('submit', add);
});

function create() {
  document.getElementById('contact-form').style.display = 'block';
  document.querySelector('.add_div').style.display = 'none';
  resetForm();
}

function resetForm() {
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  editIndex = null; 
  document.getElementById('toggle-btn').innerText = 'Create';
}

function add(event) {
  event.preventDefault();
  const form = document.getElementById('contact-form');

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  if (editIndex === null) {
    contacts.push({ name, email });
    showMessage('Contact added successfully!');
  } else {
    contacts[editIndex] = { name, email };
    showMessage('Contact updated successfully!');
  }

  saveContacts(); 
  readAll(); 
  resetForm(); 
  document.getElementById('contact-form').style.display = 'none'; 
  document.querySelector('.add_div').style.display = 'block'; 
}

function readAll() {
  const tableBody = document.querySelector('.data_table');
  tableBody.innerHTML = '';

  contacts.forEach((contact, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${contact.name}</td>
      <td>${contact.email}</td>
      <td>
        <button onclick="edit(${index})" class="crudbtn">Edit</button>
        <button onclick="del(${index})" class="crudbtn">Delete</button>
      </td>
    `;
    tableBody.appendChild(row); 
  });
}

function edit(index) {
  const contact = contacts[index];
  document.getElementById('name').value = contact.name;
  document.getElementById('email').value = contact.email;

  editIndex = index; 
  document.getElementById('contact-form').style.display = 'block'; 
  document.querySelector('.add_div').style.display = 'none'; 
  document.getElementById('toggle-btn').innerText = 'Update'; 
}

function del(index) {
  if (confirm('Are you sure you want to delete this contact?')) {
    contacts.splice(index, 1);
    saveContacts();
    readAll();
  }
}

function saveContacts() {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

function showMessage(text) {
  const messageDiv = document.getElementById('message');
  messageDiv.innerText = text;
  messageDiv.style.display = 'block';

  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 3000);
}
