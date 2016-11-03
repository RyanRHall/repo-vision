(function(){
  if (typeof window.repoVision === "undefined"){
    window.repoVision = {};
  }

  repoVision.buildTree = (commitData) => {
    const nodes = new vis.DataSet(commitData.nodes);
    const edges = new vis.DataSet(commitData.edges);
    const data = {nodes, edges};

    const container = document.getElementById('tree');

    const network = new vis.Network(container, data, repoVision.visOptions);
    network.on("click", _handleClick);

    function _handleClick(data){
      if (data.nodes.length === 0){
        repoVision.hideWindow();
      } else {
        const foundNode = commitData.nodes.find(node => node.id === data.nodes[0]);
        repoVision.showWindow(foundNode, data.pointer.DOM);
      }
    }
  };

})();
