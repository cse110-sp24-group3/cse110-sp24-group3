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
  let editor = CodeMirror(textArea, {// eslint-disable-line
    mode: "gfm",
    lineNumbers: true,
    lineWrapping: true,
    styleActiveLine: true,
    matchBrackets: true,
    highlightingFormat: true,
    fencedCodeBlocks: true,
    fencedCodeBlockHighlighting: true,
  });

  // Updates the live-preview div with rendered markdown
  function updatePreview() {
    const previewContainer = document.getElementById('live-preview');
    const markdownContent = editor.getValue();
    const renderedHTML = marked(markdownContent);// eslint-disable-line
    previewContainer.innerHTML = renderedHTML;
  }

  // When text is added, update the live preview
  editor.on("change", updatePreview);

  // If this line isn't here, the text box prays
  // If you remove it I might cry
  editor.refresh();
});
