// Portfolio de Arte - Script Principal
document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    const gallery = document.getElementById('gallery');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const loading = document.querySelector('.loading');
    let currentFilter = 'all';
    let isLoading = false;

    // Inicializar la aplicación
    init();

    function init() {
        if (gallery) {
            // Estamos en la página principal
            initGallery();
            initFilters();
            loadGallery('all');
        } else {
            // Estamos en la página de obra individual
            initObraPage();
        }
        
        initNavigation();
    }

    // === FUNCIONES DE LA GALERÍA ===
    
    function initGallery() {
        // Configurar lazy loading si es necesario
        setupLazyLoading();
    }

    function initFilters() {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Actualizar botones activos
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Aplicar filtro
                filterGallery(filter);
            });
        });
    }

    function loadGallery(filter = 'all') {
        if (isLoading) return;
        
        showLoading();
        
        // Simular carga asíncrona
        setTimeout(() => {
            const obrasToShow = getObrasByCategoria(filter);
            renderGallery(obrasToShow);
            hideLoading();
        }, 500);
    }

    function renderGallery(obras) {
        if (!gallery) return;

        gallery.innerHTML = '';
        
        obras.forEach((obra, index) => {
            const obraElement = createObraElement(obra, index);
            gallery.appendChild(obraElement);
        });

        // Agregar animaciones escalonadas
        animateGalleryItems();
    }

    function createObraElement(obra, index) {
  const obraDiv = document.createElement('div');
  obraDiv.className = `obra-item ${obra.categoria}`;
  obraDiv.style.animationDelay = `${index * 0.1}s`;

  obraDiv.innerHTML = `
    <div class="obra-collage">
      <a href="obra.html?id=${obra.id}">
        <img src="${obra.imagen}" alt="${obra.titulo}" loading="lazy" />
        <div class="obra-collage-titulo">${obra.titulo}</div>
      </a>
    </div>
  `;

  return obraDiv;
}


    function addObraEventListeners(element, obra) {
        const card = element.querySelector('.obra-card');
        const image = element.querySelector('.obra-image');
        
        // Hover effects
        card.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });

        // Click para ver detalles
        image.addEventListener('click', function() {
            window.location.href = `obra.html?id=${obra.id}`;
        });

        // Precargar imagen al hacer hover
        card.addEventListener('mouseenter', function() {
            preloadImage(obra.imagen);
        });
    }

    function filterGallery(filter) {
        currentFilter = filter;
        loadGallery(filter);
        
        // Actualizar URL sin recargar
        const url = new URL(window.location);
        if (filter === 'all') {
            url.searchParams.delete('categoria');
        } else {
            url.searchParams.set('categoria', filter);
        }
        window.history.replaceState({}, '', url);
    }

    // === FUNCIONES DE LA PÁGINA DE OBRA ===
    
    function initObraPage() {
        loadObraDetails();
        setupObraNavigation();
    }

    function loadObraDetails() {
        const urlParams = new URLSearchParams(window.location.search);
        const obraId = urlParams.get('id');
        
        if (!obraId) {
            showError('No se especificó una obra válida');
            return;
        }

        const obra = getObraById(obraId);
        
        if (!obra) {
            showError('Obra no encontrada');
            return;
        }

        renderObraDetails(obra);
        setupObraNavigation(obraId);
    }

    function renderObraDetails(obra) {
        // Actualizar título de la página
        document.title = `${obra.titulo} - Martina Art`;
        
        // Llenar los elementos con la información de la obra
        const elements = {
            imagen: document.getElementById('imagen'),
            titulo: document.getElementById('titulo'),
            categoria: document.getElementById('categoria'),
            descripcion: document.getElementById('descripcion'),
            tecnica: document.getElementById('tecnica'),
            año: document.getElementById('año'),
            dimensiones: document.getElementById('dimensiones'),
            precio: document.getElementById('precio'),
            disponible: document.getElementById('disponible')
        };

        if (elements.imagen) {
            elements.imagen.src = obra.imagen;
            elements.imagen.alt = obra.titulo;
        }
        
        if (elements.titulo) elements.titulo.textContent = obra.titulo;
        if (elements.categoria) elements.categoria.textContent = capitalizeFirst(obra.categoria);
        if (elements.descripcion) elements.descripcion.textContent = obra.descripcion;
        if (elements.tecnica) elements.tecnica.textContent = obra.tecnica;
        if (elements.año) elements.año.textContent = obra.año;
        if (elements.dimensiones) elements.dimensiones.textContent = obra.dimensiones;
        if (elements.precio) elements.precio.textContent = obra.precio;
        
        if (elements.disponible) {
            elements.disponible.textContent = obra.disponible ? 'Disponible' : 'Vendida';
            elements.disponible.className = obra.disponible ? 'disponible' : 'vendida';
        }

        // Configurar imagen con zoom
        setupImageZoom(elements.imagen);
    }

    function setupObraNavigation(currentId) {
        const prevObra = getPrevObra(currentId);
        const nextObra = getNextObra(currentId);
        
        const prevLink = document.getElementById('prev-obra');
        const nextLink = document.getElementById('next-obra');
        
        if (prevObra && prevLink) {
            prevLink.href = `obra.html?id=${prevObra.id}`;
            prevLink.querySelector('.obra-nav-title').textContent = prevObra.titulo;
            prevLink.style.display = 'flex';
        }
        
        if (nextObra && nextLink) {
            nextLink.href = `obra.html?id=${nextObra.id}`;
            nextLink.querySelector('.obra-nav-title').textContent = nextObra.titulo;
            nextLink.style.display = 'flex';
        }
        
        // Agregar navegación con teclado
        setupKeyboardNavigation(prevObra, nextObra);
    }

    function setupKeyboardNavigation(prevObra, nextObra) {
        document.addEventListener('keydown', function(e) {
            switch(e.key) {
                case 'ArrowLeft':
                    if (prevObra) {
                        window.location.href = `obra.html?id=${prevObra.id}`;
                    }
                    break;
                case 'ArrowRight':
                    if (nextObra) {
                        window.location.href = `obra.html?id=${nextObra.id}`;
                    }
                    break;
                case 'Escape':
                    window.location.href = 'index.html';
                    break;
            }
        });
    }

    function setupImageZoom(image) {
        if (!image) return;
        
        image.addEventListener('click', function() {
            toggleImageZoom(this);
        });
    }

    function toggleImageZoom(image) {
        const isZoomed = image.classList.contains('zoomed');
        
        if (isZoomed) {
            image.classList.remove('zoomed');
            document.body.classList.remove('image-zoomed');
        } else {
            image.classList.add('zoomed');
            document.body.classList.add('image-zoomed');
        }
    }

    // === FUNCIONES DE NAVEGACIÓN GENERAL ===
    
    function initNavigation() {
        // Smooth scrolling para enlaces internos
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Resaltar enlace activo en navegación
        highlightActiveNavLink();
    }

    function highlightActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            if (linkPage === currentPage) {
                link.classList.add('active');
            }
        });
    }

    // === FUNCIONES DE UTILIDAD ===
    
    function showLoading() {
        if (loading) {
            loading.style.display = 'flex';
            isLoading = true;
        }
    }

    function hideLoading() {
        if (loading) {
            loading.style.display = 'none';
            isLoading = false;
        }
    }

    function showError(message) {
        const contenido = document.getElementById('contenido');
        if (contenido) {
            contenido.innerHTML = `
                <div class="error-container">
                    <h2>Error</h2>
                    <p>${message}</p>
                    <a href="index.html" class="btn btn-primary">Volver a la galería</a>
                </div>
            `;
        }
    }

    function capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function preloadImage(src) {
        const img = new Image();
        img.src = src;
    }

    function animateGalleryItems() {
        const items = document.querySelectorAll('.obra-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1
        });

        items.forEach(item => {
            observer.observe(item);
        });
    }

    function setupLazyLoading() {
        // Configurar lazy loading para imágenes
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    // === EVENTOS GLOBALES ===
    
    // Manejar cambios de tamaño de ventana
    window.addEventListener('resize', debounce(function() {
        // Reajustar layout si es necesario
        adjustLayout();
    }, 250));

    // Manejar navegación con historial
    window.addEventListener('popstate', function(e) {
        if (gallery) {
            const urlParams = new URLSearchParams(window.location.search);
            const categoria = urlParams.get('categoria') || 'all';
            
            // Actualizar filtro activo
            filterButtons.forEach(btn => {
                btn.classList.toggle('active', btn.getAttribute('data-filter') === categoria);
            });
            
            loadGallery(categoria);
        }
    });

    function adjustLayout() {
        // Función para ajustar el layout en diferentes tamaños de pantalla
        const items = document.querySelectorAll('.obra-item');
        items.forEach(item => {
            // Reajustar animaciones o posiciones si es necesario
        });
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Inicializar filtro desde URL al cargar
    const urlParams = new URLSearchParams(window.location.search);
    const initialFilter = urlParams.get('categoria') || 'all';
    if (initialFilter !== 'all') {
        const filterBtn = document.querySelector(`[data-filter="${initialFilter}"]`);
        if (filterBtn) {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            filterBtn.classList.add('active');
        }
    }
});