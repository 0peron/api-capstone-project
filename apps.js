"use strict";

$(document).ready(function () {
    var datacards = $.ajax({
        url: 'https://musixmatchcom-musixmatch.p.mashape.com/wsr/1.1/matcher.lyrics.get?q_artist=coldplay&q_track=paradise',
        type: 'GET',
        data: "",
        dataType: 'json',
        success: function (datacards) {
            console.log(datacards);
            //                    displaySearchResults(datacards, inputQuality);
        },

        error: function (err) {
            console.log(err);
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-Mashape-Key", "bpwSKV4BRxmshy47RVabKWp5yLPnp1cmSdLjsnxen7reY3IUGq");
        }

    });

});
