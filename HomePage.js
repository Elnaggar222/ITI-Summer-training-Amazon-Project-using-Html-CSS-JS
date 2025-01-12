const prodects_container = document.querySelector(".allproducts-container");
let Fetched_Products = [];
let Filtered_Products = [];

if (!Fetched_Products.length) {
  document.querySelector(".loading").style.display = "block";
}

getProducts();
function getProducts() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://dummyjson.com/products");
  xhr.send("");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      document.querySelector(".loading").style.display = "none";
      const parsedData = JSON.parse(xhr.responseText);
      Fetched_Products = [...parsedData.products];
      Filtered_Products = [...Fetched_Products];
      showAllProducts();
      handleSearchProducts();
      addLinksEventClick();
      handleShowProducts();
    }
  };
}
function showAllProducts() {
  prodects_container.innerHTML = "";
  Fetched_Products.length &&
    Fetched_Products &&
    Filtered_Products.map((product) => {
      const productLink = document.createElement("a");
      productLink.setAttribute("product_Id", product.id);
      const product_box = document.createElement("div");
      product_box.classList.add("product-box");
      const product_image = document.createElement("div");
      product_image.classList.add("product-image");
      const img = document.createElement("img");
      img.setAttribute("alt", "product image");
      img.setAttribute("src", product.images[0]);
      // #####
      product_image.appendChild(img);
      product_box.append(product_image);
      // #####
      const product_details = document.createElement("div");
      product_details.classList.add("product-details");
      // #####
      const product_title = document.createElement("span");
      product_title.classList.add("product-title");
      product_title.innerText = product.title;
      const product_desc = document.createElement("span");
      product_desc.classList.add("product-desc");
      product_desc.innerText = product.description;
      const product_price = document.createElement("span");
      product_price.classList.add("product-price");
      product_price.innerText = product.price + " $";
      const product_discount = document.createElement("span");
      product_discount.classList.add("product-discount");
      product_discount.innerText = "-" + product.discountPercentage + "%";
      // #####
      product_details.append(
        product_title,
        product_desc,
        product_price,
        product_discount
      );
      product_box.append(product_details);
      productLink.append(product_box);
      prodects_container.append(productLink);
    });
}

// ########
function addLinksEventClick() {
  const Products_Links = document.querySelectorAll(
    ".allproducts-container > a"
  );
  Products_Links.length &&
    Products_Links &&
    Products_Links.forEach((product_Link) => {
      product_Link.addEventListener("click", (e) => {
        localStorage.setItem(
          "product Id",
          e.currentTarget.getAttribute("product_Id")
        );
        //you must clear search input at rendering
        document.querySelector(".search-product-input").value = "";
        location.assign("./productPage/ProductPage.html");
      });
    });
}
// ##########################
// show()
function handleShowProducts() {
  document.querySelector(".select-product").innerHTML = "";
  document.querySelector(".select-product").innerHTML =
    '<option value="" selected disabled>select product</option>';
  Filtered_Products &&
    Filtered_Products.length &&
    Filtered_Products.map((product) => {
      document.querySelector(
        ".select-product"
      ).innerHTML += `<option key="${product.id}" value="${product.id}">${product.title}</option>`;
    });
}
function handleShowClicked() {
  if (document.querySelector(".select-product").value) {
    localStorage.setItem(
      "product Id",
      document.querySelector(".select-product").value
    );
    location.assign("./productPage/ProductPage.html");
  }
}
// ##########################
// search ()

function handleSearchProducts() {
  document
    .querySelector(".search-product-input")
    .addEventListener("input", (e) => {
      Filtered_Products = [...Fetched_Products];
      Filtered_Products = Filtered_Products.filter((product) =>
        product.title.includes(e.target.value)
      );
      showAllProducts();
      addLinksEventClick();
      handleShowProducts();
      handleNotExistedProducts();
    });
}
//  No Such Product Existed
//! we don't have to remove this message if products existed as showAllProducts() function remove all elements before adding the existed products so it will be removed anyway
function handleNotExistedProducts() {
  if (!Filtered_Products.length) {
    prodects_container.innerHTML =
      '<div class="not-existed">Sorry No Such Product Existed :(</div>';
  }
}
