
const gameElement = document.getElementById('arkanoid-1');
const refElements = gameElement.querySelectorAll('[ref]')


const store=
{
    lifes:5,
    score:0
}

const acc={};
for( let element of refElements){
    let key=`${element.getAttribute('ref')}Element`;
    acc[key]=element
}


const {
    arenaElement,
    ballElement,
    bricksElement,
    lifesElement,
    paddleElement,
    scoreElement,
}= acc;

Object.assign(paddleElement.style,{
    left: `${(arenaElement.offsetWidth-paddleElement.offsetWidth)/2}px`
})    

Object.assign(ballElement.style,{
    left: `${(arenaElement.offsetWidth-ballElement.offsetWidth)/2}px`,
    top: `${(arenaElement.offsetHeight-(2*ballElement.offsetHeight)-paddleElement.offsetHeight)}px`
    
})    

scoreElement.innerHTML=store.score;
lifesElement.innerHTML=store.lifes;

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

let tout = setInterval( function()
{
    let left =ballElement.offsetLeft+deltaX
    let top =ballElement.offsetTop-deltaY

    if(arenaWidth<ballElement.offsetLeft+24)
    {
        deltaX=-1
    }
    if(top<0)
    {
        deltaY=-1
    }
    if(arenaheight<top+24)
    {
        deltaY=1
    }
    if(left<0)
    {
        deltaX=1
    }

    ballElement.style.left=`${left}px`;
    ballElement.style.top=`${top}px`;

    //dodane z kulki
    let ballleft =ballElement.offsetLeft;
    let balltop =ballElement.offsetTop;
    
    const element =document.elementFromPoint( arenaLeft + ballleft,arenaTop +balltop);
    const element4 =document.elementFromPoint( arenaLeft + ballleft+24,arenaTop +balltop+22);
    const element1 =document.elementFromPoint( arenaLeft + ballleft+24,arenaTop +balltop+24);
    const element2 =document.elementFromPoint( arenaLeft + ballleft,arenaTop +balltop+22);
    //bricks

    if(element.classList.contains('brick')) 
    {
        element.classList.add('hide');
        deltaY*=-1; 
    }

    if(element4.classList.contains('brick')) 
    {
        element4.classList.add('hide');
        deltaY*=-1; 
    }
    
    if(element1.classList.contains('brick')) 
    {
        element1.classList.add('hide');
        deltaY*=-1; 
    }
    if(element2.classList.contains('brick')) 
    {
        element2.classList.add('hide');
        deltaY*=-1; 
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

},10
)


const onMove= function (e)
{
    let min=0;
    let max=arenaWidth-paddleElement.offsetWidth;
    let point = Math.min(max, Math.max(min, e.pageX-arenaLeft));

    paddleElement.style.left=(point)+ 'px';
}

paddleElement.addEventListener('mousedown',function(e)
{
    document.addEventListener('mousemove', onMove)
})


document.addEventListener('mouseup',function()
{
    document.removeEventListener('mousemove', onMove)
})


const fragment = document.createDocumentFragment();


const brick=`<div class="brick"></div>`;
const template = document.createElement('template')
template.innerHTML= brick.repeat(15);
bricksElement.appendChild(template.content);


