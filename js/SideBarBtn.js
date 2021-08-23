
$(function(){
    document.getElementById('backBtn').addEventListener("click", function(e){
        location.reload();
    }, false);
    document.getElementById('hintBtn').addEventListener("click", function(e){
        $('#coverHint').removeClass('hidden');
        $(window).scrollTop(0);     // reset to top

        $('#mainDiv').hide();

    }, false);
    document.getElementById('closeHint').addEventListener("click", function(e){
        $('#coverHint').addClass('hidden');
        $(window).scrollTop(0);     // reset to top

        $('#mainDiv').show();

    }, false);
});
