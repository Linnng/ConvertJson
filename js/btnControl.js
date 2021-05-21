
$(function(){

    $('#discrete_switch').click(function(){
        if($(this).prop("checked")){
            $(this).siblings('label').find('.switch_bcc').css('margin-left', '0');
            $(this).siblings('label').find('.switch_round_btn').css('left', '17px');
            $('.discrete_container').removeClass('hidden');
        }
        else{
            $(this).siblings('label').find('.switch_bcc').css('margin-left', '-100%');
            $(this).siblings('label').find('.switch_round_btn').css('left', '0');
            $('.discrete_container').addClass('hidden');
        }
    });

    $('#twofans_switch').click(function(){
        if($(this).prop("checked")){
            $(this).siblings('label').find('.switch_bcc').css('margin-left', '0');
            $(this).siblings('label').find('.switch_round_btn').css('left', '17px');
            $('.fan_desc_tab').find('tr:eq(3)').removeClass('hidden');
        }
        else{
            $(this).siblings('label').find('.switch_bcc').css('margin-left', '-100%');
            $(this).siblings('label').find('.switch_round_btn').css('left', '0');
            $('.fan_desc_tab').find('tr:eq(3)').addClass('hidden');
        }
    });

});