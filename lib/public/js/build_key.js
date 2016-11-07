(function(){
  if (typeof window.repoVision === "undefined"){
    window.repoVision = {};
  }

  repoVision.buildKey = function(branchNames) {
    var keyContainer = document.getElementById('branch-keys');

    var options = repoVision.visOptions;
    var groups = repoVision.groups;

    branchNames.forEach( function(branch, idx) {
      var group_idx = idx % groups.length;
      options.groups[branch] = groups[group_idx];
      addKey(branch, groups[group_idx].color.background);
    });

    function addKey(branch, color){
      var keyItem = document.createElement("span");
      keyItem.style.backgroundColor = color;
      keyItem.innerHTML = branch;
      keyContainer.appendChild(keyItem);
    }
  };

})();
