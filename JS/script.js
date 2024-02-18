let JSONBASE = {
    "status": true,
    "msg": "Clipes retornados com sucesso!",
    "data": [
        {
            "name": "CSGO - 2 tap ridículo do Yuri.mp4",
            "desc": null,
            "date": "2024-01-27T00:34:53.100Z",
            "url": "https://drive.google.com/file/d/1t5MotCGuOZGNbJnQuWD5hgGNqiF5Ecng/view?usp=drivesdk",
            "id": "1t5MotCGuOZGNbJnQuWD5hgGNqiF5Ecng",
            "folder": "CSGO"
        },
        {
            "name": "CSGO - Pedrada Kgada de Deagle.mp4",
            "desc": "#CSGO, #PEDRADA, #DEAGLE",
            "date": "2024-01-21T18:46:52.950Z",
            "url": "https://drive.google.com/file/d/1ebuvMaAoItUS-bUabvVmpOZYc71vLp1l/view?usp=drivesdk",
            "id": "1ebuvMaAoItUS-bUabvVmpOZYc71vLp1l",
            "folder": "CSGO"
        },
        {
            "name": "Farlight - Quando a pinadeira da certo.mp4",
            "desc": null,
            "date": "2024-01-27T19:01:48.632Z",
            "url": "https://drive.google.com/file/d/1EVldutFy9b9UFmT56p-cEACwx_3z-X8_/view?usp=drivesdk",
            "id": "1EVldutFy9b9UFmT56p-cEACwx_3z-X8_",
            "folder": "Farlight"
        },
        {
            "name": "Farlight - Acho que alguém ficou bolado.mp4",
            "desc": null,
            "date": "2024-01-27T19:01:52.462Z",
            "url": "https://drive.google.com/file/d/17ZgglDqrLa9JZbHRe1xhACkuoFFujIwu/view?usp=drivesdk",
            "id": "17ZgglDqrLa9JZbHRe1xhACkuoFFujIwu",
            "folder": "Farlight"
        },
        {
            "name": "CSGO - Yuri tomando uma sapatada de costas.mp4",
            "desc": null,
            "date": "2024-01-27T00:34:40.748Z",
            "url": "https://drive.google.com/file/d/1HTZdPavavxfjEEYBWjQ8jeIljXteltjp/view?usp=drivesdk",
            "id": "1HTZdPavavxfjEEYBWjQ8jeIljXteltjp",
            "folder": "CSGO"
        },
        {
            "name": "CSGO - COMO É AMIGO.mp4",
            "desc": null,
            "date": "2024-01-27T00:35:16.364Z",
            "url": "https://drive.google.com/file/d/1sxuRcaG0Uakxc_F_wLy1ruih6TWWu9BN/view?usp=drivesdk",
            "id": "1sxuRcaG0Uakxc_F_wLy1ruih6TWWu9BN",
            "folder": "CSGO"
        }
    ]
}

var JSONDATA;


/////////////////////////////////// FUNÇÕES - PAGINA ESCOLHIDOS //////////

//Chama todas as funções iniciais da Página
function iniciaPaginaEscolhidos(){
    //adicionaLoading('box', 'conteudoPaginaEscolhidos', 'loadingClipes')
    if(!validaJSONClipes()){
        buscarClipes(salvarJSONClipes)
    }else{
        escolheClipes()
    }
}

