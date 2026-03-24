"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FibonacciSphere() {
    const groupRef = useRef();

    // 1. Generate Nodes (Points)
    const N = 300;
    const { positions, lines } = useMemo(() => {
        const pts = [];
        for (let i = 0; i < N; i++) {
            const phi = Math.acos(1 - (2 * i + 1) / N);
            const theta = Math.PI * (1 + Math.sqrt(5)) * i;
            const R = 2 + Math.random() * 0.3; // slightly bumpy
            
            pts.push(new THREE.Vector3(
                R * Math.sin(phi) * Math.cos(theta),
                R * Math.cos(phi),
                R * Math.sin(phi) * Math.sin(theta)
            ));
        }

        // 2. Generate Connections (Lines)
        const linePoints = [];
        let connections = 0;
        for (let i = 0; i < N; i++) {
            for (let j = i + 1; j < N; j++) {
                if (pts[i].distanceTo(pts[j]) < 0.9 && connections < 400) {
                    linePoints.push(pts[i], pts[j]);
                    connections++;
                }
            }
        }
        
        return { positions: pts, lines: linePoints };
    }, []);

    // 3. Float Dust Particles
    const dustParticles = useMemo(() => {
        const p = [];
        for (let i = 0; i < 500; i++) {
            p.push(
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15
            );
        }
        return new Float32Array(p);
    }, []);

    // Animation Loop
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.1344;
            groupRef.current.position.x = Math.sin(t * 0.05) * 0.1; 
        }
    });

    return (
        <group ref={groupRef} scale={1.4}>
            {/* Sphere Nodes */}
            {positions.map((p, i) => (
                <mesh key={i} position={[p.x, p.y, p.z]}>
                    <sphereGeometry args={[0.02, 8, 8]} />
                    <meshBasicMaterial color="#8B5CF6" />
                </mesh>
            ))}

            {/* Sphere Connections */}
            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={lines.length * 2} // Wait, lines array has Vector3 objects directly, need to format them.
                        array={new Float32Array(lines.flatMap(v => [v.x, v.y, v.z]))}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial 
                    color="#8B5CF6" 
                    transparent 
                    opacity={0.4} 
                    blending={THREE.AdditiveBlending} 
                />
            </lineSegments>

            {/* Orbiting Rings */}
            <mesh rotation={[Math.PI / 6, 0, 0]}>
                <torusGeometry args={[3.2, 0.003, 8, 100]} />
                <meshBasicMaterial color="#8B5CF6" transparent opacity={0.1} />
            </mesh>
            <mesh rotation={[-Math.PI / 6, 0, 0]}>
                <torusGeometry args={[2.8, 0.005, 8, 100]} />
                <meshBasicMaterial color="#10B981" transparent opacity={0.2} />
            </mesh>

            {/* Floating Dust */}
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={500}
                        array={dustParticles}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial color="#A78BFA" size={0.02} transparent opacity={0.3} />
            </points>
        </group>
    );
}

export default function NeuralSphere() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={0.5} color="#8B5CF6" />
                <FibonacciSphere />
            </Canvas>
        </div>
    );
}
