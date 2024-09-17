const products = [
    {
        name: "Product 1",
        price: 29.99,
        description: "Description for product 1.",
        image: "https://via.placeholder.com/150",
        quantity: 10
    },
    {
        name: "Product 2",
        price: 49.99,
        description: "Description for product 2.",
        image: "https://via.placeholder.com/150",
        quantity: 15
    },
    {
        name: "Product 3",
        price: 19.99,
        description: "Description for product 3.",
        image: "https://via.placeholder.com/150",
        quantity: 20
    },
    {
        name: "Product 4",
        price: 99.99,
        description: "Description for product 4.",
        image: "https://via.placeholder.com/150",
        quantity: 5
    },
    {
        name: "Product 5",
        price: 59.99,
        description: "Description for product 5.",
        image: "https://via.placeholder.com/150",
        quantity: 8
    }
];

const productContainer = document.querySelector('.product-list');
const cartElement = document.querySelector('.cart');
const cartCountElement = document.getElementById('cart');
const cartItemsContainer = document.querySelector('.cart-items');

let cart = [];

products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product-item');

    productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>$${product.price.toFixed(2)}</p>
        <button onclick="addToCart('${product.name}')">Add to Cart</button>
    `;

    productContainer.appendChild(productElement);
});

function addToCart(productName) {
    const product = products.find(p => p.name === productName);
    if (product) {
        const existingProduct = cart.find(p => p.name === productName);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartDisplay();
    }
    updateCartCount();
}

function updateCartCount() {
    const cartCount = cart.reduce((acc, product) => acc + product.quantity, 0);
    cartCountElement.textContent = `Cart (${cartCount})`;
}

function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)} x 
                <button onclick="decreaseQuantity('${item.name}')">-</button>
                ${item.quantity}
                <button onclick="increaseQuantity('${item.name}')">+</button>
            </p>
            <button class="remove" onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });
    document.querySelector('.total-price').textContent = `Total: $${totalPrice.toFixed(2)}`;
}

function increaseQuantity(productName) {
    const product = cart.find(p => p.name === productName);
    if (product) {
        product.quantity++;
        updateCartDisplay();
        updateCartCount();
    }
}

function decreaseQuantity(productName) {
    const product = cart.find(p => p.name === productName);
    if (product && product.quantity > 1) {
        product.quantity--;
        updateCartDisplay();
        updateCartCount();
    } else if (product && product.quantity === 1) {
        removeFromCart(productName);
    }
}

function removeFromCart(productName) {
    const productIndex = cart.findIndex(p => p.name === productName);
    if (productIndex !== -1) {  
        cart.splice(productIndex, 1);
        updateCartDisplay();
        updateCartCount();
    }
}

function checkout() {
    const whatsappNumber = '+212649455082';
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    const message = `Hello, I would like to order the following items:\n\n` +
                    cart.map(item => `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`).join('\n') +
                    `\n\nTotal: $${totalPrice}\n\nPlease contact me for further details.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
}

function closeCart() {
    cartElement.style.display = 'none';
}

// Toggle mobile menu
document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');

    hamburgerMenu.addEventListener('click', function () {
        mobileMenu.classList.toggle('show');
    });
});

// Show cart on mobile
document.getElementById('cart').addEventListener('click', () => {
    cartElement.style.display = 'block';
});
    