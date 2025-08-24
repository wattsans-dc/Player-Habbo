// Player YouTube complet en JavaScript
class YouTubePlayer {
    constructor() {
        this.player = null;
        this.isDragging = false;
        this.offsetX = 0;
        this.offsetY = 0;
        this.playerContainer = null;
        this.isVisible = false;
        
        this.createPlayer();
        this.attachEvents();
    }

    createPlayer() {
        // Créer le conteneur principal
        this.playerContainer = document.createElement('div');
        this.playerContainer.id = 'playerContainer';
        this.playerContainer.className = 'player-container';
        
        // Ajouter le CSS
        this.addStyles();
        
        // Créer le HTML du player
        this.playerContainer.innerHTML = `
            <form id="myForm">
                <div class="input-group">
                    <input type="text" placeholder="Lien de la musique (YouTube)" id="video" name="video" class="input-field"/>
                    <button type="button" id="submitFormData" class="play-button">Jouer</button>
                </div>
                <div class="controls">
                    <button type="button" class="control-btn" id="pauseBtn">Pause</button>
                    <button type="button" class="control-btn" id="resumeBtn">Reprendre</button>
                    <button type="button" class="control-btn" id="stopBtn">Stop</button>
                </div>
                <div class="controls">
                    <button type="button" class="control-btn" id="volumeUp">🔊 +</button>
                    <button type="button" class="control-btn" id="volumeDown">🔉 -</button>
                    <button type="button" class="control-btn" id="resetVolume">🔄 Volume</button>
                </div>
                <div class="controls">
                    <button type="button" class="control-btn" id="speedUp">⏩ +</button>
                    <button type="button" class="control-btn" id="speedDown">⏪ -</button>
                    <button type="button" class="control-btn" id="resetSpeed">🔄 Vitesse</button>
                </div>
                <div id="results" class="results"></div>
                <label>
                    <input type="checkbox" id="audioOnly"> Mode audio seulement
                </label>
            </form>
        `;

        // Cacher le player au début
        this.playerContainer.style.display = 'none';
        
        // Ajouter au body
        document.body.appendChild(this.playerContainer);
    }

    addStyles() {
        // Créer et ajouter le CSS
        const style = document.createElement('style');
        style.textContent = `
            .player-container {
                width: 320px;
                background: #222;
                padding: 15px;
                border-radius: 10px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
                text-align: center;
                color: white;
                position: fixed;
                top: 100px;
                left: 60px;
                cursor: grab;
                z-index: 9999;
                transition: opacity 0.3s ease;
            }

            .player-container.dragging {
                cursor: grabbing;
            }

            .input-group {
                display: flex;
                gap: 10px;
            }

            .input-field {
                flex: 1;
                padding: 10px;
                border: none;
                border-radius: 5px;
                background: white;
                color: black;
            }

            .play-button {
                background: #28a745;
                color: white;
                border: none;
                padding: 10px 15px;
                cursor: pointer;
                border-radius: 5px;
                font-weight: bold;
            }

            .play-button:hover {
                background: #218838;
            }

            .controls {
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
                gap: 5px;
            }

            .control-btn {
                background: #007bff;
                color: white;
                border: none;
                padding: 8px 12px;
                cursor: pointer;
                border-radius: 5px;
                font-size: 12px;
                flex: 1;
            }

            .control-btn:hover {
                background: #0056b3;
            }

            .results {
                margin-top: 10px;
                color: white;
            }

            .results iframe {
                border-radius: 5px;
            }

            .player-container label {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 5px;
                margin-top: 10px;
                font-size: 14px;
            }

            .player-container input[type="checkbox"] {
                margin: 0;
            }
        `;
        
        // Vérifier si le style n'existe pas déjà
        if (!document.querySelector('#youtube-player-styles')) {
            style.id = 'youtube-player-styles';
            document.head.appendChild(style);
        }
    }

