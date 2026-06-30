/**
 * ==========================================================================
 * UTILITÁRIO: Visualizador de Imagens (Lightbox Card com Swipe) [1]
 * Exibe mídias em card, com legenda nítida em branco e deslize nativo.
 * ==========================================================================
 */

// Banco de dados de imagens da galeria do Thor [1]
const ALBUM_THOR = [
    { src: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop", caption: "Thor Filhotinho de Ouro 🐾", date: "Julho de 2014" },
    { src: "https://images.unsplash.com/photo-1514984879728-be0aff75a6e8?q=80&w=600&auto=format&fit=crop", caption: "Bagunçando no Jardim de Casa 🏡", date: "Abril de 2016" },
    { src: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=600&auto=format&fit=crop", caption: "Seu Primeiro Banho de Mar 🌊", date: "Janeiro de 2017" },
    { src: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=600&auto=format&fit=crop", caption: "Soneca da Tarde Abençoada 💤", date: "Outubro de 2018" },
    { src: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=600&auto=format&fit=crop", caption: "Olhar de Puro Companheirismo 👀", date: "Maio de 2020" },
    { src: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=600&auto=format&fit=crop", caption: "Sessão de Cliques no Parque 🌳", date: "Novembro de 2022" },
    { src: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?q=80&w=600&auto=format&fit=crop", caption: "Dormindo de Patas para o Ar 🛏️", date: "Setembro de 2024" },
    { src: "https://images.unsplash.com/photo-1444212477490-ca407925329e?q=80&w=600&auto=format&fit=crop", caption: "Nosso Grande Guardião de Almas 🐕", date: "Março de 2025" },
    { src: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=600&auto=format&fit=crop", caption: "Seu Sorriso Mais Doce e Marcante ✨", date: "Fevereiro de 2026" }
];

let currentPhotoIndex = 0; // Índice da imagem ativa
let touchStartX = 0;
let touchEndX = 0;

/**
 * Abre o lightbox inicializando a imagem da galeria com seu índice físico [1].
 */
export function openGalleryLightbox(index) {
    currentPhotoIndex = index;
    atualizarDadosLightbox();
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Abre o lightbox para clique único simples (Ex: foto de perfil do cabeçalho).
 */
export function openLightbox(imgSrc, captionText = "Nosso Doce Thor", dateText = "* 2014  † 2026") {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    const caption = document.getElementById('lightboxCaption');
    const date = document.getElementById('lightboxDate');
    
    if (!lightbox || !img) return;

    img.src = imgSrc;
    caption.innerText = captionText;
    date.innerText = dateText;
    
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

/**
 * Rotaciona dinamicamente as fotos com base na direção.
 */
export function changeLightboxImage(direction) {
    currentPhotoIndex = (currentPhotoIndex + direction + ALBUM_THOR.length) % ALBUM_THOR.length;
    atualizarDadosLightbox();
}

function atualizarDadosLightbox() {
    const fotoAtiva = ALBUM_THOR[currentPhotoIndex];
    const img = document.getElementById('lightboxImg');
    const caption = document.getElementById('lightboxCaption');
    const date = document.getElementById('lightboxDate');
    
    if (img && caption && date) {
        img.src = fotoAtiva.src;
        caption.innerText = fotoAtiva.caption;
        date.innerText = fotoAtiva.date;
    }
}

/**
 * Configura as escutas de toque para o deslizamento lateral (Swipe) [1].
 */
export function configurarSwipeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        lidarComSwipe();
    }, { passive: true });
}

function lidarComSwipe() {
    const limiteDeslize = 50; // Pixels mínimos para considerar deslizamento
    
    if (touchStartX - touchEndX > limiteDeslize) {
        // Deslizou para a Esquerda -> Próxima Foto [1]
        changeLightboxImage(1);
    } else if (touchEndX - touchStartX > limiteDeslize) {
        // Deslizou para a Direita -> Foto Anterior [1]
        changeLightboxImage(-1);
    }
}

export function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

export function forceCloseLightbox() {
    closeLightbox();
}