function escolheClipes(){
    let json = JSON.parse(localStorage.getItem("MeusClipes-All"));
    let clipeDoDia = json.dados.filter(clipe => JSON.parse(clipe.desc).data.split(' ')[0] == (new Date().toLocaleDateString('pt-br', { year:"numeric", month:"numeric", day:"numeric"})) )[0];

    if(clipeDoDia){
        document.getElementById('ClipeDoDia').insertAdjacentHTML('beforeEnd',`<iframe onload="loadIframes(this); removeLoading('loadingClipeDoDia')" src="https://drive.google.com/file/d/${clipeDoDia.id}/preview" frameborder="0" allowFullScreen allow="autoplay"></iframe>`)
        document.getElementById('nomeDoClipe').innerHTML = clipeDoDia.name
        document.getElementById('MVPClipe').innerHTML = JSON.parse(clipeDoDia.desc).mvp;

        document.getElementById('dadosClipe').insertAdjacentHTML('beforeEnd',`
            <p style="padding-left: 10px"> Jogo: ${clipeDoDia.folder} </p></br>
            <p style="padding-left: 10px"> Data: ${JSON.parse(clipeDoDia.desc).data} </p></br>
            <p style="padding-left: 10px"> Tags: ${JSON.parse(clipeDoDia.desc).tags.map( tag=>{ console.log(tag); return `<span class="tagsClipe">${tag}</span>` } ).join(' ')} </p>
        `)
    }else{
        document.getElementById('nomeDoClipe').innerHTML = "...";
        document.getElementById('MVPClipe').innerHTML = "...";
        document.getElementById('dadosClipe').insertAdjacentHTML('beforeEnd',`<p style="padding-left: 10px"> ... </p>`);

        setTimeout(() => {
            removeLoading('loadingClipeDoDia');
            document.getElementById('ClipeDoDia').insertAdjacentHTML('beforeEnd', `<svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M58 54.4924L54.4924 58L46.9524 50.46H7.9819C6.5169 50.46 5.1119 49.878 4.07598 48.8421C3.04007 47.8062 2.4581 46.4012 2.4581 44.9362V11.7933C2.4581 10.1914 3.14857 8.75524 4.25333 7.76095L0 3.50762L3.53524 0L58 54.4924ZM57.3648 46.8143C57.5857 46.2343 57.6962 45.599 57.6962 44.9362V6.26952H46.6486L52.1724 17.3171H43.8867L38.3629 6.26952H32.839L38.3629 17.3171H30.0771L24.5533 6.26952H19.0295L21.239 10.6886L57.3648 46.8143Z" fill="#0F7173"/></svg> <br> <p>Nenhum clipe foi gravado nesse dia '-'</p>`)
        }, 500);

    }
}


/////////////////////////////////// FUNÇÕES - PAGINA TODOS //////////

//Chama todas as funções iniciais da Página
function iniciaPaginaTodos(){
    //adicionaLoading('box', 'resultadoPesquisa', 'loadingClipes')
    if(!validaJSONClipes()){
        buscarClipes(salvarJSONClipes)
    }

    JSONDATA = JSON.parse(localStorage.getItem("MeusClipes-All"));
    //montaVideosPaginaTodos(JSONDATA);
}

//Adiciona todos os clipes na pagina
function montaVideosPaginaTodos(obj){
    let divVideos = document.getElementById('resultadoPesquisa')

    obj.dados.forEach((clipe, index) => {
        divVideos.insertAdjacentHTML('beforeEnd',`
            <div class="card" id="cardClipe${index}" style="display:none" data-clipeData="${JSON.parse(clipe.desc).data}" data-clipeNome="${clipe.name.replace('.mp4','')}" data-clipeJogo="${clipe.folder}">
                <div class="nomeClipeCard"><p>${clipe.name.replace('.mp4','')}</p></div>
                <div id="loadingClipe${index}" class="loaderDiv" style="position: absolute;"><span class="loader"></span></div>
                <iframe onload="loadIframes(this); removeLoading('loadingClipe${index}'); this.click()" src="https://drive.google.com/file/d/${clipe.id}/preview" allowfullscreen type='video/mp4' allow="autoplay"></iframe>
            </div>
        `)
    });

    removeLoading('loadingClipes');
}

