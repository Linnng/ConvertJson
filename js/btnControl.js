
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
            $('.fan_desc_tab').find('tr:eq(3)').removeClass('hidden');
        }
        else{
            $('.fan_desc_tab').find('tr:eq(3)').addClass('hidden');
        }
    });

    // Plx throttle discrete switch
    $('#PlxThrottle_discrete_switch').click(function(){
        if($(this).prop("checked")){
            $('.plx_throttle_dis_container').removeClass('hidden');
        }
        else{
            $('.plx_throttle_dis_container').addClass('hidden');
        }
    });

    // Gfx throttle discrete switch
    $('#GfxThrottle_discrete_switch').click(function(){
        if($(this).prop('checked')){
            $('.Gfx_discrete_container').removeClass('hidden');
        }
        else{
            $('.Gfx_discrete_container').addClass('hidden');
        }
    });
});
