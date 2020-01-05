window.onload = function() {init()};

var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1ORDcMkLibfxGLP4K6jSQIYM4oTzL2aJt7iL1mpIKqF8/edit?usp=sharing';

function init() {
    Tabletop.init( { key: publicSpreadsheetUrl,
                        callback: showInfo,
                        simpleSheet: true } )
}

function showInfo(data, tabletop) {
    // alert('Successfully processed!')
    // console.log(data);
    var header = document.querySelector(".header");
    var bodytext = document.querySelector(".bodytext")

    data.forEach(function(data) {
        header.innerHTML = data.Name;
        bodytext.innerHTML = data.Food;
    })
}

// Tax dollars