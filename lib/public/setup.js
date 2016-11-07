
document.addEventListener("DOMContentLoaded", function() {
  $.get('data', setup);
});

function setup(commitData) {
  repoVision.buildKey(commitData.branches);
  repoVision.buildWindow();
  repoVision.buildTree(commitData);
}
