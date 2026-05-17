const products = [
  {
    name: "Fast Charger",
    price: 600,
    image: "charger.jpg"
  },
  {
    name: "Wireless Earbuds",
    price: 1800,
    image: "earbuds.jpg"
  }
];

let cart = [];

// DISPLAY PRODUCTS
const container = document.getElementById("products");

products.forEach((p, index) => {
  const div = document.createElement("div");
  div.className = "card";

  const img = document.createElement("img");
  img.src = p.image;

  const name = document.createElement("h3");
  name.innerText = p.name;

  const price = document.createElement("p");
  price.innerText = "KES " + p.price;

  const urgency = document.createElement("p");
  urgency.innerText = "⚡ Limited stock!";
  urgency.style.color = "red";

  const btn1 = document.createElement("button");
  btn1.innerText = "Buy Now";
  btn1.onclick = () => order(p.name, p.price);

  const btn2 = document.createElement("button");
  btn2.innerText = "Add to Cart";
  btn2.onclick = (e) => addToCart(index, e);

  div.appendChild(img);
  div.appendChild(name);
  div.appendChild(price);
  div.appendChild(urgency);
  div.appendChild(btn1);
  div.appendChild(btn2);

  container.appendChild(div);
});

// ADD TO CART
function addToCart(index, event) {
  const product = products[index];

  const item = cart.find(i => i.name === product.name);

  if (item) {
    item.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  renderCart();

  // FLY EFFECT
  const img = event.target.parentElement.querySelector("img");
  const flyImg = img.cloneNode();

  const rect = img.getBoundingClientRect();

  flyImg.style.position = "fixed";
  flyImg.style.left = rect.left + "px";
  flyImg.style.top = rect.top + "px";
  flyImg.style.width = "50px";
  flyImg.style.height = "50px";
  flyImg.style.transition = "all 0.7s ease";
  flyImg.style.zIndex = "9999";

  document.body.appendChild(flyImg);

  const cartBtn = document.getElementById("cartBtn");
  const cartRect = cartBtn.getBoundingClientRect();

  setTimeout(() => {
    flyImg.style.left = cartRect.left + "px";
    flyImg.style.top = cartRect.top + "px";
    flyImg.style.width = "10px";
    flyImg.style.height = "10px";
    flyImg.style.opacity = "0";
  }, 10);

  setTimeout(() => {
    flyImg.remove();
  }, 700);
}

  // 🔥 FLYING EFFECT
  const img = event.target.parentElement.querySelector("img");
  const flyImg = img.cloneNode();

  const rect = img.getBoundingClientRect();
  flyImg.style.left = rect.left + "px";
  flyImg.style.top = rect.top + "px";

  flyImg.classList.add("fly-img");
  document.body.appendChild(flyImg);

  const cartBtn = document.getElementById("cartBtn");
  const cartRect = cartBtn.getBoundingClientRect();

  setTimeout(() => {
    flyImg.style.left = cartRect.left + "px";
    flyImg.style.top = cartRect.top + "px";
    flyImg.style.width = "20px";
    flyImg.style.height = "20px";
  }, 10);

  setTimeout(() => {
    flyImg.remove();
  }, 700);
}

// RENDER CART
function renderCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    cartDiv.innerHTML += `
      <p>
        ${item.name} x${item.qty} - KES ${item.price * item.qty}
        <button onclick="removeItem(${index})">❌</button>
      </p>
    `;

    total += item.price * item.qty;
  });

  cartDiv.innerHTML += `<h3>Total: KES ${total}</h3>`;
}

// REMOVE ITEM
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

// BUY NOW
function order(name, price) {
  alert(`Order: ${name} - KES ${price}`);
}

// CHECKOUT
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  document.getElementById("checkoutForm").style.display = "block";
}

// SEND ORDER
function sendOrder() {
  let customerName = document.getElementById("name").value;
  let location = document.getElementById("location").value;

  if (!customerName || !location) {
    alert("Please fill all fields");
    return;
  }

  let message = `Hello, my name is ${customerName}.\n`;
  message += `Location: ${location}\n\n`;
  message += "I want to order:\n\n";

  let total = 0;

  cart.forEach(item => {
    message += `${item.name} x${item.qty} - KES ${item.price * item.qty}\n`;
    total += item.price * item.qty;
  });

  message += `\nTotal: KES ${total}`;

  let phone = "254140321405";
  let url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);

  window.open(url, "_blank");

  document.getElementById("checkoutForm").style.display = "none";
}
function toggleCart() {
  const cart = document.getElementById("cart");

  if (cart.style.right === "0px") {
    cart.style.right = "-100%";
  } else {
    cart.style.right = "0";
  }
}
