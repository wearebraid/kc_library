(function ($, Drupal, CKEDITOR) {
  CKEDITOR.plugins.add('kc_library', {
    beforeInit: function (editor) {
  		// Implementation before initializing plugin.
  		editor.addCommand( 'open_media_library', {
        exec: function (editor) {
          console.log('hello', editor);
        }
      });

      editor.ui.addButton('KCLibrary', {
        label: Drupal.t('KC Library'),
        // Note that we use the original image2 command!
        command: 'open_media_library',
        icon: '/modules/contrib/kc_library/lib/icons/cloudinary.svg'
      });
    },
  });
})(jQuery, Drupal, CKEDITOR);