
// import JOSN file into html
var resultText;

$(function(){
    document.getElementById('fakeImportBtn').addEventListener("click", function(e){
        document.getElementById('importJSON').click();
    }, false);

    var importJSON = $('#importJSON');
    var outputJSON = $('#outputJSON');
    importJSON.change(function(e){
        var file = e.target.files[0];
        reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(){
            outputJSON.html(reader.result);
            resultText = reader.result;

            $('.index_cover_container').addClass('hidden');

// load datas - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

            // Remove single-line comments
            while(resultText.match(/\s*\/\/.*$/mg)){
                resultText = resultText.replace(/\s*\/\/.*$/mg, '');
            }

            // convert string to object
            let jsonObj = JSON.parse(resultText);
            console.log('jsonObj:\n');
            console.log(jsonObj);

            try {
                let sensorlistsJsonObj        = jsonObj.sensorlists[0].common;
                let fancontrollerlistsJsonObj = jsonObj.fancontrollerlists[0].common[0].fanlist[0];
                let thermaltablesJsonObj      = jsonObj.thermaltables;


// sensorlists  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Catch <th> title to search object key value.
                if(sensorlistsJsonObj != undefined || sensorlistsJsonObj != null){
                    // the array length
                    let arrLength = sensorlistsJsonObj.length;
                    // count of columns in table
                    let objLengthCnt = 0;

                    $(".sensor_tr th").each(function(){
                        let key = $(this).text().replaceAll(' ','');

                        // Skip Polling Rate datas, cause it's <option> struct
                        if(key != 'pollingrate'){

                            // Scan the key values of each objects (arrLength), then fill-in the table line by line.
                            for(let i=0; i<arrLength; i++){
                                $(this).parents('.sensor_tab').find('tr:eq('+ (i+1) + ') td:eq(' + objLengthCnt + ') input').val(sensorlistsJsonObj[i][key]);
                        }}
                        else{
                            // get all <select> tag
                            let sel = document.getElementsByClassName('selects');
                            for( let i=0; i<arrLength; i++){
                                // get all <option> values in each <select>
                                let opts = sel[i].options;

                                for(let opt, j=0; opt = opts[j]; j++){
                                    if(opt.value == sensorlistsJsonObj[i][key]){
                                        sel[i].selectedIndex = j;
                                        break;
                                }}
                            }
                        }
                        objLengthCnt++;
                    });
                }


// fancontrollerlists - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Get the values of <th> in the DOM, then compare with the KEY of the object
// Then fill into the <td> <input> tag of the lower layer one by one
                if(fancontrollerlistsJsonObj != undefined || fancontrollerlistsJsonObj != null){
                    $(".fan_des_tab tr td :input").each(function(){
                        // the <input> index
                        let index = $(this).parent().index();

                        // Catch $(this) input corresponding value.
                        let key = $(this).parent().prev().text();

                        if(key == ''){
                            key = $(this).parents('.fan_des_tab').find('tr:eq(1) th:eq(' + index + ')').text().replaceAll(' ','').toLowerCase();

                            if(key == ''){
                                key = $(this).parents('.fan_des_tab').find('tr:eq(0) th:eq(' + index + ')').text().replaceAll(' ','').toLowerCase();
                        }}

                        // Display datas from the object
                        if(key != 'fandescription'){
                            // console.log('jsonObj key : ' + key);
                            $(this).val(fancontrollerlistsJsonObj[key]);
                        }
                        else{
                            // Exception Fan Description Manual interpolation
                            $(this).val(fancontrollerlistsJsonObj['name']);
                        }

                    });
                }


// Sensor nodes - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Using nested loops
// let thermaltablesJsonObj = jsonObj.thermaltables;

                if(thermaltablesJsonObj != undefined || thermaltablesJsonObj != null){
                    let objArrLength = thermaltablesJsonObj.length;

                    // The loop for the HTML <table>
                    $(".node_type_box").each(function(index){
                        let domTabTrCnt = $(this).find('tr').length;             // Get table <tr>

                        // The loop for the Obj
                        for(let i=0; i<objArrLength; i++){
                            let domNodeTypeTag = $('.node_type_tag')[index].innerHTML; // Get <tag> name
                            let objSkuName     = thermaltablesJsonObj[i].name;          // Get JSON name
                            let objNodesLength = thermaltablesJsonObj[i].fans[0].nodes.length; // Get nodes arr length in JSON

                            // compare the Obj name with the <p> element, and fill in
                            if(objSkuName.substring(objSkuName.indexOf('_')+1) == domNodeTypeTag){
                                // fill into tables

                                for(let j = 0; j < $(this).find('tr:eq(0) th').length; j++){                // Get table <td>
                                    let nodesTabTitle = $(this).find('tr:eq(0) th:eq(' + j + ')').text().replaceAll(' ','').toLowerCase();   // Get <th> name

                                    if(nodesTabTitle != null && thermaltablesJsonObj[0].fans[0].nodes[0][nodesTabTitle] != undefined){
                                       for(let k = 0; k<domTabTrCnt-1 ; k++){
                                           try{
                                               // <td> <input>
                                               if($(this).find('tr:eq(' + (k+1) + ') td:eq( ' + j + ') input').length > 0){
                                                   $(this).find('tr:eq(' + (k+1) + ') td:eq( ' + j + ') input').val(thermaltablesJsonObj[index].fans[0].nodes[k][nodesTabTitle]);
                                               }
                                               // pure <td>
                                               else{
                                                   $(this).find('tr:eq(' + (k+1) + ') td:eq( ' + j + ')').text(thermaltablesJsonObj[index].fans[0].nodes[k][nodesTabTitle]);
                                               }
                                           }catch{
                                               console.log('thermaltablesJSON index='+index+',row='+k+' null!!!  此json位置資料與dom無法對上')
                                           }
                                    }}
                            }}
                        }
                    });
                }


            } catch (error){
                console.error(error);
                alert('Q Q....');
            }
        }
    });
});