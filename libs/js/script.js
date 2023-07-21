$(document).ready(function () {
  // Preloader Script
  let timeLapse;
  const preLoader = () => {
    timeLapse = setTimeout(showPage, 3000);
  };

  const showPage = () => {
    document.getElementById('preloader').style.display = 'none';
    document.getElementById('apiTable').style.display = 'block';
  };

  // Weather Script
  $('#weatherBtn').click(function () {
    $.ajax({
      url: 'libs/php/weatherAPI.php',
      type: 'GET',
      dataType: 'json',
      success: function (result) {
        $('#results').empty(); 
        $.each(result, function (i, item) {
          $.each(item, function (index, val) {
            $('#results').append('Language: ' + val.lng + '<br/>')
            $('#results').append('Observation: ' + val.observation + '<br/>')
          })
        })
      },
      error: function (jqXHR, textStatus, errorThrown) {
        // Handle the error
        console.log(errorThrown);
      },
    });
  });
});



$(document).ready(function () {
  $('#btnGetInfo').click(function () {
    const country = $('#countrySelect').val();
    getCountryInfo(country);
  });
});

function getCountryInfo(country) {
  $.ajax({
    url: 'libs/php/getEarthquakeinfo.php',
    type: 'GET',
    dataType: 'json',
    data: {
      country: country,
      lang: 'en', 
    },
    success: function (result) {
      if (result.geonames.length > 0) {
        displayCountryInfo(result.geonames[0]);
      } else {
        $('#countryInfo').html('Country information not found.');
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $('#countryInfo').html('Error fetching country information.');
    },
  });
}

function displayCountryInfo(data) {
  const infoDiv = $('#results');
  infoDiv.html(`
    <h2>${data.countryName}</h2>
    <p>Capital: ${data.capital}</p>
    <p>Population: ${data.population}</p>
    <p>Area (sq km): ${data.areaInSqKm}</p>
  `);

  if (data.bbox) {
    infoDiv.append(`
      <p>Bounding Box:</p>
      <p>North: ${data.bbox.north}</p>
      <p>South: ${data.bbox.south}</p>
      <p>East: ${data.bbox.east}</p>
      <p>West: ${data.bbox.west}</p>
    `);
  }
}


$("#btnRun").click(function () {
  $.ajax({
    url: "libs/php/earthQuakes.php",
    type: "POST",
    dataType: "json",
    data: {
      north: $("#North").val(),
      south: $("#South").val(),
      east: $("#East").val(),
      west: $("#West").val(),
    },
    success: function (result) {
      console.log(result);
      $("#results").empty();
      if (result.status.name == "ok") {
        const listContainer = $("#results");
        result.data.earthquakes.forEach((earthquake) => {
          const listItem = $("<li>").text(
            `Date: ${earthquake.datetime}, magnitude: ${earthquake.magnitude}, country:${earthquake.src}`
          );
          listContainer.append(listItem);
        });
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // your error code
      console.log(errorThrown);
    },
  });
});