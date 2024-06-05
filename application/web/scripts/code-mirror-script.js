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


  const md = window.markdownit();

   //TEST

CodeMirror.defineMode('markdown-preview', function (config) {
  const markdownMode = CodeMirror.getMode(config, 'gfm');
  const markdownOverlay = {
    token: function (stream, state) { // Added the 'state' parameter here
      const token = markdownMode.token(stream, state.base);
      if (token.mode) {
        stream.pos += token.value.length;
        return null; // Skip the Markdown syntax
      }
      return token.style ? token.style + ' ' + token.type : token.type;
    },
    blankLine: function (state) {
      markdownMode.blankLine(state.base);
    },
    startState: function () {
      return {
        base: CodeMirror.startState(markdownMode)
      };
    },
    copyState: function (state) {
      return {
        base: CodeMirror.copyState(markdownMode, state.base)
      };
    }
  };
  return CodeMirror.multiplexingMode(markdownMode, markdownOverlay);
});

  // Create the CodeMirror Object
  let editor = CodeMirror(textArea, {// eslint-disable-line
    mode: {
      name: "gfm",
      overlay: {
        name: 'markdown-preview',
        combine: true
      }
    },
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
