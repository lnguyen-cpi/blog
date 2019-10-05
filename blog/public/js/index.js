var head = document.getElementById('Header'); 
var text1 = "I am Minh Nhat"; 
var text2 = "A CS Student"; 
var k = 0 ; 
function change(){
  if(k%2 == 0 ){
    head.innerHTML = text1 ; 
   head.style.cssText ="animation: typing-1 5s steps(200, end) infinite , blink-caret .65s step-end infinite ; "
   
  }
  else {
    head.innerHTML = text2; 
    head.style.cssText ="animation: typing-2 5s steps(200, end) infinite , blink-caret .65s step-end infinite ; "
  } k++; 
}

setInterval(change,5000); 

var myprofile = document.getElementById("my-profile"); 
var myskills = document.getElementById("skills"); 
var timeline = document.getElementById("timeline"); 

 


document.addEventListener("DOMContentLoaded",function(){


  var tipButton = document.querySelectorAll('.tiphack-nutslide ul li'); 
  var tipSlide = document.querySelectorAll('.tiphack-item');
      
  
    for(var i = 0 ; i < tipButton.length ; i++){
      tipButton[i].addEventListener('click',function(){
        for(var j = 0 ; j < tipButton.length ; j++){
          tipButton[j].classList.remove('tip-active');
        }
        this.classList.add('tip-active');
         var currentTip = this ; 
         var tipNumber = 0 ; 
       
        for(tipNumber = 0 ; currentTip = currentTip.previousElementSibling ; tipNumber ++){}
        
        for(var n = 0 ; n < tipButton.length ; n++){
          tipSlide[n].style.cssText ="transform:translateX(" + (-tipNumber) + "00%)" ;
        }
      });
     
    }


  
  
});