function montaVideosPaginaTodosV2(obj){
    let divVideos = document.getElementById('resultadoPesquisa');
    divVideos.innerHTML = "";

    if(obj != false){
        obj.dados.forEach((clipe, index) => {
            // divVideos.insertAdjacentHTML('beforeEnd',`
            //     <div class="card" id="cardClipe${index}" data-clipeData="${JSON.parse(clipe.desc).data}" data-clipeNome="${clipe.name.replace('.mp4','')}" data-clipeJogo="${clipe.folder}">
            //         <div class="nomeClipeCard"><p>${clipe.name.replace('.mp4','')}</p></div>
            //         <div id="loadingClipe${index}" class="loaderDiv" style="position: absolute;"><span class="loader"></span></div>
            //         <iframe onload="loadIframes(this); removeLoading('loadingClipe${index}'); this.click()" src="https://drive.google.com/file/d/${clipe.id}/preview" allowfullscreen type='video/mp4' allow="autoplay"></iframe>
            //     </div>
            // `)
            divVideos.insertAdjacentHTML('beforeEnd',`
                <div class="card" id="cardClipe${index}" data-clipeData="${JSON.parse(clipe.desc).data}" data-clipeNome="${clipe.name.replace('.mp4','')}" data-clipeJogo="${clipe.folder}">
                    <div class="nomeClipeCard"><p>${clipe.name.replace('.mp4','')}</p></div>
                    <img src="https://drive.google.com/uc?id=${JSON.parse(clipe.desc).thumb}">
                </div>
            `)
        });
    }else{
        divVideos.insertAdjacentHTML('beforeEnd','<p> Nenhum vídeo foi encontrado. </p>')
    }
}

function pesquisaClipes(campo){
    let clipes = document.querySelectorAll('.card')
    setTimeout(() => {
        clipes.forEach((clipe)=>{
            if(clipe.getAttribute('data-clipenome').search(campo.value) != -1){
                clipe.style.display = "flex";
            }else{
                clipe.style.display = "none";
            }
        })
    }, 200);
}

function pesquisaClipesv2(campo){
    let clipesFiltrados = []
    JSONDATA.dados.forEach((clipe)=>{
        if(clipe.name.search(campo.value) != -1){
            clipesFiltrados.push(clipe)
        }
    })

    if(clipesFiltrados.length > 0){
        montaVideosPaginaTodosV2({dados: clipesFiltrados});
    }else{
        montaVideosPaginaTodosV2(false);
    }
}

/////////////////////////////////// FUNÇÕES - PAGINA ALEATORIO //////////


function carregaPaginaAleatorio(){
    buscaClipeAleatorio();
}

function buscaClipeAleatorio(){
    let jsonDados = JSON.parse(localStorage.getItem("MeusClipes-All"));
    let clipeAleatorio = jsonDados.dados[Math.floor(Math.random()*jsonDados.dados.length)]
    document.getElementById('DivClipeAleatorio').innerHTML = ""
    document.getElementById('DivClipeAleatorio').insertAdjacentHTML('afterBegin',`
        <div id="InfoClipeAleatorio">
            <p>${clipeAleatorio.name.replace('.mp4','')}</p>
            <p>${JSON.parse(clipeAleatorio.desc).data}</p>
        </div>
        <div id="ClipeAleatorioLoading" class="loaderDiv" style="position: absolute;"><span class="loader"></span></div>
        <iframe autoplay=1 onload="loadIframes(this); removeLoading('ClipeAleatorioLoading'); this.click()" id="ClipeAleatorio" src="https://drive.google.com/file/d/${clipeAleatorio.id}/preview" allow="autoplay" frameborder="0" allowfullscreen="" sandbox="allow-forms allow-same-origin allow-scripts"></iframe>
    `)
}



/////////////////////////////////// FUNÇÕES - GLOBAIS //////////

//Adiciona o loading de acordo com os parâmetros enviados
    //type = Tipo do loading (box|loader)
    //elementID = ID do elemento que terá o loading
    //loadingID = ID que ficará no loading
function adicionaLoading(type, elementID, loadingID){
    let fullLoading = `
        <div id="${loadingID}" class="loaderDiv">
            <span class="loader"></span>
        </div>
    `
    let loading = `
        <span id="${loadingID}" class="loader"></span>
    `

    if(type == "box"){
        document.getElementById(elementID).insertAdjacentHTML('afterBegin', fullLoading)
    }else if(type == "loader"){
        document.getElementById(elementID).insertAdjacentHTML('afterBegin', loading)
    }
}

