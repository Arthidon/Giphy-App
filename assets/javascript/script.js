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
    function createGiphyTemplate(giphy){

       timeConversion =  moment(giphy.import_datetime).fromNow();
        starIndex = favorite.indexOf(giphy.id);
        isStar = starIndex !== -1 ? 'fas' : 'far';


        images = giphy.images;
        template = `
        <div class="giphy">
            <i class="${isStar} fa-star favorite" data-id="${giphy.id}" data-star="${isStar}">
            </i>
            <div class="giphy-image">
                <img src="${images.original_still.url}" 
                data-still="${images.original_still.url}" 
                data-animate="${images.original.url}" 
                data-state="still">
                <i class="fa fa-play img-play"></i>
            </div>
            <div class="giphy-info">
                <p>Rating: ${giphy.rating}</p>
                <p>${timeConversion}</p>
            </div>

            <div class="giphy-footer" data-link="${giphy.embed_url}"> 
                <p>Copy Link <i class="fa fa-link"></i></p>
            </div>
        </div>
        `;
        return template;
    }
    function renderGiphys(giphys) {
        $('.giphy-content').empty();
        for (var i = 0; i < giphys.length; i++) {
            giphy = giphys[i];
            giphyTemplate = createGiphyTemplate(giphy)
            
            $('.giphy-content').append(giphyTemplate);
        }
    }


    function fetchGiphy(value) {

        //uncheck 
        onCheck();
        //AJAX
        url = endpoint + '&q=' + value;

        $.ajax({ url: url})
        .then(function(response){
            giphys = response.data;
            previousSearch = giphys;

            renderGiphys(giphys);
            console.log('Giphys: ', response);
        })
        .catch(function(error){
            console.log('Error: ', error);
        });
        
    }


    function searchGiphy(event) {
        event.preventDefault();
        var value = $('#search').val();
        if (buttons.includes(value)){
            alert('No duplicates allowed');

        }
            else {
            
            addButton(value);
            localStorage.setItem('buttons', JSON.stringify(buttons));
            fetchGiphy(value);
        }

        $('#search').val(''); // clearing value

    }


function imgCardClick() {
    giphyCard = $(this);
    img = giphyCard.find('img');
    icon = giphyCard.find('i');
    still = img.attr('data-still');
    animate = img.attr('data-animate');
    state = img.attr('data-state');

    if (state === 'still') {
        img.attr({
            src:animate,
            'data-state': 'animate'
        });

        icon.removeClass('img-play');

    }else {
        img.attr({
            src: still,
            'data-state': 'still'
        });

        icon.addClass("img-play");
    }
}

function clipToClipBoard(value) {
    tempElement = $('<input>');
    $('body').append(tempElement);

    tempElement.val(value).select();
    document.execCommand('copy');
    tempElement.remove();
}
    function copyLink() {
        link = $(this).attr('data-link');
        content = $(this).html();
        clipToClipBoard(link);
        $(this).html('Coppied!!!');
        setTimeout(() => $(this).html(content),3000);
    }
function searchGiphyByButton(){
    buttonName = $(this).attr('data-name');
    parent = $(this).parent();
    $('.btn').parent().removeClass('active');
    parent.addClass('active');
    fetchGiphy(buttonName);
}
    function clearResults() {
        event.preventDefault();
        onCheck();
        $('.btn').parent().removeClass('active');
        $('.giphy-content').html('<p>Results Cleared!!!');
    }

    function generateRandom(arr) {
        if (arr.length > 0) {
            index = Math.floor(Math.random() * arr.length);
            value = arr[index];
            return value;
        }
        return 'superman';
    }
    function disableSearch() {
        value = $(this).val();
        if (value){
            $('#submit-button').prop('disabled', false);
        }else {
            $('#submit-button').prop('disabled', true);
        }
    }

        function setFavorite() {
            localStorage.setItem('favorite', JSON.stringify(favorite));
    }
    function loadLoadfavorite() {
        stars = JSON.parse(localStorage.getItem('favorite'));

        if(Array.isArray(stars)){
            favorite = stars;
        }
    }

    function handleFavorite(){
        star = $(this).attr('data-star');
        id = $(this).attr('data-id');

        console.log(id);
        if ( star === 'far') {
            favorite.push(id);
            setFavorite();
            $(this).removeClass('far').addClass('fas');
            $(this).attr('data-star', 'fas');
        }else {
            favorite = favorite.filter((el) => el != id);
            setFavorite();
            $(this).removeClass('fas').addClass('far');
            $(this).attr('data-star', 'far');
        }
    }
    function renderFavoriteGiphy(giphy) {
        giphyTemplate = createGiphyTemplate(giphy);
        $('.giphy-content').append(giphyTemplate);
    }

    function favoriteFilter() {
        isFavoriteOnly = $(this).is(':checked');

        if (isFavoriteOnly) {
            $('.giphy-content').empty();
            for (i = 0; i <favorite.length; i++){
                id = favorite[i];
                url = `https://api.giphy.com/v1/gifs/${id}?&api_key=8LSSyXVeg1F9AE3vZP6m6U0ZEVSssOv7`;

                $.ajax({ url: url })
                    .then((response) => {
                        renderFavoriteGiphy(response.data);
                        console.log('Rsponse: ', response);
                    })
                    .catch((error) => {
                        console.log('Error: ', error);
                    });
            }
        }else {
            renderGiphys(previousSearch);
            
        }
    }

    function onCheck() {
        $('#favoites-only').prop('checked', false);
    }

    function initApp() {
        value = generateRandom(buttons);
        loadLoadfavorite();
        loadbuttons ();
        renderButtons();
        fetchGiphy(value);
    }

// variables 
var buttons = ['Batman', 'Superman', 'Aquaman'];
var API_KEY = '8LSSyXVeg1F9AE3vZP6m6U0ZEVSssOv7';
var endpoint = "https://api.giphy.com/v1/gifs/search?&api_key=8LSSyXVeg1F9AE3vZP6m6U0ZEVSssOv7";
var favorite = [];
var previousSearch = [];
//loadbuttons ();
//renderButtons();
initApp();
//On click events
$(document).on('click', '.btn-delete' , removeButton);
$(document).on('click', '.giphy-image', imgCardClick);
$(document).on('click', '.giphy-footer', copyLink);
$(document).on('click', '.btn-search', searchGiphyByButton);
$(document).on('click', '.favorite', handleFavorite);

$('#clear-results').on('click', clearResults);
$('#submit-button').on('click', searchGiphy);
$('#search').on('keyup', disableSearch);
$('#favorite-only').on('click', favoriteFilter);



//document.ready
})