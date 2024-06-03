// es-lint-ignore
// LRC
//////////////////////////////////////////////////////////////////////////////////
///* This is where the CodeMirror editor is applied to the entry-textarea div *///
//////////////////////////////////////////////////////////////////////////////////

//TODO: 
// * Full programming language support
// * Live rendering 
// * Modify styling

document.addEventListener("DOMContentLoaded", function() {
    
    let textArea = document.getElementById("entry-textarea")
    
    // Create the CodeMirror Object
    let editor = CodeMirror(textArea, {
        mode: "gfm",
        lineNumbers: true,
        lineWrapping: true,
        styleActiveLine: true,
        matchBrackets: true,
        highlightingFormat: true,
        fencedCodeBlocks: true,
        fencedCodeBlockHighlighting: true,
    });
    
    // Not sure why, but the formatting messes up without this
    editor.refresh();
});
