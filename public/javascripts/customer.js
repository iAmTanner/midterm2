$(document).ready(function(){
  
  var selected = [];
  getProducts();
  
  $('#submitCart').click(function() {
      var storeItems = document.getElementsByClassName('storeItem');
      document.getElementById('shoppingCart').innerHTML = "";
      var i;
      for (i = 0; i < storeItems.length; ++i) {
        if (storeItems[i].childNodes[0].checked) {
          //purchaseItem(storeItems[i].childNodes[1].id);
          storeItems[i].childNodes[0].checked = false;
          
          var cartContents = "<div style=\"display: inline; tex-align: center\">";
          cartContents += storeItems[i].childNodes[1].innerHTML;
          cartContents += '</div><img class=\'productImage\' src=';
          cartContents += storeItems[i].childNodes[2].src + '>';
          var div = document.createElement('div');
          div.style.display = 'inline';
          div.innerHTML = cartContents;
          document.getElementById('shoppingCart').appendChild(div);
          console.log(cartContents);
        }
      }
  });
  
  function getProducts() {
    $.getJSON('product', function(data) {
      data.sort(compare);
      var id = 0;
      for(var product in data) {
        prod = data[product];
        var div = document.createElement('div');
        div.setAttribute('class', 'storeItem');
        div.setAttribute('prod', prod);
        var chk = document.createElement('input');
        chk.setAttribute('type', 'checkbox');
        chk.setAttribute('id', id);
        chk.setAttribute('value', prod.Name);
        chk.setAttribute('name', 'products');
        
        var lbl = document.createElement('label');
        lbl.setAttribute('for', prod.Name);
        lbl.setAttribute('id', prod.Name);
        lbl.appendChild(document.createTextNode(prod.Name + "- price " + prod.Price));
        
        var image = document.createElement('img');
        image.src = prod.Image == '' ? 'https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1SbWFlHi2cej7BxV-5c0tld3OFM1pgNDI%2Fothertechniques-edges-none.png' : prod.Image;
        image.class = 'productImage';
        image.style.width = '90px';
        image.style.height = '90px';
        
        var container = document.getElementById("currentProducts");
        div.appendChild(chk);
        div.appendChild(lbl);
        div.appendChild(image);
        container.appendChild(div);
        id += 1;
      }
      
      var storeItems = document.getElementsByClassName('storeItem');
      var i;
    });
  }
  
  function compare(a, b) {
    if (a.Name < b.Name) return -1;
    if (a.Name > b.Name) return 1;
    return 0;
  }
  
  function purchaseItem(item) {
    $.getJSON('purchase/' + item, function(data) {
      console.log('purchase', data);
    })
  }
  

});