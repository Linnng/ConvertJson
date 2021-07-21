
$(function(){
    $('#Fan_AddSku_Btn').click(function(e){

        var sensorSkuContainer = $("<div/>", {"class": "sensor_sku_container"});

        // <input> title
        var sensorInputTitle = $("<input/>", {"class": "sku_title", "type": "text", "placeholder": "(please type sku name)"});

        var CurrentSkuCnt = $(e.target).parents('.container').find('.sensor_sku_container').length;

        if(CurrentSkuCnt == 0)
            sensorInputTitle.val('Common');

        var sensorH4 = $("<h4/>", {"class": "float_L"}).append(sensorInputTitle);
        sensorSkuContainer.append(sensorH4);

        // Delete Sku button
        var sensorFuncBtns =
        [
            {'box': 'function_btn_box float_R', 'div':'delete_module_btn', 'onclick':'removeSku(this)',       "span":'delete sku'}
        ];

        for(var i=0; i<sensorFuncBtns.length ;i++)
        {
            var funcBtnSpan= $("<span/>").text(sensorFuncBtns[i].span);
            var funcBtn    = $("<div/>", {"class": sensorFuncBtns[i].div, "onclick": sensorFuncBtns[i].onclick}).append(funcBtnSpan);
            var funcBtnBox = $("<div/>", {"class": sensorFuncBtns[i].box}).append(funcBtn);

            sensorSkuContainer.append(funcBtnBox);
        }
        sensorSkuContainer.append( $("<div/>", {"class": "clear"}) );

// -----------------------------------------------------------------------
// Objects

        var fanInitTit =
        [
            {'title': 'name'       , 'fan1':'GFAN1CTRL'            },
            {'title': 'address'    , 'fan1':'GFAN1ADDR'            },
            {'title': 'initfn'     , 'fan1':'MecGuardianInit'      },
            {'title': 'minfanfn'   , 'fan1':'MecGuardianGetMinRpm' },
            {'title': 'rpmreadfn'  , 'fan1':'MecGuardianRpmRead'   },
            {'title': 'setcpfn'    , 'fan1':'MecGuardianSetFanPwm' },
            {'title': 'optionalfan', 'fan1':'NULL'                 }
        ];
        var fanListTit =
        [
            {'title': 'name'            },
            {'title': 'address'         },
            {'title': 'minrpm'          },
            {'title': 'maxrpm'          },
            {'title': 'diagclass'       },
            {'title': 'diagfanlowspec'  },
            {'title': 'diagfanhighspec' },
            {'title': 'diagfanmaxspec'  },
            {'title': 'fanfailuretime'  },
            {'title': 'fanfailurecode'  },
            {'title': 'mfgmoderpm'      },
            {'title': 'mincont0time'    },
            {'title': 'ksstart'         },
            {'title': 'kswait'          },
            {'title': 'kspass'          },
            {'title': 'ksfail'          },
            {'title': 'ksbump'          },
            {'title': 'esecup'          },
            {'title': 'esecdown'        },
            {'title': 'qsecup'          },
            {'title': 'qsecdown'        },
            {'title': 'hsecup'          },
            {'title': 'hsecdown'        },
            {'title': 'secup'           },
            {'title': 'secdown'         },
            {'title': 'powerfn'         },
            {'title': 'diagfanerrorpercent'     },
            {'title': 'diagsfanvalidsamples'    },
            {'title': 'diagsfansampleinterval'  }
        ];

// -----------------------------------------------------------------------
// table 1

        // Fan init - btn
        sensorSkuContainer.append( $("<span/>", {"class": "table_describe float_L"}).text('Fan initial'));
        var funcBtn = $("<div/>", {"class": "add_sensor_btn", "onclick": "AddSensorColumn(this)"}).append( $("<span/>").text('Add type') );
        sensorSkuContainer.append( $("<div/>", {"class": "function_btn_box float_L"}).append(funcBtn) );
        sensorSkuContainer.append( $("<div/>", {"class": "clear"}) );

        var scrollBoxDiv = $("<div/>", {"class": "horizon_scroll_box"});
        var sensorTab    = $("<table/>", {"class": "sensor_tab"});

        // Fan init - table
        for(var i=0; i<3 + TwoFanCheck; i++)
        {
            var sensorTr = $("<tr/>", {"class": "sensor_tr"});
            for(var j=0; j<fanInitTit.length +1; j++)
            {
                if(i == 0)
                {
                    if(j < 2)
                    {
                        var span = $("<span/>", {"class": "transparet"}).text('btn');
                        var sensorTd = $("<td/>").append(span);
                    }
                    else
                    {
                        var deleteSpan = $("<span/>").text('Delete');
                        var deleteDiv  = $("<div/>", {"class": "sensorDelete", "onclick": "removeColumn(this)"}).append(deleteSpan);
                        var sensorTd = $("<td/>").append(deleteDiv);
                    }
                }

                else if(i == 1)
                {
                    if(j == 0)
                    {
                        var sensorTd = $("<th/>").append( $("<span/>", {"class": "transparet"}).text('btn') );
                    }
                    else if(j == 1)
                    {
                        var sensorTd = $("<th>").text(fanInitTit[j - 1].title);
                    }
                    else
                    {
                        var sensorTd = $("<th/>").append( $("<input/>", {"type": "text", "placeholder": fanInitTit[j -1].title, "value": fanInitTit[j -1].title}) );
                    }
                }

                else
                {
                    if(j == 0)
                    {
                        var deleteSpan   = $("<span/>").text('Delete');
                        var deleteStrike = $("<STRIKE/>").append(deleteSpan);
                        var deleteDiv  = $("<div/>", {"class": "sensorDelete"}).append(deleteStrike);
                        var sensorTd = $("<td/>").append(deleteDiv);
                    }
                    else
                    {
                        var sensorInput = $("<input/>", {"type": "text"});
                        if(i<3)
                            sensorInput.attr("placeholder", fanInitTit[j -1].fan1);
                        var sensorTd = $("<td/>").append(sensorInput);
                    }
                }
                sensorTr.append(sensorTd);
            }
            sensorTab.append(sensorTr);
        }

        scrollBoxDiv.append(sensorTab);
        sensorSkuContainer.append(scrollBoxDiv);

        $('#FanContainer').append(sensorSkuContainer);

        // reset table width
        var sensorTabCnt = $(e.target).parents('.container').find('.sensor_sku_container:last').find('.sensor_tab').index('.sensor_tab');
        SetSensorComTabWid(sensorTabCnt);

// -----------------------------------------------------------------------
// table 2

        // Fan list - btn
        sensorSkuContainer.append( $("<span/>", {"class": "table_describe float_L"}).text('Fan lists'));
        var funcBtn = $("<div/>", {"class": "add_sensor_btn", "onclick": "AddSensorColumn(this)"}).append( $("<span/>").text('Add type') );
        sensorSkuContainer.append( $("<div/>", {"class": "function_btn_box float_L"}).append(funcBtn) );
        sensorSkuContainer.append( $("<div/>", {"class": "clear"}) );

        var scrollBoxDiv = $("<div/>", {"class": "horizon_scroll_box"});
        var sensorTab    = $("<table/>", {"class": "sensor_tab"});

        // Fan list - table
        for(var i=0; i<3 + TwoFanCheck; i++)
        {
            var sensorTr = $("<tr/>", {"class": "sensor_tr"});
            for(var j=0; j<fanListTit.length +1; j++)
            {
                if(i == 0)
                {
                    if(j < 2)
                    {
                        var span = $("<span/>", {"class": "transparet"}).text('btn');
                        var sensorTd = $("<td/>").append(span);
                    }
                    else
                    {
                        var deleteSpan = $("<span/>").text('Delete');
                        var deleteDiv  = $("<div/>", {"class": "sensorDelete", "onclick": "removeColumn(this)"}).append(deleteSpan);
                        var sensorTd = $("<td/>").append(deleteDiv);
                    }
                }

                else if(i == 1)
                {
                    if(j == 0)
                    {
                        var sensorTd = $("<th/>").append( $("<span/>", {"class": "transparet"}).text('btn') );
                    }
                    else if(j == 1)
                    {
                        var sensorTd = $("<th>").text(fanListTit[j - 1].title);
                    }
                    else
                    {
                        var sensorTd = $("<th/>").append( $("<input/>", {"type": "text", "placeholder": fanListTit[j -1].title, "value": fanListTit[j -1].title}) );
                    }
                }

                else
                {
                    if(j == 0)
                    {
                        var deleteSpan   = $("<span/>").text('Delete');
                        var deleteStrike = $("<STRIKE/>").append(deleteSpan);
                        var deleteDiv  = $("<div/>", {"class": "sensorDelete"}).append(deleteStrike);
                        var sensorTd = $("<td/>").append(deleteDiv);
                    }
                    else if(j == 1)
                    {
                        var sensorInput = $("<input/>", {"type": "text"});
                        if(i<3)
                            sensorInput.attr("value", "FAN1");

                        var sensorTd = $("<td/>").append(sensorInput);
                    }
                    else
                    {
                        var sensorInput = $("<input/>", {"type": "text", "placeholder": fanListTit[j -1].input});
                        var sensorTd = $("<td/>").append(sensorInput);
                    }
                }
                sensorTr.append(sensorTd);
            }
            sensorTab.append(sensorTr);
        }

        scrollBoxDiv.append(sensorTab);
        sensorSkuContainer.append(scrollBoxDiv);

        $('#FanContainer').append(sensorSkuContainer);

        // reset table width
        var sensorTabCnt = $(e.target).parents('.container').find('.sensor_sku_container:last .horizon_scroll_box:last').index('.horizon_scroll_box');
        SetSensorComTabWid(sensorTabCnt);
    });
});





function showFan2_FanList()
{
    $('#FanContainer').find('.sensor_tab').each(function(){    // get MsTherm table
        var Fan_th_cnt = $(this).find('th').length;                 // Count table length

        var sensorTr = $("<tr/>", {"class": "sensor_tr"});
        for(var i=0; i<Fan_th_cnt; i++)
        {
            if(i == 0)      // Delete button with <strike>
            {
                var deleteSpan = $("<STRIKE/>").append('<span/>').text('Delete');
                var deleteDiv  = $("<div/>", {"class": "sensorDelete"}).append(deleteSpan);
                var sensorTd = $("<td/>").append(deleteDiv);
            }
            else            // Show FAN2
            {
                var sensorInput = $("<input/>", {"type": "text"});
                var sensorTd = $("<td/>").append(sensorInput);
            }
            sensorTr.append(sensorTd);
        }
        $(this).append(sensorTr);
    });
}

function removeFan2_FanList()
{
    console.log('disable');
    $('#FanContainer').find('.sensor_tab').each(function(){
        $(this).find('.sensor_tr:last').remove();
    });
}