let products = JSON.parse(localStorage.getItem("products"))
  ? JSON.parse(localStorage.getItem("products"))
  : [
      {
        title:
          "Hair Dryer for Hairdresser Professional Negative Ion with Concentrator Nozzles Diffuser Comb Brush Salon Household Blower 40D",
        category: "Hair Dryer",
        price: "R800.00",
        img: "https://i.postimg.cc/kgk9J5Rf/hairdryer.webp",
      },
      {
        title:
          "Samsung HotBlast™ MC32K7055CK 32 Litre Combination Microwave Oven - Black",
        category: "Microwave",
        price: "1500.00",
        img: "https://i.postimg.cc/4nkb4VZX/microwave.png",
      },
      {
        title: "Hand-held Garment Steamer",
        category: "Steamer",
        price: "R2500.00",
        img: "https://i.postimg.cc/cJwKZ2Ct/steamer.webp",
      },
      {
        title: "Smartlife Super Blender",
        category: "Blender",
        price: "R3000.00",
        img: "https://i.postimg.cc/NFMfyzs4/blender.webp",
      },
    ];

let cart = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

//CREATE

function readProducts(products) {
  document.querySelector("#products").innerHTML = "";
  products.forEach((product, i) => {
    document.querySelector("#products").innerHTML += `
<div class="card" style="width: 18rem;">
  <img src="${product.img}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${product.title}</h5>
    <p class="card-text">${product.price}</p>
    <input type="number" id="addQty${i}" min=1 value=1>
    <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
     <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#edit-modal${i}">Edit</button>
  <button class="btn btn-primary" data-bs-toggle="cart" onclick="addToCart(${i})">Add to cart</button>
     </div>
</div>

<!-- Modal -->
<div class="modal fade" id="edit-modal${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        title <input type="text" id="update-title${i}"><br>
        price <input type="text" id="update-price${i}"placeholder="enter price in Rands"><br>
        Category <select name="category" id="update-category${i}"><br>
         <option value="select">-select</option>
                      <option value="Hair Dryer">Hair Dryer</option>
                       <option value="Microwave">Microwave</option>
                       <option value="Blender">Blender</option>
                       <option value="Steamer">Steamer</option>
        Image <input type="text" id="update-img${i}"placeholder="enter image-link">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="updateProduct(${i})"  data-bs-target="modal" data-bs-target="#edit-modal${i}" data-bs-dismiss="modal">Create</button>
      </div>
    </div>
  </div>
</div>
`;
  });
}
readProducts(products);

//create
function createProduct() {
  let title = document.querySelector(`#update-title`).value;
  let category = document.querySelector(`#update-category`).value;
  let price = document.querySelector(`#update-price`).value;
  let img = document.querySelector(`#update-img`).value;

  try {
    if (!title || !category || !price || !img)
      throw new Error("Please type in a product of yor choice");
    products.push({
      title,
      category,
      price,
      img,
    });
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  } catch (err) {
    alert(err);
  }
}

//delete
function deleteProduct(i) {
  let confirmation = confirm("Are you sure you want to delete this product?");
  if (confirmation) {
    products.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  }
}
//update
function updateProduct(i) {
  let title = document.querySelector(`#update-title${i}`).value;
  let category = document.querySelector(`#update-category${i}`).value;
  let price = document.querySelector(`#update-price${i}`).value;
  let img = document.querySelector(`#update-img${i}`).value;
  try {
    if (!title || !category || !price || !img)
      throw new Error(`Please insert product name`);
    products[i] = {
      title,
      category,
      price,
      img,
    };
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  } catch (err) {
    alert(err);
  }
}

// Add To Cart
function addToCart(i) {
  let qty = document.querySelector(`#addQty${i}`).value;
  let added = false;
  cart.forEach((product) => {
    if (product.title == products[i].title) {
      alert(
        `You have successfully added ${qty} ${products[i].title} to the cart`
      );
      product.qty = parseInt(product.qty) + parseInt(qty);
      added = true;
    }
  });
  if (!added) {
    cart.push({ ...products[i], qty });
    alert(
      `You have successfully added ${qty} ${products[i].title} to the cart`
    );
  }

  showCartBadge();

  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update Cart Badge
function showCartBadge() {
  document.querySelector("#badge").innerHTML = cart ? cart.length : "";
}

// SORT BY CATEGORY
function sortCategory() {
  let category = document.querySelector("#sortCategory").value;

  if (category == "All") {
    return readProducts(products);
  }

  let foundProducts = products.filter((product) => {
    return product.category == category;
  });

  readProducts(foundProducts);
  console.log(foundProducts);
}

// SORT BY NAME

function sortName() {
  let direction = document.querySelector("#sortName").value;

  let sortedProducts = products.sort((a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    }
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  if (direction == "descending") sortedProducts.reverse();
  console.log(sortedProducts);
  readProducts(products);
}

// SORT BY PRICE

function sortPrice() {
  let direction = document.querySelector("#sortPrice").value;

  let sortedProducts = products.sort((a, b) => a.price - b.price);

  console.log(sortedProducts);

  if (direction == "descending") sortedProducts.reverse();
  readProducts(sortedProducts);
}
