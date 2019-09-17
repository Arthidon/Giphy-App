//https://api.giphy.com/v1/gifs/search?api_key=8LSSyXVeg1F9AE3vZP6m6U0ZEVSssOv7&q=lion king&limit=25&offset=0&rating=G&lang=en
$(document).ready(function () {

    function loadbuttons() {
        v = localStorage.getItem('buttons');
        if (v) {
            var listButtons = JSON.parse(localStorage.getItem('buttons'));
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

    function removeButton() {
        buttonIndex = $(this).attr('data-index')
        buttons.splice(buttonIndex, 1);
        renderButtons();
    }

    function addButton(value) {
        buttons.push(value);
        renderButtons();
        console.log('Value: ', value);
    }

    function searchGiphy(event) {
        event.preventDefault();
        var value = $('#search').val();
        addButton(value);
        localStorage.setItem('buttons', JSON.stringify(buttons));


        //AJAX

        url = endpoint + '&q=' + value;

        $.ajax({ url: url})
        .then(function(data){
            console.log('Data: ', data);
        })
        .catch(function(error){
            console.log('Error: ', error);
        });

        console.log('Value: ', value);
    }




// variables 
var buttons = ['Batman', 'Superman', 'Aquaman'];
var API_KEY = '8LSSyXVeg1F9AE3vZP6m6U0ZEVSssOv7';
var endpoint = "http://api.giphy.com/v1/gifs/search?&api_key=8LSSyXVeg1F9AE3vZP6m6U0ZEVSssOv7";
loadbuttons ();
renderButtons();

//On click events
$(document).on('click', '.btn-delete' , removeButton);
$('#submit-button').on('click', searchGiphy);


//document.ready
})