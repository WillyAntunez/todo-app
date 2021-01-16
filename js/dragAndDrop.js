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

        console.log('se ejecuto')

        readTodos();
    };
};

const dragAndDrop =  e => { 

    const sortable = new Sortable($todos, {
        animation: 150,
        ghostClass: 'dragging',
        filter: '.non-draggable',
        onEnd: e => {
            saveOrder();
        },
        onChoose: e => {
            return false;
        },
        onUnChoose: e => {
            return false;
        }
    });

    d.addEventListener('click', (e) => {
        if(e.target.matches('.todo>button')){
            
        }
    })


};

export default dragAndDrop;