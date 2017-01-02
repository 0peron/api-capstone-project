"use strict";
$(document).ready(function () {
    $('.overlay').hide();
    $('.modal').hide();
    // step 1 define functions
    // a) get input from user
    $('.js-search-form').submit(function (event) {
        event.preventDefault();

        var songTitle = $('.js-query').val();
        console.log(songTitle);
        getDataApi(songTitle);
    });
    //    $(".albums").on('click', '.mod', function () {
    //        $('.overlay').show();
    //        $('.modal').show();
    //    });
    $('.overlay').on('click', function () {
        $('.overlay').hide();
        $('.modal').hide();
    });

    // b) make api call
    function getDataApi(songTitle) {

        var datacards = $.ajax({
            url: 'https://musixmatchcom-musixmatch.p.mashape.com/wsr/1.1/track.search?f_has_lyrics=1&page=1&page_size=15&q_track=' + songTitle,
            type: 'GET',
            data: "",
            dataType: 'json',
            success: function (songData) {
                console.log(songData);
                displaySearch(songData);
            },

            error: function (err) {
                console.log(err);
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("X-Mashape-Key", "bpwSKV4BRxmshy47RVabKWp5yLPnp1cmSdLjsnxen7reY3IUGq");
            }

        });
    }

    function getLyrics(trackId) {
        var datacards = $.ajax({
            url: 'https://musixmatchcom-musixmatch.p.mashape.com/wsr/1.1/track.lyrics.get?track_id=' + trackId,
            type: 'GET',
            data: "",
            dataType: 'json',
            success: function (lyricData) {
                //console.log(lyricData.lyrics_body);
                displayLyrics(lyricData.lyrics_body, trackId);
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
    function displaySearch(songData) {
        $('.modal').hide();
        var addHTML = "";
        $.each(songData, function (songArrayKey, songArrayValue) {

            console.log(getLyrics(songArrayValue.track_id));
            var getlyricsClickFunction = '$("#' + songArrayValue.track_id + ', .overlay").show()';
            addHTML += "<li>";
            addHTML += "<h2>" + songArrayValue.artist_name + "</h2>";
            addHTML += "<p>" + songArrayValue.album_name + "</p>";
            addHTML += "<img src='" + songArrayValue.album_coverart_100x100 + "'/>";
            addHTML += "<p class='mod' onclick='" + getlyricsClickFunction + "'>" + songArrayValue.track_name + "</p>";
            addHTML += "</li>";
        });
        $('.albums ul').html(addHTML);

    }

    function displayLyrics(lyricData, trackId) {
        //        console.log(lyricData);
        var addHTML = "";
        var hidelyricsClickFunction = '$("#' + trackId + ', .overlay").hide()';


        var niceOutput = lyricData.replace(/([\n])\w+/g, "<br />");

        addHTML += "<div class='modal' id='" + trackId + "' onclick='" + hidelyricsClickFunction + "'>";
        addHTML += "<p>" + niceOutput + "</p>";
        addHTML += "</div>";

        //        var addHTML = lyricData;
        //        $.each(lyricData, function (lyricArrayKey, lyricArrayValue) {
        //            addHTML += "<li>";
        //            addHTML += "<h2>" + lyricArrayValue.artist_name + "</h2>";
        //            addHTML += "<p>" + lyricArrayValue.album_name + "</p>";
        //            addHTML += "<p>" + lyricArrayValue.lyrics_body + "</p>";
        //            addHTML += "<p>" + lyricArray.track_name + "</p>";
        //            addHTML += "</li>";
        //        });
        $('.modal_wrapper').append(addHTML);
    }
});