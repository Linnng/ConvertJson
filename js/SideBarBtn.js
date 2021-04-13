
$(function(){
    document.getElementById('backBtn').addEventListener("click", function(e){
        $('.index_cover_container').removeClass('hidden');
        $('#exportJSON').addClass('hidden');
        $('#backBtn').addClass('hidden');
    }, false);
});