console.log("welocome to spotify");


let songindex = 0;
let audioelement= new Audio('songs/je.mp3');
let masterplay = document.getElementById('masterplay');
let myprogressbar=document.getElementById('myprogressbar');
let gif=document.getElementById('gif');
let mastersongname = document.getElementById('mastersongname');
let songitem = Array.from(document.getElementsByClassName('songitem'));
let searchinput=document.querySelector('.searchinput');








let songs = [
    
    {songname:"jaane de", filepath:"songs/1.mp3", coverpath: "covers/1.webp"},
    {songname:"tu jane na", filepath:"songs/2.mp3", coverpath: "covers/2.webp"},
    {songname:"hoor", filepath:"songs/3.mp3", coverpath: "covers/3.webp"},
    {songname:"pardadari", filepath:"songs/4.mp3", coverpath: "covers/4.webp"},
    {songname:"aadat", filepath:"songs/5.mp3", coverpath: "covers/5.webp"},
    {songname:"pehli dafa", filepath:"songs/6.mp3", coverpath: "covers/6.webp"},
]
songitem.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverpath; 
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname; 
})



masterplay.addEventListener('click',  ()=>{
    if(audioelement.paused || audioelement.currentTime<=0){
        audioelement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{audioelement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity=0;

    }
})


audioelement.addEventListener('timeupdate',()=>{
    
    progress=parseInt((audioelement.currentTime/audioelement.duration)*100);
    
    myprogressbar.value=progress;

}
)


myprogressbar.addEventListener('change',()=>{
    audioelement.currentTime=myprogressbar.value*audioelement.duration/100;
})



const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songindex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioelement.src = `songs/${songindex+1}.mp3`;
        mastersongname.innerText = songs[songindex].songname;
        audioelement.currentTime = 0;
        audioelement.play();
        gif.style.opacity = 1;
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        
    })
})


document.getElementById('next').addEventListener('click', ()=>{
    if(songindex>=5){
        songindex = 0
    }
    else{
        songindex += 1;
    }
    audioelement.src = `songs/${songindex+1}.mp3`;
    mastersongname.innerText = songs[songindex].songname;
    audioelement.currentTime = 0;
    audioelement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songindex<=0){
        songindex = 0
    }
    else{
        songindex -= 1;
    }
    audioelement.src = `songs/${songindex+1}.mp3`;
    mastersongname.innerText = songs[songindex].songname;
    audioelement.currentTime = 0;
    audioelement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
})

searchinput.addEventListener('input',() =>{
    let searchvalue=searchinput.value ? searchinput.value.toLowerCase() : '';
    let songitems=document.querySelectorAll('.songitem');
    songitems.forEach((songitem) =>{
let songname=songitem.querySelector('.songname').textcontent ? songitem.querySelector('.songname').textcontent.toLowerCase(): '';

if(songname.includes(searchvalue)){
    songitem.style.display='block';

}else{
    songitem.style.display='none';
}
});

});

searchinput.addEventListener('input', () => {
    let searchvalue = searchinput.value.toLowerCase();
    let songitems = document.querySelectorAll('.songitem');

    songitems.forEach((songitem) => {
        let songname = songitem.querySelector('.songname').textContent.toLowerCase();

        if (songname.includes(searchvalue)) {
            songitem.style.display = 'flex';
        } else {
            songitem.style.display = 'none';
        }
    });
});


const volumeslider=document.getElementById('volumeslider');
const mutebutton=document.getElementById('mutebutton');
if(volumeslider && mutebutton){
    volumeslider.addEventListener('input',() => {
        audioelement.volume=volumeslider.value;
    });
    mutebutton.addEventListener('click',() =>{
        if(audioelement.muted){
            audioelement.muted=false;
            mutebutton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        }else{
            audioelement.muted=true;
            mutebutton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        }
    })
}