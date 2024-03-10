let warning_block = document.querySelector('.warning');
let icon = document.querySelector('#icon');
function removeWarning(){
    warning_block.style.display = 'none';
}
let count = document.querySelector('#count');
count.addEventListener('change', ()=>{
    const inptValue = count.value.trim()
    if((!/^\d+$/.test(inptValue)) ||  count.value > 1000){
        count.value = 5;
        warning_block.style.display = 'block';
        warning_block.querySelector('p').innerText = "It can't be a string and it should less than 1000"
        
    }else{
        removeWarning();
    }
});
document.querySelector('.decrementar').addEventListener('click', (e) =>{
    if(parseInt(count.value) === 0){
        return
    }
    count.value = parseInt(count.value) -1; 
});
document.querySelector('.incrementar').addEventListener('click', (e) =>{
    if(parseInt(count.value) >= 1000){
        return
    }
    count.value = parseInt(count.value) + 1; 
});

setInterval(()=>{

    if(icon.classList.contains('fa-comment-sms')){
        icon.classList.remove('fa-comment-sms');
        icon.classList.add('fa-bomb');
    }else{
        icon.classList.remove('fa-bomb');
        icon.classList.add('fa-comment-sms');
    }
}, 2500);