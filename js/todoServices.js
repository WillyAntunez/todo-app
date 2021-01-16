const $todoTemplate = document.getElementById('todo-template').content,
    $todosUL = document.querySelector('.todos-container > ul'),
    $form = document.querySelector('.todo-input'),
    $modal = document.querySelector('.modal-container'),
    $itemsLeft = document.getElementById('items-left')

const getTodoById = (todos, id ) => todos.find(todo => todo.id == id);

const showModal = ({id, message}) => {
    /* Show modal */
    $modal.querySelector('h3').innerText = message;
    id && $modal.querySelector('.delete').setAttribute('data-id', id);
    $modal.style.visibility = 'visible';
    $modal.style.opacity = 1;
};

const hideModal = () => {
    $modal.querySelector('.delete').removeAttribute('data-id');
    $modal.style.opacity = 0;
    setTimeout(() => {
        $modal.style.visibility = 'hidden';
    }, 300)
};

const createTodo = (name, isCompleted) => {

    let todos = JSON.parse(localStorage.getItem('todos')),
        todosConfig = JSON.parse(localStorage.getItem('todosConfig'));
    
    if(!todos){
        todos = [];
    };

    if(!todosConfig){
        todos = [];
        todosConfig = {
            lastId: 0,
            order: []
        };
    };

    const newTodo = {
        id: ++todosConfig.lastId,
        name,
        isCompleted
    };
    
    todos.unshift(newTodo);
    todosConfig.order.unshift(newTodo.id);

    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('todosConfig', JSON.stringify(todosConfig));

    $form.name.value = '';
    $form.completed.checked = false;

    readTodos();

};

const readTodos = () => {

    let todos = JSON.parse(localStorage.getItem('todos')),
        todosConfig = JSON.parse(localStorage.getItem('todosConfig')),
        hash = location.hash,
        itemsLeft = 0,
        completedItems = 0;

    $todosUL.innerHTML = '';

    const todosOrder = todosConfig.order,
        $fragment = document.createDocumentFragment();
        
    todosOrder.forEach( id => {
        
        let {name, isCompleted} = getTodoById(todos, id);

        !isCompleted && itemsLeft++;
        isCompleted && completedItems++;

        let $clone = document.importNode($todoTemplate, true);
        
        if ((hash === '#active' && isCompleted) || (hash === '#completed' &&!isCompleted)) {
            return; 
        }
        $clone.querySelector('li.todo').setAttribute('data-id', id); 
        $clone.querySelector('input').checked = isCompleted;
        $clone.querySelector('input').setAttribute('data-id', id);
        $clone.querySelector('p').innerText = name;
        $clone.querySelector('button').setAttribute('data-id', id);
        $fragment.appendChild($clone);
    });
    
    if($fragment.children.length > 0){
        $todosUL.appendChild($fragment)
    }else{
        let message = ''
    
        if( hash === '#active' ){
            message = 'There are no active items yet.';
        }else if(hash === '#completed'){
            message = 'There are no completed items yet.'
        }else{
            message = 'There are no items yet, try adding one!'
        }
        $todosUL.innerHTML = 
        `<li class="todo no-items non-draggable">${message}</li>`;
    };

    if(completedItems === 0) {
        document.querySelector('.clear-btn').setAttribute('disabled', 'disabled');
    }else{
        document.querySelector('.clear-btn').removeAttribute('disabled');
    };

    $itemsLeft.innerText = `${itemsLeft} items left.`;
    
    if( hash==='#active' ){
        document.querySelector('.showAll').classList.remove('active');
        document.querySelector('.showCompleted').classList.remove('active');
        document.querySelector('.showActive').classList.add('active');
    }else if(hash==='#completed'){
        document.querySelector('.showAll').classList.remove('active');
        document.querySelector('.showActive').classList.remove('active');
        document.querySelector('.showCompleted').classList.add('active');
    }else{
        document.querySelector('.showCompleted').classList.remove('active');
        document.querySelector('.showActive').classList.remove('active');
        document.querySelector('.showAll').classList.add('active');
    };

    
};

const deleteTodo = ( id ) => {
    let todos = JSON.parse(localStorage.getItem('todos')),
        todosConfig = JSON.parse(localStorage.getItem('todosConfig'));

    const newTodos = todos.filter(todo => todo.id != id),
        newOrder = todosConfig.order.filter(i => i != id);

    todos = newTodos;
    todosConfig.order = newOrder;

    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('todosConfig', JSON.stringify(todosConfig));

    hideModal();
    readTodos();
};

const clearCompleted = () => {

    let todos = JSON.parse(localStorage.getItem('todos')),
        todosConfig = JSON.parse(localStorage.getItem('todosConfig')),
        newOrder = [];

    const newTodos = todos.filter(todo => !todo.isCompleted);

    newOrder = todosConfig.order.filter(i => getTodoById(newTodos, i));

    todosConfig.order = newOrder;
    
    localStorage.setItem('todos', JSON.stringify(newTodos));
    localStorage.setItem('todosConfig', JSON.stringify(todosConfig));

    readTodos();
    hideModal();
};

const updateTodo = ( id, isCompleted ) => {
    let todos = JSON.parse(localStorage.getItem('todos'));

    const i = todos.findIndex(el => el.id == id);

    todos[i].isCompleted = isCompleted;

    localStorage.setItem('todos', JSON.stringify(todos));

    readTodos();
};

/* [{
    id:#,
    name: asdasd,
    isCompleted
}] */


export{ 
    createTodo,
    readTodos,
    showModal,
    hideModal,
    deleteTodo,
    updateTodo,
    clearCompleted
}