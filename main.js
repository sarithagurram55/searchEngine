//import algoliasearch from 'https://cdn.jsdelivr.net/npm/algoliasearch@latest';
/*import algoliasearch from 'https://cdn.jsdelivr.net/npm/algoliasearch@latest/dist/algoliasearch-lite.esm.browser.js';

//const client = algoliasearch('YourApplicationID', 'YourAPIKey');

//import algoliasearch from "algoliasearch";
alert("hello")
const client = algoliasearch("YXQOYMR2JH","af95be8dcb813065a552768834888ef8");
const index = client.initIndex("gurram");
console.log("hello")
let data = []
let resultsRootElement = document.querySelector('.results')
fetch('https://fakestoreapi.com/products')
.then(res => res.json())
.then(json => {
data = json;
console.log(data)
})
document.querySelector('#searchInput').addEventListener('keyup', () => {
let searchTerm = (document.querySelector('#searchInput').value)
let resultsArray = []
if (String(searchTerm).trim().length > 0) {
index.search(searchTerm).then(({ hits }) => {
console.log(hits);
})
.catch(err => { console.log(err); });
renderProducts(resultsArray)
} else { removeElements() }
})
function renderProducts(products) {
document.querySelectorAll('.result').forEach(prod => {
prod.remove()
})
products.forEach(product => {
renderSingleProduct(product);
})
}
function renderSingleProduct(product) {
let resultDiv = document.createElement('div')
let resultImage = document.createElement('img')
let resultTitle = document.createElement('h4')
let resultPrice = document.createElement('p')
let purchaseButton = document.createElement('button')
purchaseButton.value = 'Purchase'

resultImage.src = product.image
resultTitle.innerText = product.title
resultPrice.innerText = product.price;


resultDiv.appendChild(resultImage)
resultDiv.appendChild(resultTitle)
resultDiv.appendChild(resultPrice)
resultDiv.appendChild(purchaseButton)

resultsRootElement.appendChild(resultDiv)
}*/


import algoliasearch from 'https://cdn.jsdelivr.net/npm/algoliasearch@latest/dist/algoliasearch-lite.esm.browser.js';

// Initialize Algolia client with Application ID and API Key
const client = algoliasearch("YXQOYMR2JH", "af95be8dcb813065a552768834888ef8");
const index = client.initIndex("gurram");

let data = [];
let resultsRootElement = document.querySelector('.results');

// Fetch products from the Fake Store API
fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(json => {
    data = json;
    console.log(data);
  });

// Add event listener for the search input field
document.querySelector('#searchInput').addEventListener('keyup', () => {
  let searchTerm = document.querySelector('#searchInput').value.trim();
  let resultsArray = [];
  if (searchTerm.length > 0) {
    // Perform Algolia search
    index.search(searchTerm).then(response => {
      //console.log(hits);
      console.log(response.hits);
      renderProducts(response.hits); // Pass hits to renderProducts
    })
    .catch(err => {
      console.log(err);
    });
  } else {
    removeElements(); // Call removeElements function when input is empty
  }
});
// Function to render multiple products
function renderProducts(products) {
  // Clear previous search results
  document.querySelectorAll('.result').forEach(prod => {
    prod.remove();
  });
  // Render each product
  products.forEach(product => {
    renderSingleProduct(product);
  });
}
// Function to render a single product
function renderSingleProduct(product) {
  let resultDiv = document.createElement('div');
  resultDiv.classList.add('result');

  let resultImage = document.createElement('img');
  let resultTitle = document.createElement('h4');
  let resultPrice = document.createElement('p');
  let purchaseButton = document.createElement('button');
  purchaseButton.textContent = 'Purchase';

  resultImage.src = product.image;
  resultTitle.innerText = product.title;
  resultPrice.innerText = `$${product.price}`;

  // Append elements to the result div
  resultDiv.appendChild(resultImage);
  resultDiv.appendChild(resultTitle);
  resultDiv.appendChild(resultPrice);
  resultDiv.appendChild(purchaseButton);

  // Append result div to the root element
  resultsRootElement.appendChild(resultDiv);
}

// Function to remove all previous search results
function removeElements() {
  // Remove all elements with the class 'result'
  document.querySelectorAll('.result').forEach(el => el.remove());
}


function addNewProduct(){
  index.saveObject({
      "id": 30,
      "title": "Cynohub <> JavaScript project",
      "price": 109.95,
      "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      "category": "development ",
      "image": "https://picsum.photos/200",
      "rating": {
          "rate": 5,
          "count": 120
      }
  }).then(response=>{
    console.log(response)
  })
}
addNewProduct();