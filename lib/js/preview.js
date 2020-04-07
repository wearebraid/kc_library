(function ($) {
  window.initKcLibPreview = function($el) {
    let data = $el.find('.js-kc-lib-data').val()
    if (!data) {
      return
    }
    let selected = JSON.parse(data)
    let html = ''
    html += '<ul class="js-kc-lib-preview kc-lib-preview">'
    for (let id in selected) {
      let item = selected[id]
      html += `<li><div
                 role="img"
                 style="background-image: url(${item.thumbnailUrl});"
                 aria-label="${item.title}"
                 title="${item.title}"
              ></div></li>`
    }
    html += '</ul>'

    $el.find('.js-kc-lib-preview').remove()
    $el.find('.js-kc-lib-data').after(html)
  }

  function initPreviews () {
    $('.js-kc-lib-container').each(function() {
      let $container = $(this)
      if (!$container.find('.js-kc-lib-preview').length) {
        initKcLibPreview($container)
      }
    });
  }

  $(document).ready(function() {
    setInterval(initPreviews, 500);
  });
})(jQuery);
