
function ObjInit(jsonFile){

    autoProdMix($('#sensorContainer'), jsonFile.sensorlists);
    autoProdMix($('#plxContainer'), jsonFile.plxthrottletables);
    autoProdMix($('#gfxContainer'), jsonFile.gfxthrottletables);
    autoProdMixChg($('#chgContainer'), jsonFile.chargerthrottletables);
    autoProdMixFan($('#FanContainer'), jsonFile.fancontrollerlists);
    autoProdMixMs($('#MsContainer'), jsonFile.msthermals);
    console.log(errArr);

}

// =====================for errMsg========================
var errArr = [];
function errAdd(jqSelectorDesc){
    let errMsg = $(jqSelectorDesc).parents('.container').attr('id') + ' -> 資料異常, 缺少/遺失部分資料';
    if(!errArr.includes(errMsg))
        errArr.push(errMsg);
}

// =====================for msthermals(fan2主控權在fancontrollerlists)========================
function autoProdMixMs(containerName, jsonObj){
    if(jsonObj != undefined){
        // reset
        $(containerName).find('.sensor_sku_container').remove();
        // prod
        jsonObj['configs'].forEach(function(val,index){
            addMsSkuProd($(containerName), val['name'], val['sensor']);
            autoProd($(containerName).find('.sensor_tab:eq(' + index + ')'), val['nodes'], 'sensor_tr');
        });
    }
}

// =====================for fancontrollerlists========================
function autoProdMixFan(containerName, jsonObj){
    if(jsonObj != undefined){
        // fan2 Show
        let twoFans = false;
        jsonObj.forEach(function(val,index){
            Object.keys(val).forEach(function(key, keyIndex) {
                if(val[key].length > 1)
                    twoFans = true;
            });
        });
        if(twoFans){
            $('#twofans_switch').click();
        }
        // reset
        $(containerName).find('.sensor_sku_container').remove();
        // prod
        let tabCnt = 0;
        jsonObj.forEach(function(val,index){
            Object.keys(val).forEach(function(key, keyIndex) {
                addFanSkuProd($(containerName), key);
                if(tabCnt != 0)
                    tabCnt++;
                let iniObj = [];
                let listObj = [];
                val[key].forEach(function(v,i){
                    iniObj.push(v);
                    listObj.push(v['fanlist'][0]);
                    delete iniObj[i]['fanlist'];
                });
                autoProd($(containerName).find('.sensor_tab:eq(' + (tabCnt++) + ')'), iniObj, 'sensor_tr');
                autoProd($(containerName).find('.sensor_tab:eq(' + tabCnt + ')'), listObj, 'sensor_tr');
            });
        });
    }
}

// =====================for chargerthrottletables========================
function autoProdMixChg(containerName, jsonObj){
    if(jsonObj != undefined){
        $('#chgThrottle_switch').click();
        $(containerName).find('.sensor_sku_container').remove();
        addSkuProd($(containerName), jsonObj['sensorname']);
        autoProd($(containerName).find('.sensor_tab:eq(0)'), jsonObj['zones'], 'sensor_tr');
        $(containerName).find('.sensor_sku_container .delete_module_btn').remove();
    }
}

// =====================for sensorlists、plxthrottletables、gfxthrottletables========================
function autoProdMix(containerName, jsonObj){
    $(containerName).find('.sensor_sku_container').remove();
    jsonObj.forEach(function(val,index){
        if(val != undefined){
            Object.keys(val).forEach(function(key, keyIndex) {
                addSkuProd($(containerName), key);
                autoProd($(containerName).find('.sensor_tab:eq(' + index + ')'), val[key], 'sensor_tr');
            });
        }
    });
}

