
$("#search-movie").on("click", function(){
    movieName = $("#movieName").val().trim().replace(" ","+"); 
    location.href = "http://localhost:3000/movie/search/"+movieName;
});

$(".add-movie").on("click", function(){
    imdbID = $(this).data("imdb")
    console.log(imdbID);
    $.ajax({
        url: "/api/movie/add/" + imdbID,
        method: "POST"
    });
});