    attachEvents() {
        // Drag & Drop du player
        this.playerContainer.addEventListener("mousedown", (e) => {
            // Ne pas démarrer le drag si on clique sur un input ou bouton
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') {
                return;
            }
            
            this.isDragging = true;
            this.offsetX = e.clientX - this.playerContainer.offsetLeft;
            this.offsetY = e.clientY - this.playerContainer.offsetTop;
            this.playerContainer.classList.add('dragging');
        });

        document.addEventListener("mousemove", (e) => {
            if (this.isDragging) {
                this.playerContainer.style.left = `${e.clientX - this.offsetX}px`;
                this.playerContainer.style.top = `${e.clientY - this.offsetY}px`;
            }
        });

        document.addEventListener("mouseup", () => {
            this.isDragging = false;
            this.playerContainer.classList.remove('dragging');
        });

        // Event listeners pour les contrôles
        this.playerContainer.addEventListener('click', (e) => {
            e.stopPropagation();
            
            switch(e.target.id) {
                case 'submitFormData':
                    this.playVideo();
                    break;
                case 'pauseBtn':
                    this.pauseVideo();
                    break;
                case 'resumeBtn':
                    this.resumeVideo();
                    break;
                case 'stopBtn':
                    this.stopVideo();
                    break;
                case 'volumeUp':
                    this.setVolume(100);
                    break;
                case 'volumeDown':
                    this.setVolume(20);
                    break;
                case 'resetVolume':
                    this.setVolume(50);
                    break;
                case 'speedUp':
                    this.setPlaybackRate(2.0);
                    break;
                case 'speedDown':
                    this.setPlaybackRate(0.5);
                    break;
                case 'resetSpeed':
                    this.setPlaybackRate(1.0);
                    break;
            }
        });
    }

    extractVideoID(url) {
        const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    playVideo() {
        const videoUrl = document.getElementById("video").value;
        const audioOnly = document.getElementById("audioOnly").checked;
        
        if (videoUrl) {
            const videoID = this.extractVideoID(videoUrl);
            if (videoID) {
                const embedUrl = `https://www.youtube.com/embed/${videoID}?enablejsapi=1&autoplay=1` +
                    (audioOnly ? "&controls=0&showinfo=0&rel=0&modestbranding=1" : "");
                
                document.getElementById("results").innerHTML = 
                    `<iframe id="ytPlayer" width="300" height="${audioOnly ? '0' : '150'}" 
                    src="${embedUrl}" frameborder="0" allow="autoplay"></iframe>`;
                
                setTimeout(() => {
                    this.player = document.getElementById("ytPlayer");
                }, 1000);
            }
        }
    }

    pauseVideo() {
        if (this.player) {
            this.player.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
    }

    resumeVideo() {
        if (this.player) {
            this.player.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        }
    }

    stopVideo() {
        if (this.player) {
            document.getElementById("results").innerHTML = "";
            this.player = null;
        }
    }

    setVolume(volume) {
        if (this.player) {
            this.player.contentWindow.postMessage(`{"event":"command","func":"setVolume","args":[${volume}]}`, '*');
        }
    }

    setPlaybackRate(rate) {
        if (this.player) {
            this.player.contentWindow.postMessage(`{"event":"command","func":"setPlaybackRate","args":[${rate}]}`, '*');
        }
    }

    show() {
        this.playerContainer.style.display = 'block';
        this.playerContainer.style.opacity = '1';
        this.isVisible = true;
    }

    hide() {
        this.playerContainer.style.opacity = '0';
        setTimeout(() => {
            this.playerContainer.style.display = 'none';
            this.isVisible = false;
            // Nettoyer le player
            if (this.player) {
                document.getElementById("results").innerHTML = "";
                this.player = null;
            }
        }, 300);
    }

    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }

    destroy() {
        // Nettoyer les événements et supprimer l'élément
        if (this.playerContainer) {
            this.playerContainer.remove();
        }
        
        const style = document.querySelector('#youtube-player-styles');
        if (style) {
            style.remove();
        }
    }
}

// Exporter pour utilisation globale
window.YouTubePlayer = YouTubePlayer;