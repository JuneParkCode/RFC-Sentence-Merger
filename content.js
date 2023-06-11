var originalText = null;

function mergeSentences() {
  // 사용자가 선택한 텍스트를 가져옵니다.
  var selection = window.getSelection();

  // 선택한 텍스트가 없으면 함수를 종료합니다.
  if (!selection.rangeCount) return;

  // 선택한 텍스트의 첫 번째 범위를 가져옵니다.
  var range = selection.getRangeAt(0);
  originalText = range.toString();

  // 범위의 복사본을 만듭니다.
  var documentFragment = range.cloneContents();

  // 복사본에서 모든 노드를 가져옵니다.
  if (!documentFragment) return;
  var nodes = documentFragment.childNodes;
  // 각 노드에 대해 다음을 수행합니다.

  for (var i = 0; i < nodes.length; i++) {
    var nodeText = nodes[i].nodeValue;
    // if not text node, skip
    if (!nodeText) {
      continue;
    }
    // if text contains ... then skip
    if (nodeText.includes("...")) {
      continue;
    }
    // if \n\n, skip but "\n   " replace with ""
    var modifiedHtml = nodeText.replace(/\n\n   /g, "\n\n\n");
    // merge line
    modifiedHtml = modifiedHtml.replace(/\n   /g, " ");
    nodes[i].nodeValue = modifiedHtml;
  }
  range.deleteContents();
  range.insertNode(documentFragment);
}

function restoreOriginal() {
  if (originalText) {
    var selection = window.getSelection();
    if (!selection.rangeCount) return;
    var range = selection.getRangeAt(0);

    // 저장한 원본 텍스트를 복원합니다.
    range.deleteContents();
    range.insertNode(document.createTextNode(originalText));
  }
}

document.addEventListener("mouseup", function () {
  mergeSentences();
});

document.addEventListener("mousedown", function () {
  restoreOriginal();
});
