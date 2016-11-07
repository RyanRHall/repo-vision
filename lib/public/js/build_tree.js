(function(){
  if (typeof window.repoVision === "undefined"){
    window.repoVision = {};
  }

  repoVision.buildTree = function(commitData) {
    var nodes = new vis.DataSet(commitData.nodes);
    var edges = new vis.DataSet(commitData.edges);
    var data = {nodes: nodes, edges: edges};

    var container = document.getElementById('tree');

    var network = new vis.Network(container, data, repoVision.visOptions);
    network.on("click", _handleClick);

    function _handleClick(data){
      if (data.nodes.length === 0){
        repoVision.hideWindow();
      } else {
        var foundNode = commitData.nodes.find( function(node) {
          return node.id === data.nodes[0];
        });
        repoVision.showWindow(foundNode, data.pointer.DOM);
      }
    }
  };

})();
