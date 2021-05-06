
$(function(){
    document.getElementById('backBtn').addEventListener("click", function(e){
        location.reload();
    }, false);
    document.getElementById('hintBtn').addEventListener("click", function(e){
        $('.hint_container').removeClass('hidden');
        $(window).scrollTop(0);  // reset to top

        $('#mainDiv').hide();   //method 1
        // bindScroll();    //method 2

    }, false);
    document.getElementById('closeHint').addEventListener("click", function(e){
        $('.hint_container').addClass('hidden');
        $(window).scrollTop(0);  // reset to top

        $('#mainDiv').show();    //method 1
        // unbindScroll();    //method 2

    }, false);
});

//bindScroll
function bindScroll() {
    var enableScrollHeight = ($('#coverHint').height() + 700) - $(window).height();  //可捲動長度(+700是因為jq取出高度並未包含padding)
    $(document).on('scroll',function (e) {
        limitScroll(enableScrollHeight);
    });
}

//unbindScroll
function unbindScroll() {
    $(document).unbind('scroll');
}

//限制scrollBar捲動長度
function limitScroll(height){
    // console.log($(window).scrollTop());    //當前捲動長度. 頂點為0,往下捲動則增加
    if($(window).scrollTop() >= height){
        $(window).scrollTop(height);
    }
}