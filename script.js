
//for page1

let bg = ['https://images.unsplash.com/photo-1742792223864-26f1c374b63d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','https://images.unsplash.com/photo-1686075863654-2440a8e0ceb3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','https://images.unsplash.com/photo-1641605821347-5891c43535b3?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','https://plus.unsplash.com/premium_photo-1674837819896-3857f60bc381?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D']
let j=0;
function updateBody(){
    let page1 = document.querySelector('.page1')
    page1.style.backgroundImage = `url(${bg[j]})`;
    // document.body.style.backgroundImage = `url(${bg[j]})`;
}

function slideRight(){
    j = (j+1)%(bg.length);
    updateBody();
}
function slideLeft(){
    if(j===0){
        j = bg.length-1;
    }
    else{
        j = j-1;
    }
    updateBody();
}

setInterval(slideRight,3000);
updateBody();









//for page2
let moviesData = [];
let currentPage = 1;
const itemsPerPage = 4;

let movieName = document.getElementById('movie-input').value.trim();

function marvelMovie(){
    movieName = 'avengers';
    loadMovies();
}

function funnyMovie(){
    movieName = 'funny';
    loadMovies();
}

function animationMovie(){
    movieName = 'animation';
    loadMovies();
}

function webSeriesMovie(){
    movieName = 'webseries';
    loadMovies();
}

function loadMovies(){
    if(movieName === ''){
        alert("Enter a valid movie name!");
        return;
    }
    fetch(`https://www.omdbapi.com/?s=${movieName }&page=&apikey=d6241bb5`)
    .then(response =>  response.json())
    .then(data => {
        console.log(data);
        if(data.Response === 'True'){
            moviesData = data.Search;
            currentPage = 1;
            renderPage();
            renderPagination();
        }
        else{
            alert("No movies found!");
        }
    })
    .catch( err =>{
        console.error("Error in fetching movie data: ",err);
    })
}

function getMovies(event){
    movieName = document.getElementById('movie-input').value.trim();
    if(event.key === 'Enter'){
        loadMovies();
    }
}

function renderPage(){
    const container = document.getElementById('card-container');
    container.innerHTML = '';

    const start = (currentPage-1)*itemsPerPage;
    const end = start+itemsPerPage;
    const currentMovies = moviesData.slice(start,end);

    currentMovies.forEach(movie =>{
        const card = document.createElement('div');
        card.className='card';
        card.innerHTML= `
            <img src='${movie.Poster}' alt='${movie.Title} class="poster" ' style='height:120px; width:100%'>
            <h4>Title: ${movie.Title}</h4>
            <p>Year: ${movie.Year}</p>
            <p>Type: ${movie.Type}</p>
        `;
        container.appendChild(card);
    });
}

function renderPagination(){
    const totalPages = Math.ceil(moviesData.length / itemsPerPage);
    const pagination = document.getElementById('pagination-controls');
    pagination.innerHTML = '';

    //adding previous button
    const prev = document.createElement('button');
    prev.innerText = 'Previous';
    prev.disabled = currentPage === 1;
    prev.onclick = () =>{
        if(currentPage>1){
            currentPage--;
            renderPage();
            renderPagination();
        }
    };
    pagination.appendChild(prev);

    //adding pages
    for(let i=1; i<=totalPages; i++){
        const pageBtn = document.createElement('button');
        pageBtn.innerText=i;
        if(i === currentPage){
            pageBtn.style.fontWeight = 'bold';
            pageBtn.style.fontSize = '16px';
        }
        pageBtn.onclick = () =>{
            currentPage = i;
            renderPage();
            renderPagination();
        };
        pagination.appendChild(pageBtn);
    }

    //adding next

    const next = document.createElement('button');
    next.innerText = 'Next';
    next.disabled = currentPage === totalPages;
    next.onclick = () =>{
        if(currentPage<totalPages){
            currentPage++;
            renderPage();
            renderPagination();
        }
    };
    pagination.appendChild(next);
}



//js code for page3


let pictures = ['christredeemer.jpg','colosseum.jpg','tajmahal.JPG'];
let span = ['sp1','sp2','sp3'];

let i=0;


function callDynamics(){
    let div = document.querySelector('.page3');
    div.style.backgroundImage = `url('${pictures[i]}')`;
    let circles = document.getElementById(`${span[i]}`);
    circles.style.backgroundColor = 'blue';
}

function turnRight(){
    removeColor();
    i = (i+1)%pictures.length;
    callDynamics();
}

function turnLeft(){
    removeColor();
    if(i<1){
        i=pictures.length-1;
    }
    else{
        i = i-1;
    }
    callDynamics();
}

function removeColor(){
    let circles = document.getElementById(`${span[i]}`);
    circles.style.backgroundColor = '';
}
callDynamics();
setInterval(turnRight,3000);


//faq page


let text = "This website provides in-depth reviews, ratings, and analysis of movies from different genres, release periods, and countries. You'll find user-submitted reviews, critic opinions, and recommendations for all types of films.";




function elaborate(number){
    let operator = document.querySelector(`.plus-button${number}`);
    let value = operator.innerText;

    let faqContainer = document.querySelector(`.js-answer${number}`);

    // console.log(faqContainer.classList.contains(`answer${number}`));
    if(!faqContainer.classList.contains(`answer${number}`)){
        faqContainer.classList.add(`answer${number}`);
        operator.innerText='x';
        let hr = document.createElement('hr');
        let div=document.createElement('div');
        div.className = 'Answer';
        div.innerText=text;
        faqContainer.appendChild(hr);
        faqContainer.appendChild(div);
    }
    else{
        faqContainer.classList.remove(`answer${number}`);
        operator.innerText = '+';
        faqContainer.innerHTML='';
    }
}
