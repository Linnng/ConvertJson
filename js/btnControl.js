
$(function(){

    $('#discrete_switch').click(function(){
        if($(this).prop("checked")){
            $('.switch_txt').css('margin-left', '0');
            $('.switch_round_btn').css('left', '17px');
            $('.discrete_container').removeClass('hidden');
        }
        else{
            $('.switch_txt').css('margin-left', '-100%');
            $('.switch_round_btn').css('left', '0');
            $('.discrete_container').addClass('hidden');
        }
    });

});