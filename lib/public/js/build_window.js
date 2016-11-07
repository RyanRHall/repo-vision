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
      checkoutButton.innerHTML = "Checkout";
      checkoutButton.setAttribute("class", "active-button");
    };

    function _handleButton(){
      const {hash} = currentNode;
      $.get('checkout', {hash}, _handleResponse);
    }

    function _handleResponse({success}){
      success ? _handleSuccess() : _handleError();
    }

    function _handleSuccess(){
      checkoutButton.innerHTML = "Success!";
      checkoutButton.setAttribute("class", "inactive-button");
    }

    function _handleError(){
      alert("Sorry! Something went wrong.");
    }
  };

})();
