let parsedData;
let i = 0;
let intervalID;
if (!parsedData) {
  document.querySelector(".loading").style.display = "block";
}
getProducts();
function getProducts() {
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://dummyjson.com/products/" + localStorage.getItem("product Id")
  );
  xhr.send("");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      document.querySelector(".loading").style.display = "none";
      parsedData = JSON.parse(xhr.responseText);
      //   product structure
      document.querySelector(".single-product-container").innerHTML = `
        <div class="product-imgView-container">
            <div class="product-thumbnails">
            ${parsedData.images
              .map((image) => {
                return `
                <img
                  class="product-thumbnails-img"
                  src="${image}"
                  alt="product img"
                />
              `;
              })
              .join("")}
            </div>
            <div class="Product-active-imgContainer">
                <img
                    class="Product-active-img"
                    src="${parsedData.images[i]}"
                    alt="product img"
                />
            </div>
        </div>
        <div class="product-details-container">
            <p class="product-details-desc">
            ${parsedData.description}
            </p>
            <h2 class="product-details-title">${parsedData.title}</h2>
            <span class="product-details-rating">${parsedData.rating}</span>
            <div class="product-details-star-rating-outer">
            <div class="product-details-star-rating-inner"style="width:${
              (parsedData.rating / 5) * 100
            }%" ></div>
            </div>
            <p class="product-details-discount-price">
            <span class="product-details-discount">-${
              parsedData.discountPercentage
            }%</span>
            <span class="product-details-price">${parsedData.price}$</span>
            </p>
            <div class="product-details-category">
            <span>Category</span>
            <span>${parsedData.category}</span>
            </div>
            <div class="product-details-brand">
            <span>Brand</span>
            <span>${parsedData.brand}</span>
            </div>
            <div class="product-details-stock">
            <span>Stock</span>
            <span>${parsedData.stock}</span>
            </div>
        </div>`;

      document
        .querySelectorAll(".product-thumbnails-img")
        .forEach((img, imgIndex) => {
          img.addEventListener("click", () => {
            clearInterval(intervalID);
            i = imgIndex;
            updateActiveImage();
            autoPlay_product_imgs();
          });
        });

      autoPlay_product_imgs();

      function autoPlay_product_imgs() {
        intervalID = setInterval(() => {
          i++;
          if (i === parsedData.images.length) {
            i = 0;
          }
          updateActiveImage();
        }, 3000);
      }
      function updateActiveImage() {
        document.querySelector(".Product-active-img").src =
          parsedData.images[i];
        document.querySelectorAll(".product-thumbnails-img").forEach((img) => {
          img.classList.remove("active-thumbnail");
        });
        document
          .querySelectorAll(".product-thumbnails-img")
          [i].classList.add("active-thumbnail");
      }
    }
  };
}
