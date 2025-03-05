'use client';

import { useEffect, useRef } from 'react';

export default function QuantumBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    console.log('QuantumBackground mounted');
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // ตั้งค่า canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // ตั้งค่าพารามิเตอร์
    const particles: any[] = [];
    const particleCount = 150;
    const connectionRadius = 150;
    const particleSpeed = 1.5;
    const glowIntensity = 20;
    let colorWaveOffset = 0;
    
    // สร้างอนุภาค
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * particleSpeed,
        dy: (Math.random() - 0.5) * particleSpeed,
        color: `hsla(${Math.random() * 60 + 220}, 80%, 60%, 0.8)` // Cosmic blue theme
      });
    }
    
    // ฟังก์ชันวาดเส้นเชื่อมต่อ
    function drawConnections() {
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          
          if (distance < connectionRadius) {
            const opacity = 1 - (distance / connectionRadius);
            ctx.strokeStyle = `rgba(100, 200, 255, ${opacity * 0.3})`;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
      }
      ctx.stroke();
    }
    
    // ฟังก์ชัน animation
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // พื้นหลังแบบเฟด
      ctx.fillStyle = 'rgba(10, 10, 30, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // อัปเดตคลื่นสี
      colorWaveOffset += 0.02;
      
      // วาดเส้นเชื่อมต่อ
      drawConnections();
      
      // อัปเดตและวาดอนุภาค
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      for (let particle of particles) {
        // เอฟเฟกต์คลื่นสี
        const distance = Math.hypot(particle.x - centerX, particle.y - centerY);
        const hue = (distance * 0.5 + colorWaveOffset * 100) % 360;
        particle.color = `hsla(${hue}, 70%, 60%, 0.8)`;
        
        // อัปเดตตำแหน่ง
        particle.x += particle.dx;
        particle.y += particle.dy;
        
        // สะท้อนเมื่อชนขอบ
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.dx *= -1;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.dy *= -1;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }
        
        // วาดอนุภาค
        ctx.beginPath();
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = glowIntensity;
        ctx.shadowColor = particle.color;
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      
      // วนลูป animation
      animationIdRef.current = requestAnimationFrame(animate);
    }
    
    // เริ่ม animation
    animationIdRef.current = requestAnimationFrame(animate);
    
    // ปรับขนาด canvas เมื่อขนาดหน้าจอเปลี่ยน
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    // ทำความสะอาดเมื่อ component ถูก unmount
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ backgroundColor: '#0a0a1e' }}
      aria-hidden="true"
    />
  );
} 