/**
 * ==========================================================================
 * MÓDULO: Mural de Carinho (Sincronização Firebase Firestore) [1, 2, 3]
 * Sincroniza em tempo real as fotos e reações do pet.
 * ==========================================================================
 */

import { db } from '../firebase/config.js';
import { collection, addDoc, query, where, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";
import { openLightbox } from '../utils/lightbox.js';

let selectedImageBase64 = ""; // Armazena a foto ativa em Base64
const EVENTO_ID = "thor-memorial"; // Identificador exclusivo do pet no banco

/**
 * Escuta as atualizações do banco de dados em tempo real na nuvem do Firebase [2].
 */
export function inicializarMuralRealTime() {
    const q = query(
        collection(db, "mensagens"),
        where("eventoId", "==", EVENTO_ID),
        orderBy("createdAt", "desc")
    );

    // Monitoramento ativo em tempo real
    onSnapshot(q, (snapshot) => {
        const mural = document.getElementById("muralFeed");
        if (!mural) return;

        mural.innerHTML = ""; // Limpa mural para redesenhar

        snapshot.forEach((doc) => {
            const msg = doc.data();
            const docId = doc.id;
            let layoutFoto = "";

            if (msg.photo) {
                layoutFoto = `
                    <div class="mural-media" id="media-${docId}">
                        <img src="${msg.photo}" alt="Foto Homenagem">
                    </div>
                `;
            }

            // Atribuição de Emojis para as reações de luto pet
            let emoji = "❤️";
            if (msg.relation === "Saudade") emoji = "🥺";
            if (msg.relation === "Gratidão") emoji = "✨";
            if (msg.relation === "Lambidas") emoji = "🐾";
            if (msg.relation === "Doçura") emoji = "🕊️";

            mural.innerHTML += `
                <div class="mural-card">
                    <div class="mural-card-header">
                        <div class="mural-author-container">
                            <span class="mural-author">${msg.author}</span>
                            <span class="mural-relation-badge">${msg.relation} ${emoji}</span>
                        </div>
                        <span class="mural-time">Agora</span>
                    </div>
                    ${msg.text ? `<p class="mural-text">${msg.text}</p>` : ''}
                    ${layoutFoto}
                </div>
            `;

            // Vincula o Lightbox de tela cheia
            if (msg.photo) {
                setTimeout(() => {
                    const imgEl = document.getElementById(`media-${docId}`);
                    if (imgEl) imgEl.onclick = () => openLightbox(msg.photo, msg.author, "Membro da Família");
                }, 50);
            }
        });
    }, (error) => {
        console.error("Erro no mural do Firebase:", error);
    });
}

/**
 * Preview da foto de carinho do pet
 */
export function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            selectedImageBase64 = e.target.result;
            document.getElementById('image_preview').src = selectedImageBase64;
            document.getElementById('preview_container').classList.remove('hidden');
            document.getElementById('photo_placeholder').innerHTML = "<span>✓</span> Foto Carregada";
        };
        reader.readAsDataURL(file);
    }
}

/**
 * Limpa a seleção da foto carregada
 */
export function removePreview() {
    selectedImageBase64 = "";
    document.getElementById('form_photo').value = "";
    document.getElementById('preview_container').classList.add('hidden');
    document.getElementById('photo_placeholder').innerHTML = "<span>📸</span> Tirar Foto ou Anexar";
}

/**
 * Envia as informações do formulário para o Firestore [2].
 */
export async function handleLiveSubmit(event) {
    event.preventDefault();

    const nome = document.getElementById('form_name').value;
    const relacao = document.getElementById('form_relation').value;
    const texto = document.getElementById('form_text').value;

    if (!texto.trim() && !selectedImageBase64) {
        alert("Por favor, digite um recadinho ou tire uma foto para anexar à nota!");
        return;
    }

    try {
        await addDoc(collection(db, "mensagens"), {
            eventoId: EVENTO_ID,
            author: nome,
            relation: relacao,
            text: texto,
            photo: selectedImageBase64,
            createdAt: new Date().toISOString()
        });

        // Limpa os campos do formulário (Agora será executado com sucesso!) [1]
        document.getElementById('form_name').value = "";
        document.getElementById('form_text').value = "";
        removePreview();

        alert("Seu carinho foi gravado e compartilhado no mural ao vivo! 🎉");
    } catch (e) {
        console.error("Erro ao tentar salvar no Firestore:", e);
        alert("Erro de conexão ao enviar ao Firebase.");
    }
}