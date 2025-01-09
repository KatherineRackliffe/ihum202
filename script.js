var commandList = ['cat', 'clear', 'help', 'ls', 'man', 'ps',];
var ls = 'list all files in the current directory.';
var help = 'list possible terminal commands.';
var cat = 'cat [filename] will print the contents of that file.';
var clear = 'clear all text in the terminal.';
var reverse = 'reverse to the previous section of the page.';
var man = 'describe a file, but you know that already don\'t you?';
var ps = 'list the current processes';
this['about.txt'] = 'Sorry try lore.txt ';
this['projects.txt'] = 'botnet.';
this['lore.txt'] = 'No desu.';
var files = ['about.txt', 'projects.txt'];
var allFiles = ['about.txt', 'projects.txt', 'lore.txt'];
var user = 'root@TheCollective:~$';
var commandHistory = [];
var commandIndex = -1;

function currentBrowser() {
  var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
  var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
  var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
  var is_safari = navigator.userAgent.indexOf("Safari") > -1;
  var is_edge = navigator.userAgent.indexOf("Edge") > -1;
  var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
  if (is_chrome && is_safari && is_edge) {
    is_chrome = false;
    is_safari = false;
  } else if ((is_chrome) && (is_safari)) {
    is_safari = false;
  } else if ((is_chrome) && (is_opera)) {
    is_chrome = false;
  }
  if (is_chrome) {
    return 'Chrome';
  } else if (is_explorer) {
    return 'Internet Explorer';
  } else if (is_firefox) {
    return 'Firefox';
  } else if (is_safari) {
    return 'Safari';
  } else if (is_edge) {
    return 'Edge';
  } else if (is_opera) {
    return 'Opera';
  } else {
    return 'Browser';
  }
}

$(document).ready(function () {
  $("#terminal").on('click', function () {
    $("#terminalInput").focus();
  });

  function sendCommand(input) {
    var command = input.split(' ')[0];
    var secondary = input.split(' ')[1];
    if ((commandList.indexOf(command) === -1 && command != "continue") && command) {
      replaceInput();
      $("#terminalOutput").append('Invalid command \"' + command + '"<br>type "help" for more options<br>');
      addInput();
    }
    if (input === 'ls -la' || input === 'ls -a' || input === 'ls -all' || input === 'ls -l') {
      printAllFiles();
      return;
    }
    switch (command) {
      case 'ls':
        printFiles();
        break;
      case 'cat':
        if (!secondary)
          break;
        printFile(secondary);
        break;
      case 'help':
        printList(commandList);
        break;
      case 'clear':
        clear();
        break;
      case 'man':
        if (secondary)
          man(secondary);
        break;
      case 'ps':
        replaceInput();
        $("#terminalOutput").append("PID TTY&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TIME CMD<br>" +
                                    '6258 pts/1&nbsp;&nbsp;    00:00:00 bash<br>' +
                                    '7334 pts/1&nbsp;&nbsp;    00:00:00 ps<br>' +
                                    '8942 pts/1&nbsp;&nbsp;    00:00:00 ' + currentBrowser() + '<br>');
        addInput();
        break;
                   }
  }

  function man(input) {
    if (commandList.indexOf(input) > -1) {
      replaceInput();
      $("#terminalOutput").append('"' + input + '"' + '  ' + this[input] + '<br>');
      addInput();
    } else {
      replaceInput();
      $("#terminalOutput").append('"' + input + '"' + '  is not a valid command, try typing "help" for options.<br>');
      addInput();
    }
  }

  function clear() {
    replaceInput();
    $("#terminalOutput").empty();
    addInput();
  }

  function printFile(file) {
    if (this[file]) {
      replaceInput();
      $("#terminalOutput").append(this[file] + '<br>');
      addInput();
    } else {
      replaceInput();
      $("#terminalOutput").append('"' + file + '"' + ' is an invalid file name.  Try typing "ls".<br>');
      addInput();
    }
  }

  function printList(list) {
    replaceInput();
    list.forEach(function (result) {
      $("#terminalOutput").append(result + '<br>');
    });
    addInput();
  }

  function printFiles() {
    replaceInput();
    files.forEach(function (file) {
      $("#terminalOutput").append(file + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
    });
    $("#terminalOutput").append('<br>');
    addInput();
  }

  function printAllFiles() {
    replaceInput();
    allFiles.forEach(function (file) {
      $("#terminalOutput").append(file + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
    });
    $("#terminalOutput").append('<br>');
    addInput();
  }

  function replaceInput() {
    var value = $("#terminalInput").val();
    $("#terminalInput").remove();
    $("#terminalOutput").append(value + '<br>');
  }

  function addInput() {
    $("#terminalOutput").append(user + ' <input id="terminalInput" spellcheck="false"></input>');

    setTimeout(function () {
      $("#terminalInput").focus();
    }, 10);


    $("#terminalInput").keydown(function (e) {
      var command = $("#terminalInput").val();
      if (e.keyCode == 13) {
        sendCommand(command);
        commandHistory.unshift(command);
        commandIndex = -1;
      } else if (e.keyCode == 9) {
        e.preventDefault();
        autoCompleteInput(command);
      } else if (e.keyCode == 38 && commandIndex != commandHistory.length - 1) {
        e.preventDefault();
        commandIndex++;
        $("#terminalInput").val(commandHistory[commandIndex]);
      } else if (e.keyCode == 40 && commandIndex > -1) {
        e.preventDefault();
        $("#terminalInput").val(commandHistory[commandIndex]);
        commandIndex--;
      } else if (e.keyCode == 67 && e.ctrlKey) {
        $("#terminalInput").val(command + '^C');
        replaceInput();
        addInput();
      }
    });
  }

  function autoCompleteInput(command) {
    var command = $("#terminalInput").val();
    var input = $("#terminalInput").val().split(' ');
    var validList = [];
    var fileList = input[0] === 'man' ? commandList : allFiles;

    if (input.length === 2 && input[1] != "") {
      fileList.forEach(function (file) {
        if (file.substring(0, input[1].length) === input[1]) {
          validList.push(file);
        }
      });
      if (validList.length > 1) {
        replaceInput();
        validList.forEach(function (option) {
          $('#terminalOutput').append(option + '   ');
        });
        $('#terminalOutput').append('<br>');
        addInput();
        $("#terminalInput").val(command);
      } else if (validList.length === 1) {
        $("#terminalInput").val(
          command +
          validList[0].substring(input[1].length, validList[0].length));
      }
    } else if (command.length) {
      commandList.forEach(function (option) {
        if (option.substring(0, input[0].length) === input[0]) {
          validList.push(option);
        }
      });
      if (validList.length > 1) {
        replaceInput();
        validList.forEach(function (option) {
          $('#terminalOutput').append(option + '   ');
        });
        $('#terminalOutput').append('<br>');
        addInput();
        $("#terminalInput").val(command);
      } else if (validList.length === 1) {
        $("#terminalInput").val(
          command +
          validList[0].substring(input[0].length, validList[0].length));
      }
    }
  }

  addInput();
});