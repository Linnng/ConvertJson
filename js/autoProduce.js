
function ObjInit(jsonFile){

    autoProdMix($('#sensorContainer'), jsonFile.sensorlists);
    autoProdMix($('#plxContainer'), jsonFile.plxthrottletables);
    autoProdMix($('#gfxContainer'), jsonFile.gfxthrottletables);
    autoProdMixChg($('#chgContainer'), jsonFile.chargerthrottletables);
    autoProdMixFan($('#FanContainer'), jsonFile.fancontrollerlists);
    autoProdMixMs($('#MsContainer'), jsonFile.msthermals);
    autoProdMixThermal($('#fanTableContainer'), jsonFile.thermaltables);

    // err
    if(errArr.length > 0){
        // warn級別log輸出
        console.warn('--------------------Error Message--------------------');
        var errMsg = "The following Ustt mode table will miss. Due to it does not match this tool. If necessary, please fill in this table manually after storing the JSON file.\n\n";
        errArr.forEach(function(val,index){
            console.warn(val);
            errMsg += val;
        });
        alert(errMsg);
    }
}

// =====================for errMsg========================
var errArr = [];
function errAdd(jqSelectorDesc, desc){
    // let errMsg = $(jqSelectorDesc).parents('.container').attr('id') + ' -> ' + desc;
    let errMsg = desc + '\n';
    if(!errArr.includes(errMsg))
        errArr.push(errMsg);
}

