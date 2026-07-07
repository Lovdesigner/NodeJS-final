// CONFIGURACIÓN DE LA API
const API_URL = 'https://node-js-final-ashy.vercel.app/api/products/';

// DOM references
const productGrid = document.getElementById('product-grid');

// --- FUNCIONES PRINCIPALES ---

async function loadProducts() {
    try {
        // Mostrar mensaje de carga
        productGrid.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">Cargando productos...</p>';
        
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('Error al cargar productos:', error);
        productGrid.innerHTML = `
            <div class="error-message" style="grid-column: 1/-1; text-align:center; padding:2rem;">
                <p>⚠️ No pudimos cargar los productos.</p>
                <p>Verifica que la API esté disponible o contacta al soporte.</p>
            </div>
        `;
    }
}

function renderProducts(products) {
    if (!products || products.length === 0) {
        productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">No hay productos disponibles por ahora.</p>';
        return;
    }

    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <h4>${product.nombre || 'Producto sin nombre'}</h4>
            <p class="description"><strong>Marca:</strong> ${product.marca || 'Sin marca'}</p>
            <p class="price">${formatPrice(product.precio)}</p>
            <button class="btn-add" data-id="${product.id}">Agregar al carrito</button>
        </div>
    `).join('');

    // Event listeners para botones "Agregar al carrito"
    document.querySelectorAll('.btn-add').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            addToCart(productId);
        });
    });
}

function formatPrice(price) {
    if (price === undefined || price === null) return 'Precio no disponible';
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0
    }).format(price);
}

function addToCart(productId) {
    // Implementación temporal - puedes conectar con un carrito real
    alert(`Producto ${productId} agregado al carrito (funcionalidad en desarrollo)`);
    console.log(`Producto ${productId} añadido al carrito`);
}

// --- INICIALIZAR ---
document.addEventListener('DOMContentLoaded', loadProducts);