(function(){
  if (typeof window.repoVision === "undefined"){
    window.repoVision = {};
  }

  repoVision.buildWindow = () => {
    const blurb = document.getElementById('blurb');
    const bubble = document.getElementById('bubble');
    const checkoutButton = document.getElementById('checkout-button');
    checkoutButton.addEventListener("click", _handleButton);
    let currentNode;

    repoVision.hideWindow = () => {
      bubble.style.display = "none";
      currentNode = null;
    };

    repoVision.showWindow = (node, location) => {
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
    };

    function _handleButton(){
      const {group, id} = currentNode;
      const data = {branch: group, hash: id};
      $.get('checkout', data, (d) => console.log(d));
    }
  };

})();