// =====================for thermaltables(fan2主控權在fancontrollerlists)========================
function autoProdMixThermal(containerName, jsonObj){
    if(jsonObj != undefined){
        // reset
        $(containerName).find('.sensor_sku_container').remove();

        // prod-sku
        let nameArr = new Array();
        jsonObj.forEach(function(val,index){
            if(val.name.indexOf('COOL') > -1 && !nameArr.includes(val.name)){
                nameArr.push(val.name.substring(0, val.name.indexOf('COOL')));
            }
        });
        nameArr.forEach(function(val,index){
            addThermalSkuProd($(containerName), val);
        });

        // prod-val
        jsonObj.forEach(function(val,index){
            if(val.name.indexOf('BAL') > -1 || val.name.indexOf('COOL') > -1 || val.name.indexOf('QUIET') > -1 || val.name.indexOf('PERF') > -1)
                autoProdThermal(containerName, val.name, val['fans']);
            else
                errAdd($(containerName).find('#addModuleBtn'), val.name);
        });
		
		// if thermaltables's data loss the basic mode, add the basic thead
		$(containerName).find('.nodes_tab').each(function(){
			if('' == $(this).html()){
				$(this).append(`<tr class="nodes_tr">
                            <th style="width: 80px;"><div class="sensorDelete" onclick="AddFanRow(this);"><span>Add</span></div></th>
                            <th style="width: 80px;"><span class="transparet">btn</span></th>
                            <th style="width: 100px;">Sensor Name</th>
                            <th style="width: 182.5px;">Low Temp</th>
                            <th style="width: 182.5px;">Low Rpm</th>
                            <th style="width: 182.5px;">High Temp</th>
                            <th style="width: 182.5px;">High Rpm</th>
                            <th class="hidden" style="width: 182.5px;">ttrip</th>
                            <th class="hidden" style="width: 182.5px;">ttriphys</th>
                        </tr>`);
			}
		});

        SetSensorComTabWid(-1);
    }
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

function autoProdThermal(containerName, name, jsonObj){

    let modelName;
    let mode;

    if(name.indexOf('BAL') > -1){
        modelName = name.substring(0, name.indexOf('BAL'));
        mode = 'BAL';
    }else if(name.indexOf('COOL') > -1){
        modelName = name.substring(0, name.indexOf('COOL'));
        mode = 'COOL';
    }else if(name.indexOf('QUIET') > -1){
        modelName = name.substring(0, name.indexOf('QUIET'));
        mode = 'QUIET';
    }else if(name.indexOf('PERF') > -1){
        modelName = name.substring(0, name.indexOf('PERF'));
        mode = 'PERF';
    }

    jsonObj.forEach(function(val,index){

        // mainElement
        let ele;
        if(val['fanname'].indexOf('FAN1') > -1){
            ele = $(containerName).find('#' + modelName + ' .' + mode).find('.nodes_tab');
        }else{
            ele = $(containerName).find('#' + modelName + ' .' + mode).next( ".node_type_box_2").find('.nodes_tab');
        }

        // setFanName
        $(ele).parents('.node_type_box').find('.fan_id input').val(val['fanname']);

        // thead
        $(ele).append(`<tr class="nodes_tr">
                            <th style="width: 80px;"><div class="sensorDelete" onclick="AddFanRow(this);"><span>Add</span></div></th>
                            <th style="width: 80px;"><span class="transparet">btn</span></th>
                            <th style="width: 100px;">Sensor Name</th>
                            <th style="width: 182.5px;">Low Temp</th>
                            <th style="width: 182.5px;">Low Rpm</th>
                            <th style="width: 182.5px;">High Temp</th>
                            <th style="width: 182.5px;">High Rpm</th>
                            <th class="hidden" style="width: 182.5px;">ttrip</th>
                            <th class="hidden" style="width: 182.5px;">ttriphys</th>
                        </tr>`);

        // tbody
        let keyArr = ['sensorname', 'lowtemp', 'lowrpm', 'hightemp', 'highrpm'];
        val['nodes'].forEach(function(v1,i1){
            var tr = $("<tr/>", {"class": "nodes_tr"});
            $(ele).append(tr);
            tr.append(`<td><div class="sensorDelete" onclick="AddFanRow(this);"><span>Add</span></div></td>`);
            tr.append(`<td><div class="sensorDelete" onclick="removeRow(this);"><span>Delete</span></div></td>`);
            keyArr.forEach(function(key, index) {
                // td setVal
                let td = $("<td/>");
                tr.append(td);
                let input = $("<input/>");
                td.append(input);
                input.val(v1[key]);
            });
            tr.append(`<td class="hidden"><input type="text" value="255"></td>`);
            tr.append(`<td class="hidden"><input type="text" value="0"></td>`);
        });
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
		// th name 不允許做修改, 他欄為input可修改
		if(index == 0)
			th.append(key);
		else
			th.append($("<input/>", {"type": "text", "placeholder": "(input type)", "value": key}));
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
                    errAdd(jqSelectorDesc, '資料異常');
                }
            });
        }
        // fan、ms資料大於2為異常，添加異常訊息
        if(jsonObjArr.length > 2)
            errAdd(jqSelectorDesc, '資料異常');
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

