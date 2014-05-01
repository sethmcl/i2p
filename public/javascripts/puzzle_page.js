(function () {
  var editor = ace.edit('editor');
  // editor.setTheme('ace/theme/monokai');
  editor.getSession().setMode('ace/mode/javascript');

  $('#run').click(function () {
    eval(editor.getValue());
  });

  $('#check').click(checkAnswer);

  document.addEventListener('keypress', function (e) {
    if (event.ctrlKey && event.keyCode == 13) {
      checkAnswer();
      e.stopPropagation();
    }
  });

  function checkAnswer() {
    $.post(window.i2p.urls.checkAnswer, { code: editor.getValue() }, function (data) {
      if (data.correct) {
        $('#result').removeClass('error').html(data.message);
      } else {
        $('#result').addClass('error').html(data.message);
      }
    });
  }

}());