function loadIframes(elemento){
    elemento.style.opacity = 1;
}

//Salva o JSON com as informações dos clipes
function salvarJSONClipes(json){
    json = {
        data: new Date().toLocaleDateString('pt-br', { year:"numeric", month:"numeric", day:"numeric"}),
        dados: JSON.parse(json).data
    }
    localStorage.setItem('MeusClipes-All',JSON.stringify(json))
    console.log("Novos Clipes Salvos!")
    escolheClipes();
}

//Verifica se a data do JSON salvo no local storage é atual 
function validaJSONClipes(){
    let json = JSON.parse(localStorage.getItem("MeusClipes-All"))
    if(json){
        let dataAtual = new Date().toLocaleDateString('pt-br', { year:"numeric", month:"numeric", day:"numeric"});
        buscarClipes(verificaNovoConteudo);
        return json.data == dataAtual ? true : false;
    }else{
        return false;
    }
}

//Remove o loading que possui o ID do parâmetro
function removeLoading(loadingID){
    document.getElementById(loadingID).remove();
}

//Busca todos os vídeos pela api e executa a função de callback
async function buscarClipes(func){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
      
    fetch("https://script.google.com/macros/s/AKfycbxVdXrtSlRU2A0lw0LyygZxmpiJsY6RA4U5CpSZNRXWQnpisDRquABdsUZnKsuUZ1exjg/exec?action=getAllClips", requestOptions)
        .then(response => response.text())
        .then(result => func(result))
        .catch(error => console.log('error', error));
}

//Verifica se há conteudos novos a serem pesquisados
function verificaNovoConteudo(json){
    let jsonOld = JSON.stringify(JSON.parse(localStorage.getItem("MeusClipes-All")).dados)
    json = JSON.stringify(JSON.parse(json).data)

    if(jsonOld.length !== json.length){ adicionaBtnAtt() } else { console.log("Não Há Conteudos Novos!") }
}

//Adiciona o botão de atualizar o conteudo da página
function adicionaBtnAtt(){
    document.getElementById('botoesNavBar').insertAdjacentHTML('afterBegin', `<button id="btnAttConteudo" onclick="atualizaConteudo()">ATUALIZAR <svg id="AttBtnIcon" width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M5.5 2.5004V4.07172C4.72204 4.07033 3.96118 4.29996 3.31388 4.73151C2.66659 5.16306 2.162 5.77709 1.8641 6.49576C1.5662 7.21443 1.4884 8.00537 1.64055 8.76831C1.79271 9.53124 2.16797 10.2318 2.71877 10.7812L1.611 11.889C0.841784 11.1199 0.317934 10.1399 0.105697 9.07303C-0.106539 8.00616 0.00237244 6.90032 0.418657 5.89535C0.834941 4.89038 1.5399 4.03143 2.44438 3.42713C3.34886 2.82283 4.41222 2.50033 5.5 2.5004ZM9.389 4.111C10.1582 4.88014 10.6821 5.86011 10.8943 6.92698C11.1065 7.99385 10.9976 9.0997 10.5813 10.1047C10.1651 11.1096 9.4601 11.9686 8.55562 12.5729C7.65114 13.1772 6.58778 13.4997 5.5 13.4996V11.9283C6.27796 11.9297 7.03882 11.7 7.68612 11.2685C8.33341 10.8369 8.838 10.2229 9.1359 9.50425C9.4338 8.78558 9.5116 7.99464 9.35945 7.23171C9.20729 6.46877 8.83203 5.76819 8.28123 5.21878L9.389 4.111ZM5.5 15.8566L2.35737 12.7139L5.5 9.57132V15.8566ZM5.5 6.42869V0.143433L8.64263 3.28606L5.5 6.42869Z" fill="#272932"/> </svg></button`)
}

function atualizaConteudo(){
    let json = JSON.parse(localStorage.getItem("MeusClipes-All"))
    json.data = ""
    localStorage.clear('MeusClipes-All')
    //localStorage.setItem('MeusClipes-All',JSON.stringify(json))
    window.location.reload();
}