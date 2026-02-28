const floatingInput = document.getElementById("floatingInput");
const btnBuscar = document.getElementById("btnBuscar");
const inputDateFrom = document.getElementById("inputDateFrom");
const inputDateTo = document.getElementById("inputDateTo");
const contenido = document.getElementById("contenido");

const GetNoticia = async() => {
    try {
        contenido.innerHTML = "";

        const buscando = floatingInput.value;
        const inicio = inputDateFrom.value;
        const fin = inputDateTo.value;

        const response = await fetch(`https://newsapi.org/v2/everything?q=${buscando}&from=${inicio}&to=${fin}&sortBy=popularity&apiKey=f3505bb9404f49048933dd228d1f49a1`);
        const data = await response.json();
        console.log(data);

        data.articles.forEach(articulo => {
            const divNoticia = document.createElement("div");

            divNoticia.className = "col";
            
            divNoticia.innerHTML = `<div class="card">
                <img src="${articulo.urlToImage}" class="card-img-top" alt="Imagen de la noticia">
                <div class="card-body">
                    <h5 class="card-title">${articulo.title}</h5>
                    <p class="card-text">${articulo.description}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Autor: ${articulo.author}</li>
                    <li class="list-group-item">Fuente: ${articulo.source.name}</li>
                    <li class="list-group-item">Fecha: ${new Date(articulo.publishedAt).toLocaleDateString()}</li>
                </ul>
                <div class="card-body">
                    <a href="${articulo.url}" target="_blank" class="card-link">Leer noticia completa</a>
                </div>
            </div>`;
            
            contenido.appendChild(divNoticia);
        });

    } catch (error) {
        console.log(error);
        contenido.innerHTML = "No se ha encontrado la noticia vuelve a intentar";  
    }
};

btnBuscar.addEventListener("click", GetNoticia);