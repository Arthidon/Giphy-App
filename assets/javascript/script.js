//https://api.giphy.com/v1/gifs/search?api_key=8LSSyXVeg1F9AE3vZP6m6U0ZEVSssOv7&q=lion king&limit=25&offset=0&rating=G&lang=en
var buttons = ['Batman', 'Superman', 'Aquaman'];

function loadbuttons () {
   var listButtons = JSON.parse(localStorage.getItem('buttons') );
   buttons = listButtons;
}


function renderButtons() {
    $('.recent-search').empty();
    for (var i = 0; i < buttons.length; i++) {
        var buttonName = buttons[i];
        
        

        var button = `
        <div class="wrap-buttons">
            <button class="btn btn-search" data-name="${buttonName}">
            ${buttonName}
            </button>
            <button class="btn btn-delete fas fa-times"" data-name"${buttonName}">
            </button>
        </div>
        `;

        $('.recent-search').append(button);

    }

    localStorage.setItem('buttons', JSON.stringify(buttons));
}

loadbuttons ()
renderButtons();


$('#submit-button').on('click', function (event) {
    event.preventDefault();


    var value = $('#search').val();
    buttons.push(value);
    renderButtons();

    console.log('Value: ', value);

});