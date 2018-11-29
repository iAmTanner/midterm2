
  
  function removeItem(name) {
    $.getJSON('delete/' + name, function(data) {
      $("#delete").text("Item cleared");
      getProducts();
    });
  }
  
$(document).ready(function(){
  getProducts();
  
  $("#addProduct").click(function(){
      var url = "product";
      var myobj = {
                    Name:$("#name").val(),
                    Price:$("#price").val(),
                    Image:$("#image").val(), 
                    Ordered: 0
                  };
      jobj = JSON.stringify(myobj);
      $("#json").text(jobj);
      $.ajax({
        url:url,
        type: "POST",
        data: jobj,
        contentType: "application/json; charset=utf-8",
        success: function(data,textStatus) {
            console.log(data);
            getProducts();
        }
    })
  });
  
  function getProducts() {
    $.getJSON('product', function(data) {
      data.sort(compare);
      var id = 0;
      for(var product in data) {
        prod = data[product];
        var div = document.createElement('div');
        var btn = document.createElement('button');
        btn.setAttribute('type', 'submit');
        btn.setAttribute('id', id);
        btn.setAttribute('value', prod.Name);
        btn.setAttribute('name', 'products');
        btn.setAttribute('class', 'removeItem');
        btn.innerHTML = 'X';
        
        var lbl = document.createElement('label');
        lbl.setAttribute('for', prod.Name);
        
        lbl.appendChild(document.createTextNode(prod.Name + "- price " + prod.Price + ' - ordered ' + prod.Ordered));
        
        var image = document.createElement('img');
        image.src = prod.Image == '' ? 'https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1SbWFlHi2cej7BxV-5c0tld3OFM1pgNDI%2Fothertechniques-edges-none.png' : prod.Image;
        image.class = 'productImage';
        image.style.width = '90px';
        image.style.height = '90px';
        
        var container = document.getElementById("current_products");
        div.appendChild(btn);
        div.appendChild(lbl);
        div.appendChild(image);
        container.appendChild(div);
        id += 1;
      }
      
      var removeItems = document.getElementsByClassName('removeItem');
      console.log(removeItems);
      var i;
      for (i = 0; i < removeItems.length; ++i) {
        console.log(removeItems[i]);
        removeItems[i].onclick = function() {
          var pId = this.value;
          removeItem(pId);
        }
      }
    });
  }
  
  function compare(a, b) {
    console.log('comparing ' + a.Name + ' ' + b.Name);
    if (a.Name < b.Name) return -1;
    if (a.Name > b.Name) return 1;
    return 0;
  }
  
  $("#deleteComments").click(function() {
    $.getJSON('delete/', function(data) {
      $("#delete").text("Item cleared");
      getProducts();
    });
  });
  
  $("#queryButton").click(function() {
    $.getJSON('comment/' + $("#query").val(), function(data) {
      console.log(data);
      var results = "<ul>";
      for(var comment in data) {
        com = data[comment];
        results += "<li> Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
      }
      results += "</ul>";
      $("#queriedComments").html(results);
    });
  });
});