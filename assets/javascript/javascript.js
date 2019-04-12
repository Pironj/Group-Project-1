console.clear();

var $input = $('<input type="search" />').appendTo(document.body),
    $results = $('<div class="results" />').appendTo(document.body);

$input.val('');

function fetch(term) {
    $.ajax({
        url: 'https://itunes.apple.com/search',
        crossDomain: true,
        dataType: 'jsonp',
        data: {
            term: term,
            media: 'track',
            entity: 'song',
            limit: 3,
            explicit: 'No'
        },
        method: 'GET',
        success: function (data) {
            console.log(data);

            $results.empty();

            $.each(data.results, function (i, result) {
                if (i > 2) { return false; }
                var newDiv = $('<div>');
                var preview = $('<video>');
                var hires = result.artworkUrl100.replace('100x100', '200x200');
                $results[0].insertAdjacentHTML('beforeend', '<a class="result" href="' + result.trackViewUrl + '" target="_blank"><img src="' + hires + '" onerror="src=' + result.artworkUrl100 + '" /> <div class="result__text"> <span class="artist-name">' + result.artistName + '</span> <span class="track-name">' + result.trackName + '</span></div></a>');
                preview.attr('src', result.previewUrl);
                newDiv.append(preview);
            });
        },
        error: function (e) {
            console.log(e);
        }
    });
}

$input.on('blur keydown', function () {
    if (!event.keyCode || event.keyCode == 13) {
        fetch($input.val());
    }
});

fetch($input.val());