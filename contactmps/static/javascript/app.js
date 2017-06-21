var gReCaptchaValidated = function() {
  $("input[type=submit]").removeAttr('disabled');
};

var gReCaptchaExpired = function() {
  $("input[type=submit]").attr('disabled','disabled');
};

var recaptchaLoaded = function() {
  grecaptcha.render('recaptcha', {
    'sitekey': recaptchaKey,
    'callback': gReCaptchaValidated,
    'expired-callback': gReCaptchaExpired
  });
  console.info("recaptcha rendered");
  pymChild.sendHeight();
};

var template = "Honourable Member {{{ recipient_name }}},\n\
\n\
I am a citizen from {{{ location }}}. The levels of corruption in our country {{{ corruption_level_opinion }}} and I feel it is very important for my voice to heard.\n\
In particular the upcoming vote of no confidence in parliament is something I feel I want to voice my opinion on. I would urge you to {{{ action_request }}} the vote of no confidence.\n\
Other issues that I feel very strongly about are {{{ other_issues }}}.\n\
\n\
As a member of parliament you represent all South Africans, including me. Please vote in favour of good governance - a governance that is best suited to realising my hopes for our future.";

if ($('.create-email-page').length > 0) {
  // load the data into the dropdown
  var data = _.map(persons, function(p) {
    return {
      id: p.id,
      text: p.name + (p.party ? (' - ' + p.party.name) : ''),
    };
  });
  data = _.sortBy(data, 'text');

  $('select.use-select2').select2({
    data: data,
    placeholder: 'Choose an MP',
  });

  $('select.choose-province').select2({
    placeholder: 'Choose your province',
  });

  $('form#email-form').on('submit', function(e) {
    var $form = $(this);

    if ($form.find('input[name=name]').val() === '') {
      alert("Please enter your name");
      $form.find('input[name=name]').focus();
      e.preventDefault();
      return;
    }

    if ($form.find('input[name=email]').val() === '') {
      alert("Please enter your email");
      $form.find('input[name=email]').focus();
      e.preventDefault();
      return;
    }

    if ($form.find('input[name=location]').val() === '') {
      alert("Please enter your location");
      $form.find('input[name=location]').focus();
      e.preventDefault();
      return;
    }

    if ($form.find('textarea[name=reasons]').val() === '') {
      alert("Please tell us why this is important to you");
      $form.find('textarea[name=reasons]').focus();
      e.preventDefault();
      return;
    }

    updateBody($('form#email-form'));
  });

  updateBody($('form#email-form'));
}

function updateBody($form) {
  var context = {
    'recipient_name': $("#recipient").text(),
    'corruption_level_opinion': "don't really seem like an issue",
    'action_request': "abstain from",
    'other_issues': "plentiful",
    'location': $form.find('input[name=location]').val() || "____"
  };
  var body = Mustache.render(template, context);
  $form.find('input[name=body]').val(body);
}

function chooseMP(mp) {
  // mark an MP as chosen
  $(".choose .single-mp").removeClass("selected");
  $('.single-mp[data-id=' + mp.id + ']').addClass('selected');

  $(".recipient").text(mp.name);
  $(".selected-mp .mp-img-wrapper").css({"background-image": mp.portrait_url ? ('url(' + mp.portrait_url + ')') : ''});
  $(".selected-mp .mp-img-wrapper .party-logo").attr("src", mp.party ? mp.party.icon_url : '');
  $(".pa-link").attr("href", mp.pa_url);
  $("form input[name=person]").val(mp.id);

  pymChild.sendHeight();
}

$(".choose .single-mp").click(function() {
  var selectedId = parseInt($(this).data('id')),
      mp = _.find(persons, function(p) { return p.id == selectedId;});
  chooseMP(mp);
});

$('#select-dropdown').on("change", function(e) {
  var selectedId = parseInt($(this).val()),
      mp = _.find(persons, function(p) { return p.id == selectedId; });
  chooseMP(mp);
});

$(".choose .single-mp").first().click();
