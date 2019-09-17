//https://api.giphy.com/v1/gifs/search?api_key=8LSSyXVeg1F9AE3vZP6m6U0ZEVSssOv7&q=lion king&limit=25&offset=0&rating=G&lang=en
$(document).ready(function(){

function loadbuttons () {
    v = localStorage.getItem('buttons');
    if (v) {
   var listButtons = JSON.parse(localStorage.getItem('buttons') );
   buttons = listButtons;
}
else {
    buttons = ['Batman', 'Superman', 'Aquaman'];
}
}

function renderButtons() {
    $('.recent-search').empty();
    for (var i = 0; i < buttons.length; i++) {
        var buttonName = buttons[i];
        
        

        var button = `
        <div class="wrap-buttons">
            <button 
                class="btn btn-search" 
                data-name ="${buttonName}"
            >${buttonName}</button>
            <button 
                class="btn btn-delete fas fa-times" 
                data-name="${buttonName}" 
                data-index="${i}"
            ></button>
        </div>
        `;

        $('.recent-search').append(button);

    }

    localStorage.setItem('buttons', JSON.stringify(buttons));
}


$('#submit-button').on('click', function (event) {
    event.preventDefault();


    var value = $('#search').val();
    buttons.push(value);
    localStorage.setItem('buttons', JSON.stringify(buttons));
    renderButtons();

    console.log('Value: ', value);

});

$(document).on('click', '.btn-delete' , function() {
    console.log('hello world');
    buttonIndex = $(this).attr('data-index')
    console.log('Button Index: ', buttonIndex);
    buttons.splice(buttonIndex, 1);
    renderButtons();

});

var buttons = ['Batman', 'Superman', 'Aquaman'];

loadbuttons ();
renderButtons();





//document.ready
})