
var TwoFanCheck = 0;

$(function(){

    // Switch button status - CSS3
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
        if($(this).prop("checked"))
        {
            TwoFanCheck = 1;
            showFan2_FanList();
            showFan2_FanLTable();
            showFan2_MsThermals();  // MsThermals
        }
        else
        {
            TwoFanCheck = 0;
            removeFan2_FanList();
            removeFan2_FanLTable();   // Fan Table
            removeFan2_MsThermals();  // MsThermals
        }
    });

});
