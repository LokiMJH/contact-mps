var pymChild = new pym.Child({
  id: "contactmps-embed-parent"
});

$(window).on('load', function() {
  pymChild.sendHeight();
  console.info("contactmps child loaded");
});

// social-sharing
$('.fb-share').on('click', function(e) {
  e.preventDefault();
  var url = encodeURIComponent($(this).data('url'));

  window.open("https://www.facebook.com/sharer/sharer.php?u=" + url, "share", "width=600, height=400, scrollbars=no");
    ga('send', 'social', 'facebook', 'share', url);
});

$('.twitter-share').on('click', function(e) {
  e.preventDefault();
  var url = encodeURIComponent($(this).data('url'));

  window.open("https://twitter.com/intent/tweet?&url=" + url, "share", "width=600, height=400, scrollbars=no");
  ga('send', 'social', 'twitter', 'share', url);
});
