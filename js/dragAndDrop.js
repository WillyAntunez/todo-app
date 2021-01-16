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
        filter: '.non-draggable',
        delay: 10,
        delayOnTouchOnly: true,
        onEnd: e => {
            saveOrder();
        },
        onChoose: e => {
            window.navigator.vibrate(100) || window.navigator.vibrate(100);
        }
    });


};

export default dragAndDrop;