(function(){

if (typeof window.repoVision === "undefined"){
  window.repoVision = {};
}

repoVision.groups = [
  {color: {background: '#EF5B5B'}},
  {color: {background: '#2274A5'}, font: {color: "white"}},
  {color: {background: "#FFBA49"}},
  {color: {background: '#6A0136'}, font: {color: "white"}},
  {color: {background: '#B2ABF2'}},
];

repoVision.visOptions = {
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

})();
