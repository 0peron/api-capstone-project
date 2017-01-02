"use strict";
$(document).ready(function () {
    // step 1 define functions
    // a) get input from user
    $('.js-search-form').submit(function (event) {
        event.preventDefault();
        var artistName = $('.js-query').val();
        //        console.log(artistName);
        var searchType = $('#js-drop').val();
        //        console.log(searchType);
        getDataApi(artistName, searchType);
    });
    // b) make api call
    function getDataApi(artistName, searchType) {
        if (searchType == 'artist') {
            var urlbuild = 'https://musixmatchcom-musixmatch.p.mashape.com/wsr/1.1/matcher.lyrics.get?q_artist=' + artistName;
        } else if (searchType == 'song') {
            var urlbuild = 'https://musixmatchcom-musixmatch.p.mashape.com/wsr/1.1/matcher.lyrics.get?q_track=' + artistName;
        }
        var datacards = $.ajax({
            url: urlbuild,
            type: 'GET',
            data: "",
            dataType: 'json',
            success: function (artistData) {
                console.log(atristData);
                displaySearch(atristData);
            },

            error: function (err) {
                console.log(err);
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("X-Mashape-Key", "bpwSKV4BRxmshy47RVabKWp5yLPnp1cmSdLjsnxen7reY3IUGq");
            }

        });
    }
    // c) display results
    function displaySearch(videosArray) {
        var addHTML = "";
        $.each(videosArray, function (videoArrayKey, videoArrayValue) {
            addHTML += "<li>";
            addHTML += "<p>" + videoArrayValue.snippet.title + "</p>";
            addHTML += "<a href='https://www.youtube.com/watch?v=" + videoArrayValue.id.videoId + "' target='_blank'>";
            addHTML += "<img src='" + videoArrayValue.snippet.thumbnails.medium.url + "'/>";
            addHTML += "</a>";
            addHTML += "</li>";
        });
        $('.js-search-results').html(addHTML);
    }

});
