console.log("welcome to spotify");
//initialaize the variable
let songIndex=0;
let audioElement=new Audio('songs/1.mp3');
let mastersongname=document.getElementById('mastersongname');
let songItemplay=document.getElementsByClassName('songitemplay');
let masterplay=document.getElementById('masterplay');
let myprogressbar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let songitems=Array.from(document.getElementsByClassName('songitem'));


let songs=[
    {songName:"Palat" ,filepath: "songs/1.mp3" ,coverpath: "covers/1.jpg" },
    {songName:"Shanivar Rati" ,filepath: "songs/2.mp3" ,coverpath: "covers/2.jpg" },
    {songName:"Aashiq Surrender" ,filepath: "songs/3.mp3" ,coverpath: "covers/3.jpg" },
    {songName:"Najar Lag jayegi" ,filepath: "songs/4.mp3" ,coverpath: "covers/4.jpg" },
    {songName:"Blue Eyes" ,filepath: "songs/5.mp3" ,coverpath: "covers/5.jpg" },
    {songName:"She dont Know" ,filepath: "songs/6.mp3" ,coverpath: "covers/6.jpg" },
    {songName:"Slame-Ishq" ,filepath: "songs/7.mp3" ,coverpath: "covers/7.jpg" },
    {songName:"Muskan" ,filepath: "songs/8.mp3" ,coverpath: "covers/8.jpg" },
]

//audioelement.play();
songitems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;

    const a=songs[i].filepath;
    let au=new Audio(a);
    au.addEventListener('loadedmetadata', () => {
        const m=parseInt(au.duration/60);
        const s=parseInt(au.duration % 60);
        element.getElementsByClassName('timestamp')[0].textContent=m+":"+s;

    });  
})
//Handle play/pause click

masterplay.addEventListener('click' ,()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove("fa-play-circle");
        masterplay.classList.add("fa-pause-circle");
        gif.style.opacity=0.4;
    }else{
        audioElement.pause();
        masterplay.classList.remove("fa-pause-circle");
        masterplay.classList.add("fa-play-circle");
        gif.style.opacity=0;
    }
})

//Listen to events
audioElement.addEventListener('timeupdate' ,()=>{
    //update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myprogressbar.value=progress;
})

myprogressbar.addEventListener('change' ,()=>{
    audioElement.currentTime=(myprogressbar.value* audioElement.duration)/100;
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemplay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}



Array.from(document.getElementsByClassName("songItemplay")).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
         index=parseInt(e.target.id);
         e.target.classList.remove('fa-play-circle');
         e.target.classList.add('fa-pause-circle');
         mastersongname.innerText=songs[index].songName;
         audioElement.src=`songs/${index+1}.mp3`;
        audioElement.currentTime=0;   
        audioElement.play();
        masterplay.classList.remove("fa-play-circle");
        masterplay.classList.add("fa-pause-circle"); 


        //for continuous upgradation of song by itself
        audioElement.addEventListener('timeupdate' ,()=>{
            if(audioElement.currentTime==audioElement.duration){
                let i=document.getElementById(index);
                i.classList.remove('fa-pause-circle');
                i.classList.add('fa-play-circle');
                index=index+1;
                i=document.getElementById(index);
                i.classList.remove('fa-play-circle');
                i.classList.add('fa-pause-circle');
                audioElement.src=`songs/${index+1}.mp3`;
                mastersongname.innerText=songs[index].songName;
                audioElement.currentTime=0;   
                audioElement.play();
                masterplay.classList.remove("fa-play-circle");
                masterplay.classList.add("fa-pause-circle"); 
            }
        })
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if (typeof(index) == "undefined"){
          index=0;
    }
    let i=document.getElementById(index);
    i.classList.remove('fa-pause-circle');
    i.classList.add('fa-play-circle');
    if(index==7){
       index=0;
       
    }else{
       index+=1;
    }
    i=document.getElementById(index);
    i.classList.remove('fa-play-circle');
    i.classList.add('fa-pause-circle');
    mastersongname.innerText=songs[index].songName;
    audioElement.src=`songs/${index+1}.mp3`;
    audioElement.currentTime=0;
    
    audioElement.play();
    masterplay.classList.remove("fa-play-circle");
    masterplay.classList.add("fa-pause-circle");
})

document.getElementById('back').addEventListener('click',()=>{
    if (typeof(index) == "undefined"){
        index=0;
    }
    let i=document.getElementById(index);
    i.classList.remove('fa-pause-circle');
    i.classList.add('fa-play-circle');
    if(index<=0){
       index=0;
    }else{
       index-=1;
    }
    i=document.getElementById(index);
    i.classList.remove('fa-play-circle');
    i.classList.add('fa-pause-circle');
    mastersongname.innerText=songs[index].songName;
    audioElement.src=`songs/${index+1}.mp3`;
     audioElement.currentTime=0;
     audioElement.play();
     masterplay.classList.remove("fa-play-circle");
     masterplay.classList.add("fa-pause-circle");
})

let aud=new Audio("songs/2.mp3");
console.log(aud.duration);                                      