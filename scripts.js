window.addEventListener('load', function() {
  console.log('entrou');
  const lista = localStorage.getItem("todoItems");

  console.log(lista);
  if(lista){
    todoItems = JSON.parse(lista);
    todoItems.forEach(item => renderTodo(item));
  }


});

let todoItems = [];

function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  todoItems.push(todo);

  renderTodo(todo);
}

//funcao que marca a tarefa como concluida
function toggleDone(key) {
  //buscando o indice da tarefa dentro do array de tarefas de acordo com a key recebida
  const index = todoItems.findIndex(function (item) {
    return item.id === Number(key);
  });
  todoItems[index].checked = !todoItems[index].checked; //estou invertendo o valor
  renderTodo(todoItems[index]);
}

function deleteTodo(key) {
  const index = todoItems.findIndex(function(item){
    return item.id === Number(key);
  });

  const todo = {
    deleted: true,
     ...todoItems[index]
  };

  todoItems = todoItems.filter(item => item.id !== Number(key));

  renderTodo(todo);
}

const form = document.querySelector('.js-form');

form.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const input = document.querySelector('.js-todo-input');
  const text = input.value.trim();

  if (text !== '') {
    addTodo(text);
    input.value = '';
    input.focus();
  }
});

function renderTodo(todo) {
  localStorage.setItem("todoItems", JSON.stringify(todoItems));

  const list = document.querySelector('.js-todo-list');
  //list.innerHTML += `<li>${todo.text}</li>`;

  const item = document.querySelector(`[data-key='${todo.id}']`);

  const listItem = document.createElement('li');

  const isChecked = todo.checked ? 'done' : '';

  if(todo.deleted){
    item.remove();
    return;
  }

  listItem.setAttribute('class', `todo-item ${isChecked}`);
  listItem.setAttribute('data-key', `${todo.id}`); //data-key atributo personalizado

  listItem.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo">
      <svg><use href="#delete-icon"></use></svg>
    </button>
  `;

  if (item) {
    list.replaceChild(listItem, item);
  } else {
    list.appendChild(listItem);
  }
}

//marcar tarefa como concluida
//selecionar lista de tarefas
const list = document.querySelector('.js-todo-list');

list.addEventListener('click', (event) => {
  if (event.target.classList.contains('js-tick')) {
    //buscar o data customizavel e chamar a funcao que marca tarefa como concluida
    const itemKey = event.target.parentElement.dataset.key; //dataset, pega o que tem no atributo personalizado
    toggleDone(itemKey);
  }

  // if responsavel por saber se clicou no botao de delete e salva o id(key) do elemento clicadodo
  if (event.target.classList.contains('js-delete-todo')) {
    //buscar o data customizavel e chamar a funcao que marca tarefa como concluida
    const itemKey = event.target.parentElement.dataset.key; //dataset, pega o que tem no atributo personalizado
    deleteTodo(itemKey);
  }
});


