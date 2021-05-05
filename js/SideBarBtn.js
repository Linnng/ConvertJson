
$(function(){
    document.getElementById('backBtn').addEventListener("click", function(e){
        location.reload();
    }, false);
    document.getElementById('hintBtn').addEventListener("click", function(e){
        $('.hint_container').removeClass('hidden');
    }, false);
    document.getElementById('closeHint').addEventListener("click", function(e){
        $('.hint_container').addClass('hidden');
    }, false);
});