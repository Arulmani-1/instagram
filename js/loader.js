// STACKLY Global Preloader
(function() {
    const loaderHtml = `
        <div id="stackly-global-loader" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: #0d0d0d; z-index: 2147483647; display: flex; justify-content: center; align-items: center; transition: opacity 0.5s ease, visibility 0.5s; opacity: 1; visibility: visible;">
            <div class="loader-container" style="position: relative; width: 120px; height: 120px; display: flex; justify-content: center; align-items: center;">
                
                <!-- Yellow to Green Sweeping Ring -->
                <div class="loader-ring" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 50%; background: conic-gradient(from 0deg, transparent 40%, rgba(57, 255, 20, 0.4) 75%, #FFD700 100%); -webkit-mask: radial-gradient(transparent 55%, #000 56%); mask: radial-gradient(transparent 55%, #000 56%); animation: spinRing 1s linear infinite;"></div>
                
                <!-- Solid Yellow S Logo -->
                <svg viewBox="0 0 100 100" width="50" height="50" style="position: relative; z-index: 2; filter: drop-shadow(0 0 8px rgba(255,215,0,0.3));">
                    <!-- Top Droplet -->
                    <path d="M 60 10 C 40 30, 30 45, 30 60 C 30 75, 50 75, 50 60 C 50 50, 60 35, 65 10 Z" fill="#FFD700"/>
                    <!-- Bottom Droplet -->
                    <path d="M 40 90 C 60 70, 70 55, 70 40 C 70 25, 50 25, 50 40 C 50 50, 40 65, 35 90 Z" fill="#FFD700"/>
                </svg>
            </div>
            <style>
                @keyframes spinRing {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                body.is-loading {
                    overflow: hidden !important;
                }
            </style>
        </div>
    `;

    document.write(loaderHtml);

    function hideLoader() {
        const loader = document.getElementById("stackly-global-loader");
        if(loader) {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
            document.body.classList.remove("is-loading");
        }
    }

    // Show loader for 3 seconds on fresh page load
    setTimeout(hideLoader, 3000);

    // On back/forward button - hide loader INSTANTLY (no loading again)
    window.addEventListener("pageshow", (e) => {
        if (e.persisted || (performance && performance.navigation && performance.navigation.type === 2)) {
            hideLoader();
        }
    });
})();
