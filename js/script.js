
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;
    console.log(address);
    $greeting.text('So, you want to live at ' + address + '?');
    
    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address.replace(/ +/g, "");
    console.log(streetviewUrl);
    $body.append('<img class="bgimg" src=' + streetviewUrl + ' />');
    
    // var nytUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '$sort=newest&api-key=xx';
    // $.getJSON(nytUrl, function(data) {
    //    $nytHeaderElem.text('New York Times Articles About ' + cityStr);
    //    var articles = data.response.docs;
    //    for (var i = 1; i < articles.length; i++) {
    //        var article = articles[i];
    //        $nytElem.append('<li class="article">' + 
    //         '<a href=' + article.web_url  + ' />' + article.headline.main + '</a>'
    //         + '<p>' + article.snippet + '</p>'
    //         + '</li>' );
    //    }
    // }).error(function(error) {
    //     $nytHeaderElem.text('Not able to retrieve articles!');
    // });
    
    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&prop=revisions&rvprop=content&format=json&callback=wikiCallback'
    $.ajax({
        url: wikiUrl,
        dataType: 'jsonp',
        success: function(data) {
            var articleList = data[1];
            
            for (var i = 0; i < articleList.length; i++) {
                var article = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + article.replace(/ +/g, '_');
                console.log(article);
                $wikiElem.append('<li><a href=' + url + ' >'+ article + '</a></li>');
            }
        }
    })
    
    return false;
};

$('#form-container').submit(loadData);
