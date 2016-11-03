
document.addEventListener("DOMContentLoaded", () =>{
  $.get('data', buildTree);
});

function buildTree(commitData) {

  repoVision.buildKey(commitData.branches);

  const nodes = new vis.DataSet(commitData.nodes);
  const edges = new vis.DataSet(commitData.edges);
  const data = {nodes, edges};
  let currentNode;

  const container = document.getElementById('tree');
  const blurb = document.getElementById('blurb');
  const bubble = document.getElementById('bubble');
  const checkoutButton = document.getElementById('checkout-button');
  checkoutButton.addEventListener("click", _handleButton);


  repoVision.buildKey(commitData.branches);

  const network = new vis.Network(container, data, repoVision.visOptions);
  network.on("click", _handleClick);

  function _handleClick(data){
    if (data.nodes.length === 0){
      hideWindow();
    } else {
      const foundNode = commitData.nodes.find(node => node.id === data.nodes[0]);
      showWindow(foundNode, data.pointer.DOM);
    }
  }

  function hideWindow(){
    bubble.style.display = "none";
    currentNode = null;
  }

  function showWindow(node, location){
    blurb.innerHTML =
      `<p>${node.message}</p>
      <ul>
        <li>branch: ${node.group}</li>
        <li>author: ${node.author}</li>
        <li>email: ${node.email}</li>
        <li>date: ${new Date(node.timeStamp).toDateString()}</li>
      </ul>
      `;

    bubble.style.left = (location.x + 2) + "px";
    bubble.style.top = (location.y + 2) + "px";
    bubble.style.display = "block";
    currentNode = node;
  }

  function _handleButton(){
    const {group, id} = currentNode;
    const data = {branch: group, hash: id};
    $.get('checkout', data, (d) => console.log(d));
  }

}
