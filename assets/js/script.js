tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "secondary": "#0460a6",
                "on-surface": "#291715",
                "surface": "#fff8f7",
                "on-error-container": "#93000a",
                "surface-container-low": "#fff0ee",
                "outline-variant": "#e7bdb8",
                "on-primary": "#ffffff",
                "surface-tint": "#c00014",
                "error-container": "#ffdad6",
                "secondary-fixed": "#d2e4ff",
                "secondary-fixed-dim": "#a1c9ff",
                "primary-fixed-dim": "#ffb4ab",
                "on-background": "#291715",
                "tertiary-fixed": "#ffe16e",
                "secondary-container": "#75b4ff",
                "outline": "#926f6b",
                "on-tertiary-container": "#4c3f00",
                "primary-fixed": "#ffdad6",
                "on-tertiary": "#ffffff",
                "surface-container-highest": "#fddbd7",
                "surface-bright": "#fff8f7",
                "inverse-on-surface": "#ffedea",
                "surface-dim": "#f4d2ce",
                "inverse-primary": "#ffb4ab",
                "on-error": "#ffffff",
                "error": "#ba1a1a",
                "on-primary-fixed-variant": "#93000c",
                "surface-container": "#ffe9e6",
                "background": "#fff8f7",
                "on-primary-container": "#fffbff",
                "surface-container-high": "#ffe2de",
                "tertiary-container": "#c7aa27",
                "tertiary-fixed-dim": "#e4c542",
                "on-primary-fixed": "#410002",
                "on-secondary-fixed-variant": "#004880",
                "primary-container": "#e41f24",
                "on-surface-variant": "#5d3f3c",
                "on-tertiary-fixed": "#221b00",
                "surface-container-lowest": "#ffffff",
                "on-tertiary-fixed-variant": "#544600",
                "primary": "#bb0013",
                "tertiary": "#705d00",
                "surface-variant": "#fddbd7",
                "inverse-surface": "#402b29",
                "on-secondary-container": "#00457a",
                "on-secondary": "#ffffff",
                "on-secondary-fixed": "#001c37"
            },
            fontFamily: {
                "headline": ["Space Grotesk"],
                "body": ["Plus Jakarta Sans"],
                "label": ["Plus Jakarta Sans"]
            },
            borderRadius: { "DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem" },
        },
    },
}

// Automated Carousel System
class NewsCarousel {
    constructor(containerId, dotsId, interval = 1000) {
        this.container = document.getElementById(containerId);
        this.dotsContainer = document.getElementById(dotsId);
        if (!this.container || !this.dotsContainer) return;

        this.items = [...this.container.children];
        this.interval = interval;
        this.timer = null;
        this.currentIndex = 0;

        this.init();
    }

    init() {
        this.createDots();
        this.startAutoSlide();

        // Event Listeners
        this.container.addEventListener('scroll', () => this.syncDots());

        // Pause on interaction
        ['mouseenter', 'touchstart'].forEach(e =>
            this.container.addEventListener(e, () => this.stopAutoSlide())
        );
        ['mouseleave', 'touchend'].forEach(e =>
            this.container.addEventListener(e, () => this.startAutoSlide())
        );

        // Handle window resize
        window.addEventListener('resize', () => this.syncDots());
    }

    createDots() {
        this.dotsContainer.innerHTML = '';
        this.items.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `h-2 rounded-full bg-black/20 transition-all duration-300 hover:bg-primary/50`;
            dot.style.width = '8px';
            dot.ariaLabel = `Go to slide ${index + 1}`;
            dot.onclick = () => this.goTo(index);
            this.dotsContainer.appendChild(dot);
        });
        this.syncDots();
    }

    goTo(index) {
        const itemWidth = this.items[0].offsetWidth;
        const gap = parseInt(window.getComputedStyle(this.container).gap) || 0;
        this.container.scrollTo({
            left: index * (itemWidth + gap),
            behavior: 'smooth'
        });
    }

    syncDots() {
        const itemWidth = this.items[0].offsetWidth;
        const gap = parseInt(window.getComputedStyle(this.container).gap) || 0;
        const scrollLeft = this.container.scrollLeft;
        this.currentIndex = Math.round(scrollLeft / (itemWidth + gap));

        [...this.dotsContainer.children].forEach((dot, i) => {
            if (i === this.currentIndex) {
                dot.classList.add('bg-primary');
                dot.classList.remove('bg-black/20');
                dot.style.width = '32px';
            } else {
                dot.classList.remove('bg-primary');
                dot.classList.add('bg-black/20');
                dot.style.width = '8px';
            }
        });
    }

    startAutoSlide() {
        this.stopAutoSlide();
        this.timer = setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % this.items.length;
            this.goTo(this.currentIndex);
        }, this.interval);
    }

    stopAutoSlide() {
        if (this.timer) clearInterval(this.timer);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new NewsCarousel('activities-container', 'activities-dots', 4000);
    new NewsCarousel('leadership-container', 'leadership-dots', 3000);
    new NewsCarousel('committee-container', 'committee-dots', 2000);
});
