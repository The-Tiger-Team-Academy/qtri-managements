class QuantumParticleAnimation {
    constructor() {
        this.canvas = document.getElementById('quantumCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.connectionRadius = 150;
        this.particleCount = 100;
        this.particleSpeed = 0.5;
        this.glowIntensity = 20;
        this.colorWaveActive = true;
        this.colorWaveOffset = 0;
        
        this.resize();
        this.initParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }
    
    initParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                radius: Math.random() * 2 + 1,
                dx: (Math.random() - 0.5) * this.particleSpeed,
                dy: (Math.random() - 0.5) * this.particleSpeed,
                color: `hsla(${Math.random() * 60 + 220}, 80%, 60%, 0.8)` // Cosmic blue theme
            });
        }
    }
    
    drawConnections() {
        this.ctx.beginPath();
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                
                if (distance < this.connectionRadius) {
                    const opacity = 1 - (distance / this.connectionRadius);
                    this.ctx.strokeStyle = `rgba(100, 200, 255, ${opacity * 0.3})`;
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                }
            }
        }
        this.ctx.stroke();
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Background with fade effect
        this.ctx.fillStyle = 'rgba(10, 10, 30, 0.2)';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Update color wave
        this.colorWaveOffset += 0.01;
        
        // Draw connections
        this.drawConnections();
        
        // Update and draw particles
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        
        for (let particle of this.particles) {
            // Color Wave Effect
            if (this.colorWaveActive) {
                const distance = Math.hypot(particle.x - centerX, particle.y - centerY);
                const hue = (distance * 0.5 + this.colorWaveOffset * 100) % 360;
                particle.color = `hsla(${hue}, 70%, 60%, 0.8)`;
            }
            
            // Update position
            particle.x += particle.dx;
            particle.y += particle.dy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.width) {
                particle.dx *= -1;
            }
            if (particle.y < 0 || particle.y > this.height) {
                particle.dy *= -1;
            }
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.fillStyle = particle.color;
            this.ctx.shadowBlur = this.glowIntensity;
            this.ctx.shadowColor = particle.color;
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when the page loads
window.addEventListener('load', () => {
    if (document.getElementById('quantumCanvas')) {
        new QuantumParticleAnimation();
    }
}); 