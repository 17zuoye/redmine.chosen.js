$(document).ready(function() {
  var ensure_chosen = function() {
    // create chosen
    var orig_selector = $("select#issue_assigned_to_id").hide();
    var fake_selector = orig_selector.clone().attr('id', 'fake_issue_assigned_to_id');
    orig_selector.after(fake_selector);
    // and modiy css
    fake_selector.chosen({width: '200px'});
    var chosen_container = fake_selector.siblings('.chosen-container');
    chosen_container.css('position', 'absolute');
    var chosen_drop = chosen_container.find('.chosen-drop');

    // and bind event at last.
    fake_selector.on('change', function(evt, params) {
      orig_selector.val(params.selected);
    });

    // Fix dropdown menu's css
    fake_selector.on('chosen:ready', function(evt, params) {
      chosen_drop.hide();
    });
    fake_selector.on('chosen:showing_dropdown', function(evt, params) {
      chosen_drop.show().css('position', 'relative');
    });
    fake_selector.on('chosen:hiding_dropdown', function(evt, params) {
      chosen_drop.hide();
    });
  };

  // only execute when edit or new an issue
  if ( window.location.pathname.match(/\/issues\/(new|[0-9]+)/) ) {
    // Reenable chosen when reload form.
    // The reason is <select updateIssueFrom('/redmine/projects/17zuoye-junior/issues/new.js?id=2739')>
    window.redmine_chosen_interval = setInterval(function() {
     if (!$("#fake_issue_assigned_to_id").length) {
       ensure_chosen();
     }
    }, 500);
  }
});
