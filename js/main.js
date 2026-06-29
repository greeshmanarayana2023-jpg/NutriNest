// Initialize Cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart counter in the navbar
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.innerText = totalItems;
    }
}

// Show UX Toast Notification
function showToast(message) {
    let toast = document.getElementById('ux-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'ux-toast';
        document.body.appendChild(toast);
    }
    toast.innerText = message;
    toast.className = 'toast show';
    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 3000);
}

// Add item to cart
function addToCart(id, name, price, image) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`🛒 ${name} added to cart!`);
}

// Category Filtering Logic
function filterCategory(categoryName) {
    const products = document.querySelectorAll('.product-card');
    let hasVisibleProducts = false;
    
    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        if (categoryName === 'All' || productCategory === categoryName) {
            product.style.display = 'flex';
            hasVisibleProducts = true;
        } else {
            product.style.display = 'none';
        }
    });

    // UX: Scroll to products section if we are filtering
    const productsSection = document.querySelector('.products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Call on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    // Add click listeners to category boxes if they don't use inline onclick
    const categoryBoxes = document.querySelectorAll('.category-box');
    categoryBoxes.forEach(box => {
        box.addEventListener('click', function() {
            // Remove active class from all
            categoryBoxes.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Get category name from text (e.g. "🥬 Vegetables" -> "Vegetables")
            const categoryText = this.innerText.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]|\s/g, '').trim(); 
            // Better to use a data attribute if it exists, otherwise fallback to text
            const category = this.getAttribute('data-category') || this.innerText.split(' ').slice(1).join(' ').trim();
            filterCategory(category);
        });
    });

    // Staggered Entrance Animations for Premium Design
    const animatedElements = document.querySelectorAll('.hero-text, .hero-images, .categories h2, .category-box, .products h2, .product-card');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animation = `fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards ${index * 0.05}s`;
    });
});
