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


/////////////////////////////////// FUNÇÕES - PAGINA ESCOLHIDOS //////////

//Chama todas as funções iniciais da Página
function iniciaPaginaEscolhidos(){
    //adicionaLoading('box', 'conteudoPaginaEscolhidos', 'loadingClipes')
    //buscarClipes(escolheClipes)
}

function escolheClipes(){

}

/////////////////////////////////// FUNÇÕES - PAGINA TODOS //////////

//Chama todas as funções iniciais da Página
function iniciaPaginaTodos(){
    adicionaLoading('box', 'conteudoPaginaTodos', 'loadingClipes')
    buscarClipes(montaVideosPaginaTodos)
}

//Adiciona todos os clipes na pagina
function montaVideosPaginaTodos(obj){
    let divVideos = document.getElementById('conteudoPaginaTodos')
    let dados = JSON.parse(obj).data

    dados.forEach(clipe => {
        divVideos.insertAdjacentHTML('beforeEnd',`
            <iframe class="card" src="https://drive.google.com/file/d/${clipe.id}/preview" allowfullscreen type='video/mp4'></iframe>
        `)
    });

    removeLoading('loadingClipes');
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