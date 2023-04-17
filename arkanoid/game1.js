
const gameElement = document.getElementById('arkanoid-1');
const refElements = gameElement.querySelectorAll('[ref]');




const store=
{
    lifes:0,
    score:0
}

const acc={};
for( let element of refElements){
    let key=`${element.getAttribute('ref')}Element`;
    acc[key]=element;
}



const {
    arenaElement,
    ballElement,
    bricksElement,
    lifesElement,
    paddleElement,
    scoreElement,
}= acc;

let center = function (){
Object.assign(paddleElement.style,{
    left: `${(arenaElement.offsetWidth-paddleElement.offsetWidth)/2}px`
});

Object.assign(ballElement.style,{
    left: `${(arenaElement.offsetWidth-ballElement.offsetWidth)/2}px`,
    top: `${(arenaElement.offsetHeight-(2*ballElement.offsetHeight)-paddleElement.offsetHeight)}px`
    
});
}

center();

let
{
    width: arenaWidth,
    height: arenaheight,
    left: arenaLeft,
    right: arenaRight,
    top: arenaTop,
} = arenaElement.getBoundingClientRect();



let deltaY=1;
let deltaX=1;

let a=0;
let b=0;
let fun1 = function()
{
    if(a==0)
    {
        a=1;
        if(a==1)
        {
        paddleElement.style.backgroundColor="rgba(170,157,157)";
        }
        
        
            let tout = setInterval( function()
            {
                if(b==1)
                {
                    clearInterval(tout);
                }
                scoreElement.innerHTML=store.score;
                lifesElement.innerHTML=store.lifes;

                let left =ballElement.offsetLeft+deltaX;
                let top =ballElement.offsetTop-deltaY;

                if(arenaWidth<ballElement.offsetLeft+24)
                {
                    deltaX=-1;
                }
                if(top<0)
                {
                    deltaY=-1;
                    
                }
                if(arenaheight<top+24)
                {
                    deltaY=1;
                    store.lifes-=1;
                    lifesElement.innerHTML;
                    clearInterval(tout);
                    setTimeout( center,750);
                    paddleElement.style.backgroundColor="rgba(255,255,255)";
                    a=0;


                    if(store.lifes<0)
                    {
                        alert("przegrałes");
                        paddleElement.style.backgroundColor="rgba((170,157,157)";
                        clearInterval(tout);
                        a=1;
                        
                    };
                    
                }
                if(left<0)
                {
                    deltaX=1;
                }

                ballElement.style.left=`${left}px`;
                ballElement.style.top=`${top}px`;

                //ball shape
                let ballleft =ballElement.offsetLeft;
                let balltop =ballElement.offsetTop;
                
                const element =document.elementFromPoint( arenaLeft +2+ ballleft,arenaTop +balltop);
                const element4 =document.elementFromPoint( arenaLeft + ballleft+22,arenaTop +balltop+24);
                const element1 =document.elementFromPoint( arenaLeft + ballleft+24,arenaTop +balltop+2);
                const element2 =document.elementFromPoint( arenaLeft + ballleft,arenaTop +balltop+22);

                // reflection bricks

                if(element.classList.contains('brick')) 
                {
                    element.classList.add('hide');
                    deltaY*=-1; 
                    store.score+=1;
                    scoreElement.innerHTML;
                }

                if(element4.classList.contains('brick')) 
                {
                    element4.classList.add('hide');
                    deltaY*=-1; 
                    store.score+=1;
                    scoreElement.innerHTML;
                }
                
                if(element1.classList.contains('brick')) 
                {
                    element1.classList.add('hide');
                    deltaY*=-1; 
                    store.score+=1;
                    scoreElement.innerHTML;
                }
                if(element2.classList.contains('brick')) 
                {
                    element2.classList.add('hide');
                    deltaY*=-1; 
                    store.score+=1;
                    scoreElement.innerHTML;
                }

                //paddle
                if(element1.classList.contains('paddle')) 
                {
                    
                    deltaY*=-1; 
                }
                if(element2.classList.contains('paddle')) 
                {
                    
                    deltaY*=-1; 
                }
                if(store.score==r)
                {
                    alert("wygrana")
                    clearInterval(tout);
                }
            },5
            );
    }        
}

const onMove= function (e)
{
    let min=0;
    let max=arenaWidth-paddleElement.offsetWidth;
    let point = Math.min(max, Math.max(min, e.pageX-arenaLeft));

    paddleElement.style.left=(point)+ 'px';
}



paddleElement.addEventListener('mousedown',function(e)
{
    b=0;
    document.addEventListener('mousemove', onMove);  
    document.addEventListener('mousedown', fun1());
    
})



document.addEventListener('mouseup',function()
{
    document.removeEventListener('mousemove', onMove);
})

const fragment = document.createDocumentFragment();
const brick=`<div class="brick"></div>`;
const template = document.createElement('template');
let r=30;
template.innerHTML= brick.repeat(r);
bricksElement.appendChild(template.content);



document.getElementById("exButton").addEventListener("click",function()
{
    center();
    b=1;
});



const bhide=document.getElementsByClassName("hide")




document.getElementById("exButton1").addEventListener("click",function()

{
    b=1;
    store.lifes=2;
    store.score=0;
    center();
    a=0;
    paddleElement.style.backgroundColor="rgba(255,255,255)";
    for (let i=0; i<r; i++) 
    {
        bhide[0].classList.remove("hide");
        
    }

});
//centrowanie kursora





