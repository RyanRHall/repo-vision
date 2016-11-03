(function(){
  if (typeof window.repoVision === "undefined"){
    window.repoVision = {};
  }

  repoVision.buildKey = branchNames => {
    const keyContainer = document.getElementById('key-container');

    branchNames.forEach((branch, idx) => {
      const group_idx = idx % repoVision.groups.length;
      repoVision.visOptions.repoVision.groups[branch] = repoVision.groups[group_idx];
      addKey(branch, repoVision.groups[group_idx].color.background);
    });

    function addKey(branch, color){
      const keyItem = document.createElement("span");
      keyItem.style.backgroundColor = color;
      keyItem.innerHTML = branch;
      keyContainer.appendChild(keyItem);
    }
  };

})();