function addThermalSkuProd(e, titleName){

        var nodeSkuContainer = $("<div/>", {"class": "sensor_sku_container", "id": titleName});

        // title
        var skuInputTitle = $("<input/>", {"class": "sku_title", "type": "text", "placeholder": "(please type sku name)"});
        skuInputTitle.val(titleName);
        var skuH3 = $("<h3/>", {"class": "float_L"}).append(skuInputTitle);
        nodeSkuContainer.append(skuH3);

        var sensorFuncBtns =
        [
            {'box': 'function_btn_box float_R', 'div':'delete_module_btn', 'onclick':'removeSku(this)',       "span":'delete sku'}
        ];
        for(var i=0; i<sensorFuncBtns.length ;i++)
        {
            var funcBtnSpan= $("<span/>").text(sensorFuncBtns[i].span);
            var funcBtn    = $("<div/>", {"class": sensorFuncBtns[i].div, "onclick": sensorFuncBtns[i].onclick}).append(funcBtnSpan);
            var funcBtnBox = $("<div/>", {"class": sensorFuncBtns[i].box}).append(funcBtn);

            nodeSkuContainer.append(funcBtnBox);
        }
        nodeSkuContainer.append( $("<div/>", {"class": "clear"}) );

        // fan table
        var Ustt =
        [
            {"Ustt": '"Balance" MODE [Defalut Mode]', "tag": "BAL"},
            {"Ustt": '"Cool" MODE',                   "tag": "COOL"},
            {"Ustt": '"Quiet" MODE',                  "tag": "QUIET"},
            {"Ustt": '"Performance" MODE',            "tag": "PERF"}
        ];

        for(var k=0; k<Ustt.length; k++)
        {
            var nodeTypeBox1 = $("<div/>", {"class": "node_type_box node_type_box_1 " + Ustt[k].tag});

            // ----- fan info
            var nodeTypeTag  = $("<p/>", {"class": "hidden node_type_tag"}).text(Ustt[k].tag);
            var nodeType     = $("<span/>", {"class": "node_type float_L"}).text(Ustt[k].Ustt);
            var fanId        = $("<span/>", {"class": "fan_id float_L"}).append($("<input/>", {"type": "text", "placeholder": "(Input Fan)", "value": "FAN1"}));
            var clear        = $("<div/>",  {"class": "clear"});
            nodeTypeBox1.append(nodeTypeTag).append(nodeType).append(fanId).append(clear);

            // ----- fan table
            var nodeTab = $("<table/>", {"class": "nodes_tab"});
            nodeTypeBox1.append(nodeTab);
            nodeSkuContainer.append(nodeTypeBox1);
        }

        $(e).append(nodeSkuContainer);

        // reset the node_type_box_1 width
        $(e).find('.sensor_sku_container:last .node_type_box').each(function(){
            var nodeTypeBoxIndex = $(this).index('.node_type_box');
            SetFanTabWid(nodeTypeBoxIndex);
        });

        // Fan 2------------------------------------------------------------
        if(TwoFanCheck)
        {
            // fins the .sensor_sku_container index of fan table.
            var nodeTypeBoxIndex = $(e).find('.sensor_sku_container:last').index('#fanTableContainer .sensor_sku_container');
            showFan2_thermalFanLTable(nodeTypeBoxIndex);
        }
}

function showFan2_thermalFanLTable(index)
{
    let target;

    if(index == -1)
        target = $('#fanTableContainer').find('.node_type_box_1');
    else
        target = $('#fanTableContainer').find('.sensor_sku_container:eq(' + index +') .node_type_box_1');


        $(target).each(function(){

            // ----- count sensor
            var nodeTag  = $(this).find(".node_type_tag").text();   // BAL, COOL, QUIET, PERF
            var nodeSensor = [];    // array for store each table's sensor node
            $(this).find('.nodes_tab .nodes_tr').each(function(){
                if( $(this).find('td:eq(2) input').val() != undefined)
                    nodeSensor.push($(this).find('td:eq(2) input').val());
            });

            var nodeTypeBox2 = $("<div/>", {"class": "node_type_box node_type_box_2"});
            // ----- fan info
            var nodeTypeTag  = $("<p/>", {"class": "hidden node_type_tag"}).text(nodeTag);
            var nodeType     = $("<span/>", {"class": "node_type float_L"});
            var fanId        = $("<span/>", {"class": "fan_id float_L"}).append($("<input/>", {"type": "text", "placeholder": "(Input Fan)", "value": "FAN2"}));
            var clear        = $("<div/>",  {"class": "clear"});
            nodeTypeBox2.append(nodeTypeTag).append(nodeType).append(fanId).append(clear);

            // ----- fan table
            var nodeTab = $("<table/>", {"class": "nodes_tab"});
            nodeTypeBox2.append(nodeTab);

            $(this).after(nodeTypeBox2);

            // reset the width
            var thisIndex = $(this).parents('#fanTableContainer').find('.node_type_box').index($(this).next('.node_type_box'));
            SetFanTabWid(thisIndex);
        });
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