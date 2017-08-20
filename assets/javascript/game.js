$(document).ready(function() {
console.log("ready");

var sloths = ["Giant Ground Sloths", "Two-toed Sloths", "Three-toed Sloths"];

function displayAnimals() {

  var animal = $(this).attr("data-animal");

  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
   
  $.ajax({
    url: queryURL,
    method: "GET"
    }).done(function(response) {

    var results = response.data;
    console.log(results);
 for (var i = 0; i < 10; i++) {
      var animalDiv = $("<div class='animals'>");
      var p = $("<p>").text("Rating: " + results[i].rating);

      var animalImage = $("<img>");
      animalImage.attr("src", results[i].images.fixed_width_still.url);
      animalImage.attr('data-still', results[i].images.fixed_width_still.url);
      animalImage.attr('data-state', 'still');
      animalImage.addClass('gif');
      animalImage.attr('data-animate', results[i].images.fixed_width.url);
      animalDiv.append(animalImage);

          animalDiv.append(p);
          $("#animal-gifs").prepend(animalDiv);
        }
  });
}

  function renderButtons() {
    $("#buttons-view").empty();

    for (var j = 0; j < sloths.length; j++) {
      var a = $("<button>");
      a.addClass("animals");
      a.attr("data-animal", sloths[j]);
      a.text(sloths[j]);
      $("#buttons-view").append(a); 
    }
  }


  $("#add-animal").on("click", function(event) {
    event.preventDefault();
    var animal = $("#animal-input").val().trim();
    sloths.push(animal);
    renderButtons();
  });


$("#buttons-view").on("click", ".animals", displayAnimals);

renderButtons();  

$(document).on("click", ".gif", function() {
  console.log("click!");
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
   
});