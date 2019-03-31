// const pageDiv = document.createElement('div');
// pageDiv.id = "pageDiv124";

// pageDiv.addEventListener("drop", drop);
// pageDiv.addEventListener("dragover", allowDrop);
// const firstChild = document.body.firstChild
// document.body.insertBefore(pageDiv, firstChild);
// window.addEventListener("resize", dropTargetSize);
// window.onload = dropTargetSize;

// function dropTargetSize() {
//   const windowWidth = window.innerWidth;
//   const windowHeight = window.innerHeight;
//   pageDiv.style.width = windowWidth + "px";
//   pageDiv.style.height = windowHeight + "px";
//   // pageDiv.style.position = "absolute";
//   // pageDiv.style.zIndex = "2000076";
// };

chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  // alert(msg.subject)
  if (msg.from === 'panel') {

    if (msg.subject === "addComment") {
      // renderComment("20", "20", "50", "50", msg.json, msg.id)
    }
    if (msg.subject === "deleteCommentTag") {
      deleteCommentTag(msg.message)
    }
    if (msg.subject === "renderComment") {

      const commentUrl = msg.message.url
      const currentUrl = window.location.toString();
      // alert(JSON.stringify(commentUrl, currentUrl));
      if (commentUrl === currentUrl) {
        const x = msg.message.json.x,
          y = msg.message.json.y,
          w = msg.message.json.w,
          h = msg.message.json.h;
        renderComment(x, y, w, h, msg.message.json, msg.message.id, msg.message.cardId)
      }
    }
  }
  return true;
});
function renderComment(x, y, w, h, json, id, cardId) {

  const renderDiv = document.createElement('div');
  renderDiv.style.position = 'absolute';
  renderDiv.textContent = JSON.stringify(json);
  renderDiv.id = id;
  renderDiv.setAttribute('data-card', cardId);
  renderDiv.style.width = w + "px";
  renderDiv.style.height = h + "px";
  renderDiv.style.top = y + "px";
  renderDiv.style.left = x + "px";
  renderDiv.style.border = "solid 2px blue";
  renderDiv.style.zIndex = 2000000089;
  renderDiv.draggable = true;
  renderDiv.addEventListener("dragend", dragEnd);
  renderDiv.addEventListener("dragstart", dragStart);

  document.body.appendChild(renderDiv);
}

function deleteCommentTag(id) {
  const tagToDelete = document.getElementById(id);
  if (tagToDelete) {
    tagToDelete.parentNode.removeChild(tagToDelete);
  }
}

function drop(ev) {
  // var data = ev.dataTransfer.getData("text");
  // alert("drop" + data)
  // ev.stopPropagation()
  // ev.preventDefault();

  // // alert(data + "--------")
  // pageDiv.appendChild(document.getElementById(data));
}

function allowDrop(ev) {

  // ev.stopPropagation()
  // ev.preventDefault();
}

function dragEnd(ev) {
  var rect = ev.target.getBoundingClientRect();

  chrome.runtime.sendMessage({ from: "content", subject: "editCommentPosition", message: { id: ev.target.id, posX: ev.clientX, posY: ev.clientY, cardId: ev.target.getAttribute('data-card') }, }, function (response) {

  });
  // alert(rect.left)var data = ev.dataTransfer.getData("text");
  // var data = ev.dataTransfer.getData("text");

  // alert(data + "--------")
}
function dragStart(ev) {
  // ev.stopPropagation()
  // alert(ev.target.id + "+++++++")
  // event.dataTransfer.setData("Text", ev.target.id);
}