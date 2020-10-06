//Your code here
const header = document.getElementById('header');
const main = document.getElementById('main');
const playground = document.getElementById('playground');
const border = document.getElementById('border');

let mouseStart = [];
let mainStart = [200, 200];
let mainSize = [200, 200];

let mouseState = 'default';

header.addEventListener('mousedown' , mousedown);
header.addEventListener('mouseout' , mouseout);
window.addEventListener('mousemove' , mouseChange);
main.addEventListener('mousedown' , sizeChangeStart);
main.addEventListener('mouseup' , sizeChangeStop);
main.addEventListener('mouseout' , sizeChangeStop);


function mouseChange(e) 
{
    let {top , left , right , bottom} = border.getBoundingClientRect();

    if ((e.clientX < right + 20 && e.clientX > right - 20 && e.clientY < top + 20 && e.clientY > top - 20) || (e.clientX < left + 20 && e.clientX > left - 20 && e.clientY < bottom + 20 && e.clientY > bottom - 20))
    {
        main.style.cursor = 'ne-resize';
        mouseState = e.clientX < right + 20 && e.clientX > right - 20 ? 'ne' : 'sw';
    }
    else if ((e.clientX < left + 20 && e.clientX > left - 20 && e.clientY < top + 20 && e.clientY > top - 20) || (e.clientX < right + 20 && e.clientX > right - 20 && e.clientY < bottom + 20 && e.clientY > bottom - 20))
    {
        main.style.cursor = 'nw-resize';
        mouseState = e.clientX < left + 20 && e.clientX > left - 20 ? 'nw' : 'se';
    }
    else if ((e.clientX < right + 20 && e.clientX > right - 20) || (e.clientX < left + 20 && e.clientX > left - 20))
    {
        main.style.cursor = 'e-resize';
        mouseState = e.clientX < right + 20 && e.clientX > right - 20 ? 'e' : 'w';
    }
    else if ((e.clientY < top + 20 && e.clientY > top - 20) || (e.clientY < bottom + 20 && e.clientY > bottom - 20))
    {
        main.style.cursor = 'n-resize';
        mouseState = e.clientY < top + 20 && e.clientY > top - 20 ? 'n' : 's';
    }
    else
    {
        main.style.cursor = 'default';
        mouseState = 'default';
    }
}

function sizeChangeStart(e) 
{
    mouseStart = [e.clientX , e.clientY];

    window.removeEventListener('mousemove' , mouseChange);

    e.stopPropagation();

    if (mouseState !== 'default')
    {
        main.addEventListener('mousemove' , sizeChange);
    }
}

function sizeChange(e)
{
    let {top , left , right , bottom} = playground.getBoundingClientRect();
    let {width , height} = main.getBoundingClientRect();
    let moveX = e.clientX - mouseStart[0];
    let moveY = e.clientY - mouseStart[1];

    switch(mouseState)
    {
        case 'n':
            if (mainStart[1] + moveY > top && mainStart[1] + moveY <= mainStart[1] + height - 150)
            {
                main.style.height = `${mainSize[1] - moveY}px`;
                main.style.top = `${mainStart[1] + moveY}px`;
            }
            break;
        case 'ne':
            if (mainStart[1] + moveY > top && mainStart[1] + moveY <= mainStart[1] + height - 150)
            {
                main.style.height = `${mainSize[1] - moveY}px`;
                main.style.top = `${mainStart[1] + moveY}px`; 
            }
            if (mainStart[0] + mainSize[0] + moveX < right && mainStart[0] + mainSize[0] + moveX >= mainStart[0] + 150)
            {
                main.style.width = `${mainSize[0] + moveX}px`;
            }
            break;
        case 'e':
            if (mainStart[0] + mainSize[0] + moveX < right && mainStart[0] + mainSize[0] + moveX >= mainStart[0] + 150)
            {
                main.style.width = `${mainSize[0] + moveX}px`;
            }
            break;
        case 'se':
            if (mainStart[0] + mainSize[0] + moveX < right && mainStart[0] + mainSize[0] + moveX >= mainStart[0] + 150)
            {
                main.style.width = `${mainSize[0] + moveX}px`;  
            }
            if (mainStart[1] + mainSize[1] + moveY < bottom && mainStart[1] + height + moveY >= mainStart[1] + 150)
            {
                main.style.height = `${mainSize[1] + moveY}px`;
            }
            break;
        case 's':
            if (mainStart[1] + mainSize[1] + moveY < bottom && mainStart[1] + height + moveY >= mainStart[1] + 150)
            {
                main.style.height = `${mainSize[1] + moveY}px`;
            }
            break;
        case 'sw':
            if (mainStart[1] + mainSize[1] + moveY < bottom && mainStart[1] + height + moveY >= mainStart[1] + 150)
            {
                main.style.height = `${mainSize[1] + moveY}px`;
            }
            if (mainStart[0] + moveX > left && mainStart[0] + moveX <= mainStart[0] + width - 150)
            {
                main.style.width = `${mainSize[0] - moveX}px`;
                main.style.left = `${mainStart[0] + moveX}px`;
            }
            break;
        case 'w':
            if (mainStart[0] + moveX > left && mainStart[0] + moveX <= mainStart[0] + width - 150)
            {
                main.style.width = `${mainSize[0] - moveX}px`;
                main.style.left = `${mainStart[0] + moveX}px`;
            }
            break;
        case 'nw':
            if (mainStart[0] + moveX > left && mainStart[0] + moveX <= mainStart[0] + width - 150)
            {
                main.style.width = `${mainSize[0] - moveX}px`;
                main.style.left = `${mainStart[0] + moveX}px`;    
            }
            if (mainStart[1] + moveY > top && mainStart[1] + moveY <= mainStart[1] + height - 150)
            {
                main.style.height = `${mainSize[1] - moveY}px`;
                main.style.top = `${mainStart[1] + moveY}px`;
            }
            break;
    }
}

function sizeChangeStop()
{
    main.removeEventListener('mousemove', sizeChange);
    window.addEventListener('mousemove' , mouseChange);
    let {width , height} = main.getBoundingClientRect();
    mainSize = [width , height];
    mainStart = [main.offsetLeft, main.offsetTop];
}

function mousedown(e) 
{
    header.addEventListener('mousemove', mousemove);
    header.addEventListener('mouseup', mouseup);
    mouseStart = [e.clientX , e.clientY];

    let {width , height ,top ,left} = main.getBoundingClientRect();
    console.log(width , height);
    console.log(e.clientX , e.clientY);

    e.stopPropagation();
}

function mouseup() 
{
    header.removeEventListener('mousemove', mousemove);
    mainStart = [main.offsetLeft, main.offsetTop];
}

function mousemove(e)
{
    let {top , left , right , bottom} = playground.getBoundingClientRect();
    let {width , height} = main.getBoundingClientRect();
    let moveX = mainStart[0] + (e.clientX - mouseStart[0]);
    let moveY = mainStart[1] + (e.clientY - mouseStart[1]);

    if (moveX > left && moveX < right - width)
    {
        main.style.left = `${moveX}px`;
    }

    if (moveY > top && moveY < bottom - height)
    {
        main.style.top = `${moveY}px`;
    }
}

function mouseout()
{
    header.removeEventListener('mousemove', mousemove);
    mouseup();
}