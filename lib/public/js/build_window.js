(function(){
  if (typeof window.repoVision === "undefined"){
    window.repoVision = {};
  }

  repoVision.buildWindow = function() {
    var blurb = document.getElementById('blurb');
    var bubble = document.getElementById('bubble');
    var checkoutButton = document.getElementById('checkout-button');
    checkoutButton.addEventListener("click", _handleButton);
    var currentNode;

    repoVision.hideWindow = function() {
      bubble.style.display = "none";
      currentNode = null;
    };

    repoVision.showWindow = function(node, location) {
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
      var hash = currentNode.hash;
      $.get('checkout', {hash: hash}, _handleResponse);
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
