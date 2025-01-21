/* As variáveis a baixo armazenam os elementos que serão manipulados
    são do tipo global, pois são utilizadas em várias funções */
const columns = document.querySelectorAll('.column__cards');
const cards = document.querySelectorAll('.card');
const columnTitles = document.querySelectorAll('.column__title');
const spans = document.querySelectorAll('.column__num-cards');

// A variável draggedCard armazena o elemento que está sendo arrastado
let draggedCard = null;

// O dragStart é chamado quando o usuário começa a arrastar um elemento
const dragStart = (event) => {
    draggedCard = event.target;
    event.dataTransfer.effectAllowed = 'move';
};

// O dragOver é chamado quando um elemento arrastado entra na área de destino
const dragOver = (event) => {
    event.preventDefault();
};

// O dragEnter é chamado quando um elemento arrastado entra na área de destino
const dragEnter = ({ target }) => {
    if (target.classList.contains('column__cards')) {
        target.classList.add('column--highlight');
    }
};

// O dragLeave é chamado quando um elemento arrastado sai da área de destino
const dragLeave = ({ target }) => {
    if (target.classList.contains('column__cards')) {
        target.classList.remove('column--highlight');
        target.append(draggedCard);
    }
};

// O drop é chamado quando um elemento arrastado é solto na área de destino
const drop = ({ target }) => {
    // event.preventDefault();
    if (target.classList.contains('column__cards')) {
        target.classList.remove('column--highlight');
        target.append(draggedCard);
        updateCardCount();
    }
}

const createCard = ({ target }) => {
    // Se o target não for uma coluna, não faz nada
    if (!target.classList.contains('column__cards')) return;

    const newCard = document.createElement('section');
    newCard.classList.add('card');
    newCard.setAttribute('draggable', 'true');
    newCard.contentEditable = 'true';

    // Quando o card perde o foco, ele não pode mais ser editado
    newCard.addEventListener('focusout', () => {
        newCard.contentEditable = 'false';
        if (!newCard.textContent){
            newCard.remove();
            updateCardCount();
        } 

        // Adiciona um ícone de fechar no card
        const newIcon = document.createElement('i');
        newIcon.classList.add('fa-solid', 'fa-xmark', 'xmark');
        newCard.append(newIcon);

        newIcon.addEventListener('click', () => {
            newCard.remove();
            updateCardCount();
        });

        // Adiciona um evento de duplo clique para editar o card
        newCard.addEventListener('dblclick', () => {
            newCard.contentEditable = 'true';
            newCard.focus();
        });
    });
    target.append(newCard);
    newCard.addEventListener('dragstart', dragStart);
    newCard.focus();
    updateCardCount();
};

const updateCardCount = () => {
    // Atualiza a quantidade de cards em cada coluna 
    columns.forEach((column, index) => {
        const title = columnTitles[index].textContent;
        const span = spans[index];

        if (title === 'TO DO') {
            span.textContent = column.querySelectorAll('.card').length;
        } else if (title === 'IN PROGRESS') {
            span.textContent = column.querySelectorAll('.card').length;
        } else if (title === 'TO REVIEW') {
            span.textContent = column.querySelectorAll('.card').length;
        } else if (title === 'DONE') {
            span.textContent = column.querySelectorAll('.card').length;
        }
    });
};

updateCardCount();

cards.forEach(card => {
    card.addEventListener('dragstart', dragStart);
});

columns.forEach((column, index) => {
    column.addEventListener('dragover', dragOver);
    column.addEventListener('dragenter', dragEnter);
    column.addEventListener('dragleave', dragLeave);
    column.addEventListener('drop', drop);
    column.addEventListener('dblclick', (index == 0) ? createCard : null);
});