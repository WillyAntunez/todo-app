import { readTodos } from "./todoServices.js";

const d = document,
    $todos = d.querySelector('.todos');

const saveOrder = ($todosArr) => {
    if(location.hash !== '#active' && location.hash !== '#completed'){
       const $todosArr = document.querySelectorAll('.todos > .todo'),
            todosConfig = JSON.parse(localStorage.getItem('todosConfig'));

        let newOrder = [];

        $todosArr.forEach(todo => {
            let id = parseInt(todo.getAttribute('data-id'));
            newOrder.push(id);
        });

        newOrder = new Set(newOrder);

        newOrder = [...newOrder];

        todosConfig.order = newOrder;

        localStorage.setItem('todosConfig', JSON.stringify(todosConfig));

        readTodos();
    };
};

const dragAndDrop =  e => { 

    const sortable = new Sortable($todos, {
        animation: 150,
        ghostClass: 'dragging',
        filter: '.non-draggable'
    });

    d.addEventListener('drop', e => {
        if(e.target.matches('.todo') || e.target.matches('.todo *')){
            saveOrder();
        };
    });

    d.addEventListener('touchstart', e => {
        e.preventDefault()
        if(e.target.matches('.todo *')){
            sortable = ''
        }
    })

    d.addEventListener('touchend', e => {
        if(e.target.matches('.todo')){
            saveOrder();
        };
    });
    

};

export default dragAndDrop;