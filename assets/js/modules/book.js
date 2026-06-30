/**
 * ==========================================================================
 * MÓDULO: Livro da Vida do Pet (book.js) [1]
 * Controla a exibição das abas da biografia de forma limpa.
 * ==========================================================================
 */

/**
 * Alterna a página exibida no livro da história do pet.
 * @param {number} pageNumber - O número da página clicada (1 a 4)
 */
export function switchBookPage(pageNumber) {
    // Esconde todas as páginas do livro
    document.querySelectorAll(".book-page-content").forEach(el => el.classList.add("hidden"));
    
    // Remove o estado ativo de todas as abas numeradas
    document.querySelectorAll(".book-tab-btn").forEach(el => el.classList.remove("active"));

    // Exibe a página ativa selecionada
    document.getElementById(`book-page-${pageNumber}`).classList.remove("hidden");
    
    // Acende a bolinha da aba selecionada
    document.getElementById(`tab-b${pageNumber}`).classList.add("active");
}