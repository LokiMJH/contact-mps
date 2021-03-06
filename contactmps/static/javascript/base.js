$(function() {
  window.addEventListener('error', function(e) {
    ga('send', 'event', 'JavaScript Error', e.filename + ':  ' + e.lineno, e.message);
  });
});

var pymChild = new pym.Child({
  id: "contactmps-embed-parent"
});

$(window).on('load', function() {
  pymChild.sendHeight();
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
  var url = encodeURIComponent($(this).data('url')),
      hashtag = encodeURIComponent($(this).data('hashtag').replace('#', ''));

  window.open("https://twitter.com/intent/tweet?&url=" + url + "&hashtags=" + hashtag, "share", "width=600, height=400, scrollbars=no");
  ga('send', 'social', 'twitter', 'share', url);
});

// track outbound links
$(function() {
  $('a[href^=http]').on('click', function(e) {
    ga('send', 'event', 'outbound-click', 'click', this.getAttribute('href'));
  });
});
