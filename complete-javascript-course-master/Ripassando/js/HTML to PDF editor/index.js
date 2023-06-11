
//* THEME SWITCHER
//get theme from memory (does not work with live-server vscode's extension)
function getChosenTheme() {
    console.log('il tema in memoria è: ' + localStorage.getItem('theme'))
    if (localStorage.getItem('theme') === 'light') {
        changeTheme()
    }
}
//onLoading
getChosenTheme()

//handle change theme
function changeTheme() {
    //change all elements class 
    const elements = document.querySelectorAll('html, body, div, h1, h2, h3, p')
    elements.forEach(element => {
        element.classList.toggle('light')
    });
    //set theme in local storage
    localStorage.setItem('theme', elements[0].classList.contains('light') ? 'light' : 'dark')
    console.log('hai cambiato il tema in memoria: ' + localStorage.getItem('theme'))
}

//* CLEAR PAGE
function clearPage() {
    //delete current html into #pagesContainer
    console.log('pulisco')
    document.getElementById('pagesContainer').innerHTML = ''
    displayDocuments()
}

function displayDocuments() {
    //display avaiable documents (poi potrei fare che li prendo da mongoDB)
    document.getElementsByClassName('avaiableDocuments')[0].innerHTML = `
    <h3>Avaiable documents:</h3>
    <h4 onclick="chooseDocument('corso_cd-ci')">corso_cd-ci</h4>
    <h4 onclick="chooseDocument('preparazione_esame_database2')">preparazione_esame_database2</h4>
    `
}

//* CHOOSE DOCUMENT
function chooseDocument(documentName) {
    //clean the .avaiableDocuments element
    //document.getElementsByClassName('avaiableDocuments')[0].innerHTML = ''
    //load chosen document inside #pagesContainer
    console.log('carico documento: ' + documentName)
    $("#pagesContainer").load(`./documents/${documentName}.html`);
    //memorize chosen document's name in localstorage
    localStorage.setItem('lastDocument', documentName)
}

//* when landing on the page, load the last opened document
function getLastDocument() {
    const lastDocumentName = localStorage.getItem('lastDocument')
    //load the last document opened
    console.log('loading last opened document:' + lastDocumentName)
    chooseDocument(lastDocumentName)
}
//onLoading
getLastDocument()