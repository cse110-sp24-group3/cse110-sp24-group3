// LRC
//////////////////////////////////////////////////////////////////////////////////
///* This is where the CodeMirror editor is applied to the entry-textarea div *///
//////////////////////////////////////////////////////////////////////////////////

//TODO: 
// * Full programming language support
// * Live rendering 

document.addEventListener("DOMContentLoaded", function() {
    var textArea = document.getElementById("entry-textarea")
    var editor = CodeMirror(textArea, {
        mode: "gfm",
        lineNumbers: true,
        lineWrapping: true,
        styleActiveLine: true,
        matchBrackets: true,
        highlightingFormat: true,
        fencedCodeBlocks: true,
        fencedCodeBlockHighlighting: true,

    });
    editor.refresh();
});