
let messags = []; 
let trash = [];
load();


function render(){
    let content = document.getElementById('content');
    content.innerHTML = '';
    content.innerHTML += /*html*/`
        <div class="box">
            <input id="messag" type="text" placeholder="Deine Nachricht">
            <button onclick="addmessag()" id="button">Speicher</button>
        </div>`;
    content.innerHTML += /*html*/ ` 
        <div class="fail none">
            <div class="fail-box">
                <p>Bitte gib deine Nachricht ein.</p>
                <button onclick="closeFail()">OK</button>
            </div>
         </div>`;
    for (let i = 0; i < messags.length; i++){
        const messag = messags[i];
        content.innerHTML += /*html*/ ` 
            <div class="messagBox">
                <p>${messag}</p>
                <button class="trash" onclick="toTrash(${i})"><img class="icon" src="./img/trash.png"></button> 
                <button onclick="deletmessag(${i})" class="delet"><img class="icon" src="./img/close.png"></button> 
            </div>`;}

    content.innerHTML += /*html*/ ` <div onclick="toggleTrash()" class="trash-icon">
                                        <img class="trash-png" src="./img/trash.png">
                                        <sup id="trashCount">${trash.length}</sup>
                                    </div>`;
                                    supShow();
    content.appendChild(createTrashBox());
}


function supShow(){
        const sup = document.getElementById('trashCount');
    if(!trash.length){
        sup.classList.add('none');
    }
}


function createTrashBox() {
    let trashBox = document.createElement('div');
    trashBox.classList.add('trashBox');
    trashBox.classList.add('none');
    trashBox.innerHTML = /*html*/ `
        <div onclick="toggleTrash()" class="trashBox-close">
            <img class="icon" src="./img/close.png">
        </div>`;  
    for (let i = 0; i < trash.length; i++){
        const messag = trash[i];
        trashBox.innerHTML += /*html*/ `
            <div class="trashmessag">
                <p>${messag}</p>
                <div>
                    <button class="trashBtn" onclick="resetTrashmessag(${i})" class="delet"><img class="icon" src="./img/back.png"></button>
                    <button class="trashBtn"  onclick="deletTrashmessag(${i})" class="delet"><img class="icon" src="./img/close.png"></button> 
                </div>
             </div>`;}
 
    return trashBox;
}


function addmessag(){
    let content = document.getElementById('content');
    const messagInput = document.getElementById('messag');
    if(!messagInput.value == ''){
        messags.push(messagInput.value);
        render();
        save();
    }else{
        const fail = document.querySelector('.fail');
        fail.classList.remove('none');
    }
}


function closeFail(){ 
    const fail = document.querySelector('.fail');
    fail.classList.add('none');
}


function deletmessag(i){
    messags.splice(i, 1);
    render();
    save();
}


function deletTrashmessag(i){
    trash.splice(i, 1);
    render();
    save();
}


function load(){
    let massegsAsText = localStorage.getItem('messags');
    let trashAsText = localStorage.getItem('trash');
    if(massegsAsText){
        messags = JSON.parse(massegsAsText);
    }
    if(trashAsText){
        trash = JSON.parse(trashAsText);
    }
}

function save(){
    let massegsAsText = JSON.stringify(messags);
    let trashAsText = JSON.stringify(trash);
    localStorage.setItem('messags', massegsAsText);
    localStorage.setItem('trash', trashAsText);
}


function toTrash(i){
    trash.push(messags[i]);
    deletmessag(i);
}


function toggleTrash(){
    const trashBox = document.querySelector('.trashBox');
    trashBox.classList.toggle('none');
}


function resetTrashmessag(i){
    messags.push(trash[i]);
    deletTrashmessag(i);
    render();
    save();
}
