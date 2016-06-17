
(function ($) {

//alert("foo JS");

Drupal.behaviors.webspeech_stt = {
    
    attach: function () {

      $('#button_textarea').click(function () {
        //alert("Button clicked");
      var recognizer = new webkitSpeechRecognition();
      recognizer.lang = "en";
      recognizer.onresult = function(event)   {
        if (event.results.length > 0) {
            var result = event.results[event.results.length-1];
            if(result.isFinal) {
                console.log(result[0].transcript);          
                $('#webspeech_stt_textfield').append((result[0].transcript));
                $('#webspeech_stt_textarea_with_summary').append((result[0].transcript));   
                $('#webspeech_stt_textarea').append((result[0].transcript));                
            } 
        }  
    };

recognizer.start();

  });

}


}



/**
 * Auto-hide summary textarea if empty and show hide and unhide links.
**/
Drupal.behaviors.textSummary = {

  
  attach: function (context, settings) {
    $('.text-summary', context).once('text-summary', function () {
     // alert("fee");
      var $widget = $(this).closest('div.field-type-text-with-summary');
      var $summaries = $widget.find('div.text-summary-wrapper');

      $summaries.once('text-summary-wrapper').each(function(index) {
        var $summary = $(this);
        var $summaryLabel = $summary.find('label').first();
        var $full = $widget.find('.text-full').eq(index).closest('.form-item');
        var $fullLabel = $full.find('label').first();

        // Create a placeholder label when the field cardinality is
        // unlimited or greater than 1.
        if ($fullLabel.length == 0) {
          $fullLabel = $('<label></label>').prependTo($full);
        }

        // Setup the edit/hide summary link.
        var $link = $('<span class="field-edit-link">(<a class="link-edit-summary" href="#">' + Drupal.t('Hide summary') + '</a>)</span>');
        var $a = $link.find('a');
        var toggleClick = true;
        $link.bind('click', function (e) {
          if (toggleClick) {
            $summary.hide();
            $a.html(Drupal.t('Edit summary'));
            $link.appendTo($fullLabel);
          }
          else {
            $summary.show();
            $a.html(Drupal.t('Hide summary'));
            $link.appendTo($summaryLabel);
          }
          toggleClick = !toggleClick;
          return false;
        }).appendTo($summaryLabel);

        // If no summary is set, hide the summary field.
        if ($(this).find('.text-summary').val() == '') {
          $link.click();
        }
      });
    });
  } 
};

})(jQuery);
