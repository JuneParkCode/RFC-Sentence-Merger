function mergeSentences() {
  // 'rfcmarkup' class를 가진 모든 div 요소를 찾습니다.
  var rfcDivs = document.getElementsByClassName("rfcmarkup");

  // 각 div 요소에 대해 다음을 수행합니다.
  for (var i = 0; i < rfcDivs.length; i++) {
    // 현재 div 요소의 모든 자식 노드를 가져옵니다.
    var childNodes = rfcDivs[i].childNodes;

    // 각 노드에 대해 다음을 수행합니다.
    for (var j = 0; j < childNodes.length; j++) {
      // 현재 노드의 HTML을 가져옵니다.
      var nodeHtml = childNodes[j].outerHTML;

      // HTML이 없거나 (즉, 현재 노드가 텍스트 노드인 경우) 또는 HTML이 'br' 태그인 경우에는 건너뜁니다.
      if (!nodeHtml || nodeHtml.toLowerCase() === "<br>") {
        continue;
      }
      // if text contains ... then skip
      if (nodeHtml.includes("...")) {
        continue;
      }

      // if \n\n, skip but "\n   " replace with ""
      var modifiedHtml = nodeHtml.replace(/\n\n/g, "<p></p>");
      // merge line
      modifiedHtml = modifiedHtml.replace(/\n   /g, "");

      // 현재 노드의 HTML을 수정된 HTML로 교체합니다.
      childNodes[j].outerHTML = modifiedHtml;
    }
  }
}

mergeSentences();
