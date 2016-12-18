/**
 * Created by n06rin on 18.12.16.
 */
document.querySelector("form").addEventListener('submit', function(e){
    e.preventDefault();

    var req = new XMLHttpRequest();
    req.open('GET', '/submitstring?userinput=' + encodeURIComponent(e.target.userinput.value), true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if(req.status == 200){
                console.log('мы получили ответ от сервера');
                document.getElementById('statContainer').innerHTML= req.responseText;
            }
        }
    };
    req.send(null);
});



window.addEventListener('beforeunload', function(){
    var req = new XMLHttpRequest();
    req.open('GET', '/flushsession', false);
    req.send(null);
});