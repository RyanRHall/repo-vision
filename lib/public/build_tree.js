
document.addEventListener("DOMContentLoaded", () =>{
  $.get('data', buildTree);
});

const groups = [
  {color: {background: '#EF5B5B'}},
  {color: {background: '#2274A5'}, font: {color: "white"}},
  {color: {background: "#FFBA49"}},
  {color: {background: '#6A0136'}, font: {color: "white"}},
  {color: {background: '#B2ABF2'}},
];

function buildTree(commitData) {

  const nodes = new vis.DataSet(commitData.nodes);
  const edges = new vis.DataSet(commitData.edges);
  const data = {nodes, edges};
  let currentNode;

  const container = document.getElementById('tree');
  const blurb = document.getElementById('blurb');
  const bubble = document.getElementById('bubble');
  const checkoutButton = document.getElementById('checkout-button');
  const keyContainer = document.getElementById('key-container');
  checkoutButton.addEventListener("click", _handleButton);

  const options = {
    height: '100%',
    width: '100%',
    layout: {
      hierarchical: {
        sortMethod: "directed",
        direction: "LR"
      }
    },
    interaction: {hover: true, hoverConnectedEdges: false},
    groups: {},
    edges: {
      width: 2,
      color: "black",
      hoverWidth: 0,
      selectionWidth: 0
    },
    nodes: {
      borderWidth: 2,
      borderWidthSelected: 3,
      color: {
        border: "black",
        highlight: {border: "green", background: "lightgreen"},
        hover: {border: "green", background: "lightgreen"}
      },
      shadow: true,
      font: {size: 22},
      fixed: { x: true, y: true}
    },
    manipulation: {
      enabled: false
    },
    physics: {
      enabled: false
    }
  };

  commitData.branches.forEach((branch, idx) => {
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

  const network = new vis.Network(container, data, options);
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
