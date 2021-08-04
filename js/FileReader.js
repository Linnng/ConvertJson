
// import JOSN file into html
var resultText;

$(function(){

    document.getElementById('createNew').addEventListener("click", function(e){
        $('.index_cover_container').addClass('hidden');
        $('#exportJSON').removeClass('hidden');
        $('#backBtn').removeClass('hidden');
    }, false);

    document.getElementById('fakeImportBtn').addEventListener("click", function(e){
        document.getElementById('importJSON').click();
    }, false);

    var importJSON = $('#importJSON');
    var outputJSON = $('#outputJSON');
    importJSON.change(function(e){
        var file = e.target.files[0];
        // check file extension client's selected.
        var fileName = file.name;
        var fileExtension = fileName.substring(fileName.indexOf('.')+1).toLowerCase();
        if(fileExtension != "json"){
            alert(" please select json file! ");
            location.reload();
        }

        reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(){
            outputJSON.html(reader.result);
            resultText = reader.result;

            $('.index_cover_container').addClass('hidden');
            $('#exportJSON').removeClass('hidden');
            $('#backBtn').removeClass('hidden');

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

            // Init all objectJSON
            ObjInit(jsonObj);

        }
    });
});