function autoProd(jqSelectorDesc, jsonObjArr, trClassName){

    // reset
    $(jqSelectorDesc).html('');

    //collect keyArr
    let keyArr = [];
    jsonObjArr.forEach(function(val,index){
         Object.keys(val).forEach(function(key, keyIndex) {
            if(!keyArr.includes(key))
                keyArr.push(key);
         });
    });

    // ------------------thead------------------
    let delTr = $("<tr/>", {"class": trClassName});
    let tr = $("<tr/>", {"class": trClassName});
    $(jqSelectorDesc).append(delTr);
    $(jqSelectorDesc).append(tr);
    // first col
    tr.append(`<th><span class="transparet">btn</span></th>`);
    delTr.append(`<td><span class="transparet">btn</span></td>`);
    keyArr.forEach(function(key, index) {
        //delCol
        if(key.indexOf('name') > -1 || (jqSelectorDesc.parents('.container').attr('id') == 'MsContainer' && key.indexOf('fan') > -1)){
            delTr.append(`<td><span class="transparet">btn</span></td>`);
        }else{
            let delTd = $("<td/>");
            delTd.append(`<div class="sensorDelete" onclick="removeColumn(this);"><span>Delete</span></div>`);
            delTr.append(delTd);
        }
        // th thead
        let th = $("<th/>");
        th.append(key);
        tr.append(th);
    });
    // ------------------thead------------------


    // ------------------tbody------------------
    if(jqSelectorDesc.parents('.container').attr('id') == 'FanContainer' || jqSelectorDesc.parents('.container').attr('id') == 'MsContainer'){
        let fanNum = 1;
        if($('#twofans_switch').prop('checked'))
            fanNum++;
        for(let i = 0; i < fanNum; i++){
            let tr = $("<tr/>", {"class": trClassName});
            $(jqSelectorDesc).append(tr);
            // first col
            tr.append(`<td><div class="sensorDelete"><strike><span>Delete</span></strike></div></td>`);
            keyArr.forEach(function(key, index) {
                // td setVal
                let td = $("<td/>");
                tr.append(td);
                let input = $("<input/>");
                td.append(input);
                try{
                    input.val(jsonObjArr[i][key]);
                }catch(err) {
                    errAdd(jqSelectorDesc);
                }
            });
        }
        // fan、ms資料大於2為異常，添加異常訊息
        if(jsonObjArr.length > 2)
            errAdd(jqSelectorDesc);
    }else{
        jsonObjArr.forEach(function(val,index){
            let tr = $("<tr/>", {"class": trClassName});
            $(jqSelectorDesc).append(tr);
            // first col
            tr.append(`<td><div class="sensorDelete" onclick="removeRow(this);"><span>Delete</span></div></td>`);
            keyArr.forEach(function(key, index) {
                // td setVal
                let td = $("<td/>");
                tr.append(td);
                if(key !== 'pollingrate'){
                    let input = $("<input/>");
                    td.append(input);
                    input.val(val[key]);
                }else{
                    let sel = $("<select/>", {"name": "pollingrate", "class": "selects"});
                    for(var j=0; j<cusOpt.length ;j++){
                        let opt = $("<option/>", {"value": cusOpt[j].value});
                        opt.append(cusOpt[j].text);
                        if(val[key] == cusOpt[j].value)
                            opt.prop("selected", true);
                        sel.append(opt);
                    }
                    td.append(sel);
                }
            });
        });
    }
    // ------------------tbody------------------

    SetSensorComTabWid(-1);
}

