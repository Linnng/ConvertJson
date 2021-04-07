
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
                    let tabCnt       = 0;

                    // The loop for the HTML <table>
                    $(".node_type_box").each(function(){
                        let tabRowCnt      = 0;
                        // The loop for the Obj
                        for(let i=0; i<objArrLength; i++){
                            let domNodeTypeTag = $('.node_type_tag')[tabCnt].innerHTML;
                            let objSkuName     = thermaltablesJsonObj[i].name;

                            // compare the Obj name with the <p> element, and fill in
                            if(objSkuName.substring(objSkuName.indexOf('_')+1) == domNodeTypeTag){
                                // fill into tables
                                // bug!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                let test = $(this).find('tr:eq(0) th:eq(' + tabRowCnt + ')').text();
                                if(test != null && test != undefined){
                                    alert(test);
                                    tabRowCnt++;
                                }
                                // bug!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                            }
                        }
                        tabCnt++;
                    });
                }


            } catch (error){
                console.error(error);
                alert('Q Q....');
            }
        }
    });
});