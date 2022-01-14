const cart = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

//Read
function readCart(cart) {
  document.querySelector("#cart").innerHTML = "";
  let total = cart
    .reduce((total, product) => {
      return total + product.price * product.qty;
    }, 0)
    .toFixed(2);
  cart.forEach((products, i) => {
    document.querySelector("#cart").innerHTML += `
    <div class="card mb-3" style="w:100;" position-relative"> 
    <button type="button" class="position-absolute" top-0 start-100 translate-middle badge btn btn-danger" onclick="removeFromCart(${i})">X</button>
    
    <div class="row g-0">
    <div class="col-md-4">
      <img src="${products.img}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body d-flex flex-column container">
        <h5 class="card-title" ${products.title}></h5>
        <div class="d-flex mb-3 justify-content-between">
        <label class="form-label">Quantity:</label>

        <input  type="number" min=1 id="addQty${i}" value=${
      products.qty
    } onchange="updateCart(${i})"/>
        </div>
        <div class="card-footer bg-white d-flex justify-content-between p-0 pt-3">
        <p>Total Cost:</p>
        <span>R${(parseFloat(products.price) * parseInt(products.qty)).toFixed(
          2
        )}</span>
        <p class="card-text"price:R${
          products.price
        }>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>  
        `;
  });
  showCartBadge();
  document.querySelector("#cart-footer").innerHTML += `
  <h3>Total cost: R${total}</h3>
 <button class="btn btn-primary btn-lg" onclick="checkout()">Checkout</button>`;
}

function updateCart(i) {
  let qty = document.querySelector(`#updateCartQty${i}`).value;
  cart[i] = {
    ...cart[i],
    qty,
  };
  localStorage.setItem("cart", JSON.stringify(cart));
}
readCart(cart);

//Delete
function deleteFromCart(i) {
  let confirmation = confirm("Are you sure you want to delete this item");
  if (confirmation) {
    cart.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    readCart(cart);
  }
}

//Checkout

function Checkout(i) {
  let total = cart
    .reduce((total, product) => {
      return total + product.price * product.qty;
    }, 0)
    .toFixed(2);
  try {
    if (parseInt(total) == 0) throw new Error("nothing in cart");
    let confirmation = confirm(`Total payment neede: R${total}`);
    if (confirmation) {
      cart.length = 0;
      localStorage.removeItem("cart");
    }
    readCart(cart);
  } catch (err) {
    alert(err);
  }
}