function addSkuProd(e, titleName){

        var sensorSkuContainer = $("<div/>", {"class": "sensor_sku_container"});

        // <input> title
        var sensorInputTitle = $("<input/>", {"class": "sku_title", "type": "text", "placeholder": "(please type sku name)"});

        // set Title Andy
        sensorInputTitle.val(titleName);

        var sensorH4 = $("<h4/>", {"class": "float_L"}).append(sensorInputTitle);

        sensorSkuContainer.append(sensorH4);


        for(var i=0; i<sensorFuncBtns.length ;i++)
        {
            var funcBtnSpan= $("<span/>").text(sensorFuncBtns[i].span);
            var funcBtn    = $("<div/>", {"class": sensorFuncBtns[i].div, "onclick": sensorFuncBtns[i].onclick}).append(funcBtnSpan);
            var funcBtnBox = $("<div/>", {"class": sensorFuncBtns[i].box}).append(funcBtn);

            sensorSkuContainer.append(funcBtnBox);
        }
        sensorSkuContainer.append( $("<div/>", {"class": "clear"}) );


        // new sensor description
        var scrollBoxDiv = $("<div/>", {"class": "horizon_scroll_box"});
        var sensorTab    = $("<table/>", {"id": "sensorCommonTab", "class": "sensor_tab"});



        for(var i=0; i<3; i++)
        {
            var sensorTr = $("<tr/>", {"class": "sensor_tr"});
            for(var j=0; j<sensorTitPlaceholder.length +1 ; j++)
            {

                if(i == 0)      // delete button
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
                    sensorTr.append(sensorTd);
                }

                else if(i == 1)  // sensor Title
                {
                    if(j == 0)
                    {
                        var sensorTh = $("<th/>").append( $("<span/>", {"class": "transparet"}).text('btn') );
                    }
                    else if(j == 1)
                    {
                        var sensorTh = $("<th>").text(sensorTitPlaceholder[j - 1]);
                    }
                    else
                    {
                        var sensorTh = $("<th/>").append( $("<input/>", {"type": "text", "placeholder": sensorTitPlaceholder[j -1]}) );
                    }
                    sensorTr.append(sensorTh);
                }

                else            // input data boxes
                {
                    if(j == 0)
                    {
                        var deleteSpan = $("<span/>").text('Delete');
                        var deleteDiv  = $("<div/>", {"class": "sensorDelete", "onclick": "removeRow(this)"}).append(deleteSpan);
                        var sensorTd = $("<td/>").append(deleteDiv);
                    }
                    else if(j == 1)
                    {
                        var sensorInput = $("<input/>", {"type": "text", "placeholder": "GPU"});
                        var sensorTd = $("<td/>").append(sensorInput);
                    }
                    else
                    {
                        var sensorInput = $("<input/>", {"type": "text"});
                        var sensorTd = $("<td/>").append(sensorInput);
                    }
                    sensorTr.append(sensorTd);
                }
            }
            sensorTab.append(sensorTr);
        }
        scrollBoxDiv.append(sensorTab);
        sensorSkuContainer.append(scrollBoxDiv);

        $(e).append(sensorSkuContainer);
    }

function addFanSkuProd(e, titleName){

        var sensorSkuContainer = $("<div/>", {"class": "sensor_sku_container"});

        // <input> title
        var sensorInputTitle = $("<input/>", {"class": "sku_title", "type": "text", "placeholder": "(please type sku name)"});
        sensorInputTitle.val(titleName);

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

// table 1

        // Fan init - btn
        sensorSkuContainer.append( $("<span/>", {"class": "table_describe float_L"}).text('Fan initial'));
        var funcBtn = $("<div/>", {"class": "add_sensor_btn", "onclick": "AddSensorColumn(this)"}).append( $("<span/>").text('Add type') );
        sensorSkuContainer.append( $("<div/>", {"class": "function_btn_box float_L"}).append(funcBtn) );
        sensorSkuContainer.append( $("<div/>", {"class": "clear"}) );

        var scrollBoxDiv = $("<div/>", {"class": "horizon_scroll_box"});
        var sensorTab    = $("<table/>", {"class": "sensor_tab"});

        scrollBoxDiv.append(sensorTab);
        sensorSkuContainer.append(scrollBoxDiv);

        $(e).append(sensorSkuContainer);

// -----------------------------------------------------------------------
// table 2

        // Fan list - btn
        sensorSkuContainer.append( $("<span/>", {"class": "table_describe float_L"}).text('Fan lists'));
        var funcBtn = $("<div/>", {"class": "add_sensor_btn", "onclick": "AddSensorColumn(this)"}).append( $("<span/>").text('Add type') );
        sensorSkuContainer.append( $("<div/>", {"class": "function_btn_box float_L"}).append(funcBtn) );
        sensorSkuContainer.append( $("<div/>", {"class": "clear"}) );

        var scrollBoxDiv = $("<div/>", {"class": "horizon_scroll_box"});
        var sensorTab    = $("<table/>", {"class": "sensor_tab"});

        scrollBoxDiv.append(sensorTab);
        sensorSkuContainer.append(scrollBoxDiv);

        $(e).append(sensorSkuContainer);
    }

