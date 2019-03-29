// Ensures that the DOM is ready before executing any JavaScript

$(document).ready(function () {

    // Array of movies

    var movies = ["Dumbo", "The Lion King", "The Little Mermaid", "Snow White and the Seven Dwarfs", "Frozen", "Beauty and the Beast", "Cinderella", "Pinocchio", "Bambi"];

    // function for creating the buttons 

    function renderButtons() {

        // Deletes buttons prior to adding new movies, so that there will be no repeat buttons

        $("#buttonsView").empty();

        for (var i = 0; i < movies.length; i++) {

            // Dynamically creating buttons for movies in the array and displaying them in the appropriate div

            var btn = $('<button>')
            btn.addClass('movie');
            btn.attr('data-name', movies[i]);
            btn.text(movies[i]);
            $("#buttonsView").append(btn);
            $("#movieInput").val("");
        }
    };

    renderButtons();

    // Adds the buttons for movies entered into the input form

    $("#addMovie").on("click", function () {
        event.preventDefault();
        var movie = $("#movieInput").val().trim();
        movies.push(movie);
        renderButtons();
        return;
    });

// Function created to display the gifs

    function displayGifs() {
        var movie = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=2270exNnb9XWD9fMZnpAS03sgU2MGxpi&limit=10";

        // Makes the AJAX request with the queryURL above

        $.ajax({ url: queryURL, method: "GET" }).done(function (response) {
           
            // Saves the results as a variable

            var results = response.data;

            // For loop goes through each gif and adds these variables

            for (var i = 0; i < results.length; i++) {

                // Creates a generic div to hold the results

                var gifDiv = $('<div class=gifs>');
                var movieGif = $('<img>');
                
                movieGif.attr('src', results[i].images.fixed_height_still.url);

                // Displays the movie rating on hover

                movieGif.attr('title', "Rating: " + results[i].rating);
                movieGif.attr('data-still', results[i].images.fixed_height_still.url);
                movieGif.attr('data-state', 'still');
                movieGif.addClass('gif');
                movieGif.attr('data-animate', results[i].images.fixed_height.url);

                gifDiv.append(movieGif)


                $("#requestedGifs").prepend(gifDiv);
            }

        });
    }

    // Function to either animate the gifs or stop animation

    $(document).on('click', '.gif', function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        };
    });


    // Function for displaying movie gifs

    $(document).on("click", ".movie", displayGifs);

});