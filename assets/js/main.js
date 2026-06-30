/**
 * ==========================================================================
 * ORQUESTRADOR CENTRAL - main.js (Módulo Entrada - Lumora Pet)
 * Importa todas as subfunções lógicas e resolve o problema de escopo global.
 * ==========================================================================
 */

// Importações lógicas dos módulos
import { switchBookPage } from './modules/book.js';
import { toggleModal } from './modules/modal.js';
import { openLightbox, openGalleryLightbox, changeLightboxImage, configurarSwipeLightbox, forceCloseLightbox, closeLightbox } from './utils/lightbox.js';
import { inicializarMuralRealTime, handleLiveSubmit, previewImage, removePreview } from './modules/mural.js';

document.addEventListener("DOMContentLoaded", () => {
    // 1. Conecta ao Firebase e sincroniza o Mural de Carinho em tempo real [2]
    inicializarMuralRealTime();

    // 2. Configura a escuta de toque lateral (Swipe) na galeria [1]
    configurarSwipeLightbox();
});

// RESOLUÇÃO DE ESCOPO: Vincula os módulos à janela global "window" para os cliques do HTML funcionarem [1]
window.toggleModal = toggleModal;
window.switchBookPage = switchBookPage;
window.openGalleryLightbox = openGalleryLightbox;
window.changeLightboxImage = changeLightboxImage;
window.forceCloseLightbox = forceCloseLightbox;
window.closeLightbox = closeLightbox;
window.handleLiveSubmit = handleLiveSubmit;
window.previewImage = previewImage;
window.removePreview = removePreview;
window.openLightbox = openLightbox;