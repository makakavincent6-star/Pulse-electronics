const products = [
  { name: "Fast Charger", price: 600, image: "charger.jpg" },
  { name: "Wireless Earbuds", price: 1800, image: "earbuds.jpg" }
];

const container = document.getElementById("products");

// BEST SELLER
const bestSeller = products[0];

const featured = document.createElement("div");
featured.className = "card";

featured.innerHTML = `
  <div style="border:2px solid red; padding:10px; border-radius:10px;">
    <p style="color:red;">🔥 HOT DEAL</p>
    <img src="${bestSeller.image}" style="width:100%;">
    <h2>${bestSeller.name}</h2>
    <p>
      <span style="text-decoration: line-through; color:gray;">
        KES ${bestSeller.price + 200}
      </span>
      <b> KES ${bestSeller.price}</b>
    </p>
    <p style="color:red;">⚠ Limited stock available</p>
    <button onclick="order('${bestSeller.name}', ${bestSeller.price})">
      Buy Now
    </button>
  </div>
`;

container.appendChild(featured);

// OTHER PRODUCTS
products.slice(1).forEach(p => {
  const div = document.createElement("div");
  div.className = "card";

  div.innerHTML = `
    <img src="${p.image}" style="width:100%;">
    <h3>${p.name}</h3>
    <p>KES ${p.price}</p>
    <p style="color:red; font-size:12px;">Only few left!</p>
    <button onclick="order('${p.name}', ${p.price})">
      Buy Now
    </button>
  `;

  container.appendChild(div);
});

// WHATSAPP ORDER
function order(product, price) {
  let phone = "254140321405";
  let message = `Hi, I want to buy ${product} at KES ${price}. Is it available?`;

  let url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);
  window.open(url, "_blank");
}