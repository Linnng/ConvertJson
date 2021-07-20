
var TwoFanCheck = 0;

$(function(){

    // Switch button status
    $('.switch_checkbox').click(function(){
        if($(this).prop("checked"))
        {
            $(this).siblings('label').find('.switch_bcc').css('margin-left', '0');
            $(this).siblings('label').find('.switch_round_btn').css('left', '17px');
        }
        else
        {
            $(this).siblings('label').find('.switch_bcc').css('margin-left', '-100%');
            $(this).siblings('label').find('.switch_round_btn').css('left', '0');
        }
    });

    // two fans switch
    $('#twofans_switch').click(function(){
        if($(this).prop("checked")){
            TwoFanCheck = 1;
            $('.fan_desc_tab').find('tr:eq(3)').removeClass('hidden');

            // MsThermals
            showFan2_MsThermals();
        }
        else{
            TwoFanCheck = 0;
            $('.fan_desc_tab').find('tr:eq(3)').addClass('hidden');

            // MsThermals
            removeFan2_MsThermals();
        }
    });

});
