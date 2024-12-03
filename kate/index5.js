import * as THREE from 'https://unpkg.com/three@0.159.0/build/three.module.js';
        import { ARButton } from 'https://unpkg.com/three@0.159.0/examples/jsm/webxr/ARButton.js';
        import { OBJLoader } from 'https://unpkg.com/three@0.159.0/examples/jsm/loaders/OBJLoader.js';

        let camera, scene, renderer;

        init();
        animate();

        function init() {
            // Створення сцени, камери та рендера
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.xr.enabled = true;
            document.body.appendChild(renderer.domElement);

            // Кнопка AR
            const button = ARButton.createButton(renderer);
            document.body.appendChild(button);

            // Освітлення
            const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
            light.position.set(0.5, 1, 0.25);
            scene.add(light);

            // Завантаження OBJ-моделі
            const loader = new OBJLoader();
            loader.load(
                './3d/Methanol.obj', // Шлях до вашої моделі
                (obj) => {
                    obj.position.set(0, 0, -2); // Розміщення моделі перед камерою
                    obj.scale.set(0.1, 0.1, 0.1); // Масштаб моделі
                    scene.add(obj);
                },
                (xhr) => {
                    console.log(`Завантажено: ${(xhr.loaded / xhr.total * 100).toFixed(2)}%`);
                },
                (error) => {
                    console.error('Помилка завантаження моделі:', error);
                }
            );

            window.addEventListener('resize', onWindowResize);
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function animate() {
            renderer.setAnimationLoop(() => {
                renderer.render(scene, camera);
            });
        }