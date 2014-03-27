$(document).ready(function() {
  // only execute when edit or new an issue
  if ( window.location.pathname.match(/\/issues\/(new|[0-9]+)/) ) {
    // create chosen
    var orig_selector = $("select#issue_assigned_to_id").hide();
    var fake_selector = orig_selector.clone().attr('id', 'fake_issue_assigned_to_id');
    $.each(fake_selector.children('option'), function(idx, o1) { $(o1).html($(o1).html().split().join()); });
    orig_selector.after(fake_selector);
    // and modiy css
    fake_selector.chosen({width: '200px'});
    var chosen_container = fake_selector.siblings('.chosen-container');
    chosen_container.css('position', 'absolute');
    chosen_container.find('.chosen-drop').css('position', 'relative');
    // and bind event at last.
    fake_selector.on('change', function(evt, params) {
      orig_selector.val(params.selected);
    });
  }
});
