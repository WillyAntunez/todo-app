import { changeLightMode, setLightMode } from './js/darkMode.js';
import { createTodo, readTodos, showModal, hideModal, deleteTodo, updateTodo, clearCompleted } from './js/todoServices.js';
import dragAndDrop from './js/dragAndDrop.js';

const d = document,
    $form = d.querySelector('.todo-input');


/* Document load */
d.addEventListener('DOMContentLoaded', e => {
    /* Dark mode */
    setLightMode();
    /* Read todos */
    readTodos();
});

/* Click event */
d.addEventListener('click', e => {
    /* DarkMode */
    if(e.target.matches('.dark-button')){
        changeLightMode();
    };

    /* REMOVE TODO */
    /* Remove confirm (Show modal) */
    if(e.target.matches('.todos .todo > button')){
        const id = e.target.getAttribute('data-id'),
            message = 'Do you really want to delete this item?';
        showModal({id, message});
        return;
    };

    /* CLEAR COMPLETED TODOS */
    if(e.target.matches('.clear-btn')){
        const message = 'Do you really want to delete all completed items?';
        showModal({id: null, message});
        return;
    };

    if( d.querySelector('.modal-container').style.visibility === 'visible'){
        if(e.target.matches('.modal-options > .delete')){
            /* Delete */
            const id = e.target.getAttribute('data-id');
            if(id){
                deleteTodo(id)
            }else{
                clearCompleted();
            }
        }else if(e.target.matches('.modal-options > .cancel') 
        || (!e.target.matches('.modal *') && !e.target.matches('.modal'))){
            /* Cancel */
            hideModal();
        };
    };

    /* UPDATE TODO */
    if(e.target.matches('.todo > input')){
        const isCompleted = e.target.checked,
            id = e.target.getAttribute('data-id');
        updateTodo(id, isCompleted);
    };

    /* TODOS FILTER */
    if(e.target.matches('.todos-filter>button')){
        e.preventDefault();
        readTodos();
    }

    


});

/* Hashchange event */
window.addEventListener("hashchange", e => {

    readTodos();

})

/* Keypress event */

d.addEventListener('keyup', (e) => {
    /* Hide modal with scape key */
    if( d.querySelector('.modal-container').style.visibility === 'visible' && e.key === 'Escape'){
        hideModal();
    };

});

/* Form submit event */
$form.addEventListener('submit', e => {
    e.preventDefault();

    /* CREATE TODO */
    const name = e.target.name.value,
        isCompleted = e.target.completed.checked;
    createTodo(name, isCompleted);
});

dragAndDrop();