function addMsSkuProd(e, titleName, sensorName){

        var sensorSkuContainer = $("<div/>", {"class": "sensor_sku_container"});

        // <input> title
        var sensorInputTitle = $("<input/>", {"class": "sku_title", "type": "text", "placeholder": "(Config)"});
        sensorInputTitle.val(titleName);
        var sensorH4 = $("<h4/>").append(sensorInputTitle);
        sensorSkuContainer.append(sensorH4);

        var sensorInputTitle = $("<input/>", {"class": "sku_title", "type": "text", "placeholder": "(Sensor Name)"});
        sensorInputTitle.val(sensorName);
        var sensorH4 = $("<h4/>", {"class": "float_L"}).append(sensorInputTitle);
        sensorSkuContainer.append(sensorH4);

        // "Add sensor", "Add type" buttons

        for(var i=0; i<sensorMsFuncBtns.length ;i++)
        {
            var funcBtnSpan= $("<span/>").text(sensorMsFuncBtns[i].span);
            var funcBtn    = $("<div/>", {"class": sensorMsFuncBtns[i].div, "onclick": sensorMsFuncBtns[i].onclick}).append(funcBtnSpan);
            var funcBtnBox = $("<div/>", {"class": sensorMsFuncBtns[i].box}).append(funcBtn);

            sensorSkuContainer.append(funcBtnBox);
        }
        sensorSkuContainer.append( $("<div/>", {"class": "clear"}) );


        // show sensor description
        var scrollBoxDiv = $("<div/>", {"class": "horizon_scroll_box"});
        var sensorTab    = $("<table/>", {"class": "sensor_tab"});


        scrollBoxDiv.append(sensorTab);
        sensorSkuContainer.append(scrollBoxDiv);;

        $(e).append(sensorSkuContainer);
}

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

var sensorTitPlaceholder =
            [
                'name',
                'type',
                'address',
                'diagclass',
                'polling ratae',
                'ReadFn',
                'MaxErrors',
                'SmoothingFn',
                'SmoothingData',
                'CriticalTemp',
                'crittime'
            ];

var sensorMsFuncBtns =
            [
                {'box': 'function_btn_box float_L', 'div':'add_sensor_btn',    'onclick':'AddSensorColumn(this)', "span":'Add type'},
                {'box': 'function_btn_box float_R', 'div':'delete_module_btn', 'onclick':'removeSku(this)',       "span":'delete Config'  }
            ];

 var sensorFuncBtns =
            [
                {'box': 'function_btn_box float_L', 'div':'add_sensor_btn',    'onclick':'AddSensorRow(this)',    "span":'Add sensor'},
                {'box': 'function_btn_box float_L', 'div':'add_sensor_btn',    'onclick':'AddSensorColumn(this)', "span":'Add type'  },
                {'box': 'function_btn_box float_R', 'div':'delete_module_btn', 'onclick':'removeSku(this)',       "span":'delete sku'}
            ];

var cusOpt =
            [
                {'value':'EXEC_POLLING',   'text':'1/8 sec'},
                {'value':'QSEC_POLLING',   'text':'1/4 sec'},
                {'value':'HSEC_POLLING',   'text':'1/2 sec'},
                {'value':'ONESEC_POLLING', 'text':'1 sec'  },
                {'value':'TWOSEC_POLLING', 'text':'2 sec'  }
            ];