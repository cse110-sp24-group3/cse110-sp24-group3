document.addEventListener("DOMContentLoaded", function() {
    var textArea = document.getElementById("entry-textarea")
    var editor = CodeMirror(textArea, {
        mode: {
            name : "markdown",
            modes: ["all"]
        },
        lineNumbers: true,
        lineWrapping: true,
        styleActiveLine: true,
        matchBrackets: true,
        autorefresh: true,
    });
    editor.refresh();
});