$(".dropdown-trigger").dropdown();

$(document).ready(function () {
  console.log("load")
  popularMovies();
  
  // take user to the add page
  $("#add-review").on("click", function () {
    window.location.href = "/movie/search";
  })

  $("#movie-sort a").on("click", function () {
    // console.log($(this).text())
    if ($(this).text() === "Popular") {
      console.log("Popular")
      popularMovies()
    }
    else if ($(this).text() === "New") {
      console.log("New");
      newMovies()
    }
    else if ($(this).text() === "Year") {
      console.log("Year")
      yearMovies()
    }
    else if ($(this).text() === "Title") {
      console.log("Title")
      titleMovies()
    };
  });

  // loads movie cards from the DB based on popular (boats value descending)
  function popularMovies () {
    console.log("home");
    $.ajax({
      url: "/api/movie-find/popular",
      method: "GET"
    }).then(function (response) {
      console.log(response[0]);
      for (var i=0; i<response.length; i++) {
        // front
        $(".main-card-" + i).find("#poster-img").attr("src", response[i].poster);
        $(".main-card-" + i).find("#movie-title").text(response[i].title);
        $(".main-card-" + i).find("#boat-value").text(response[i].boatsValue);
        $(".main-card-" + i).find(".up-boat").data("imdbid", response[i].imdbid);
        $(".main-card-" + i).find(".down-boat").data("imdbid", response[i].imdbid);
        $(".main-card-" + i).data("imdbid", response[i].imdbid);
        // back
        $(".main-card-" + i).find(".card-title").text(response[i].title);
        $(".main-card-" + i).find("#movie-year").text("Year: " + response[i].year);
        $(".main-card-" + i).find(".rating").text("Rating: " + response[i].rated);
        $(".main-card-" + i).find(".plot").text("Plot: " + response[i].plot);
      }
    });
  }

  function newMovies () {
    $.ajax({
      url: "/api/movie-find/newest",
      method: "GET"
    }).then(function (response) {
      console.log(response.length);
      for (var i=0; i<response.length; i++) {
        // front
        $(".main-card-" + i).find("#poster-img").attr("src", response[i].poster);
        $(".main-card-" + i).find("#movie-title").text(response[i].title);
        $(".main-card-" + i).find("#boat-value").text(response[i].boatsValue);
        $(".main-card-" + i).find(".up-boat").data("imdbid", response[i].imdbid)
        $(".main-card-" + i).find(".down-boat").data("imdbid", response[i].imdbid);
        $(".main-card-" + i).data("imdbid", response[i].imdbid);
        // back
        $(".main-card-" + i).find(".card-title").text(response[i].title);
        $(".main-card-" + i).find("#movie-year").text("Year: " + response[i].year);
        $(".main-card-" + i).find(".rating").text("Rating: " + response[i].rated);
        $(".main-card-" + i).find(".plot").text("Plot: " + response[i].plot);
      }
    });
  }

  function yearMovies () {
    $.ajax({
      url: "/api/movie-find/year",
      method: "GET"
    }).then(function (response) {
      console.log(response.length);
      for (var i=0; i<response.length; i++) {
        // front
        $(".main-card-" + i).find("#poster-img").attr("src", response[i].poster);
        $(".main-card-" + i).find("#movie-title").text(response[i].title);
        $(".main-card-" + i).find("#boat-value").text(response[i].boatsValue);
        $(".main-card-" + i).find(".up-boat").data("imdbid", response[i].imdbid)
        $(".main-card-" + i).find(".down-boat").data("imdbid", response[i].imdbid);
        $(".main-card-" + i).data("imdbid", response[i].imdbid);
        // back
        $(".main-card-" + i).find(".card-title").text(response[i].title);
        $(".main-card-" + i).find("#movie-year").text("Year: " + response[i].year);
        $(".main-card-" + i).find(".rating").text("Rating: " + response[i].rated);
        $(".main-card-" + i).find(".plot").text("Plot: " + response[i].plot);
      }
    });
  }

  function titleMovies () {
    $.ajax({
      url: "/api/movie-find/title",
      method: "GET"
    }).then(function (response) {
      console.log(response.length);
      for (var i=0; i<response.length; i++) {
        // front
        $(".main-card-" + i).find("#poster-img").attr("src", response[i].poster);
        $(".main-card-" + i).find("#movie-title").text(response[i].title);
        $(".main-card-" + i).find("#boat-value").text(response[i].boatsValue);
        $(".main-card-" + i).find(".up-boat").data("imdbid", response[i].imdbid)
        $(".main-card-" + i).find(".down-boat").data("imdbid", response[i].imdbid);
        $(".main-card-" + i).data("imdbid", response[i].imdbid);
        // back
        $(".main-card-" + i).find(".card-title").text(response[i].title);
        $(".main-card-" + i).find("#movie-year").text("Year: " + response[i].year);
        $(".main-card-" + i).find(".rating").text("Rating: " + response[i].rated);
        $(".main-card-" + i).find(".plot").text("Plot: " + response[i].plot);
      }
    });
  }
  

  $(".up-boat").on("click", function(){
    imdbid = $(this).data("imdbid");
    console.log(imdbid);
    $.ajax({
        url:"/api/movie/up-boat/"+imdbid,
        method: "PUT"
    }).then(function(response){
        location.reload();
    });
});

$(".down-boat").on("click", function(){
    imdbid = $(this).data("imdbid");
    console.log(imdbid);
    $.ajax({
        url:"/api/movie/down-boat/"+imdbid,
        method: "PUT"
    }).then(function(response){
        location.reload();
    });
});

$(".card").on("click", function(){
    imdbid = $(this).data("imdbid");
    console.log(imdbid)
    $.ajax({
        url:"/api/movie/"+imdbid,
        method: "GET"
    }).then(function(response){
        // console.log(response);
        $("[data-imdbid = "+ imdbid).find(".rating").text("Rating: " + response.Rated);
        $("[data-imdbid = "+ imdbid).find(".plot").text("Plot: " + response.Plot);
    });
});

})
