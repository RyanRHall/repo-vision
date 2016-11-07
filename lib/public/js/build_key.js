(function(){
  if (typeof window.repoVision === "undefined"){
    window.repoVision = {};
  }

  repoVision.buildKey = branchNames => {
    const keyContainer = document.getElementById('branch-keys');

    const options = repoVision.visOptions;
    const groups = repoVision.groups;

    branchNames.forEach((branch, idx) => {
      const group_idx = idx % groups.length;
      options.groups[branch] = groups[group_idx];
      addKey(branch, groups[group_idx].color.background);
    });

    function addKey(branch, color){
      const keyItem = document.createElement("span");
      keyItem.style.backgroundColor = color;
      keyItem.innerHTML = branch;
      keyContainer.appendChild(keyItem);
    }
  };

})();
