
        const messages = [
            "¿Has pensado en hacer un evento para presentarlo?", "La vida es bella", "Sigue adelante", "Tú puedes",
            "Sonríe siempre", "¿Y si creas invitaciones para probarlo?", "Disfruta el momento", "Ama la vida",
            "¿Has pensado en promocionarlo en la calle?", "Nunca te rindas", "Cree en ti", "Sé valiente",
            "Aprende siempre", "¿Y si la gente pudiera ver como va tu producto?", "Ayuda a otros", "Sé agradecido"
        ];

        function createCard(index) {
            return `
                <div class="card">
                    <div class="card-inner">
                        <div class="card-front"><h2>Card FLow </h2></div>
                        <div class="card-back"><p></p></div>
                    </div>
                </div>
            `;
        }

        function setRandomMessage(card) {
            const backSide = card.querySelector('.card-back p');
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            backSide.textContent = randomMessage;
        }

        function initializeCards() {
            const cardContainer = document.querySelector('.card-container');
            cardContainer.innerHTML = '';
            for (let i = 0; i < 8; i++) {
                cardContainer.innerHTML += createCard(i);
            }

            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                setRandomMessage(card);
                card.addEventListener('click', function() {
                    this.classList.toggle('flipped');
                });
            });
        }

        document.addEventListener('DOMContentLoaded', initializeCards);

        document.getElementById('reloadButton').addEventListener('click', initializeCards);


        /* comienza codigo barra de desarrollo*/
        // Definir las etapas de desarrollo
        const developmentStages = [
            { name: "Diseño básico", completed: true },
            { name: "Implementación de cartas", completed: true },
            { name: "Animaciones de cartas", completed: true },
            { name: "Mensajes aleatorios", completed: true },
            { name: "Botón de recarga", completed: true },
            { name: "Responsive design", completed: false },
            { name: "Optimización de rendimiento", completed: false },
            { name: "Pruebas de usuario", completed: false },
            { name: "Depuración final", completed: false },
            { name: "Lanzamiento", completed: false }
        ];

        function updateProgressBar() {
            const totalStages = developmentStages.length;
            const completedStages = developmentStages.filter(stage => stage.completed).length;
            const progressPercentage = (completedStages / totalStages) * 100;

            const progressBar = document.getElementById('progressBar');
            const progressLabel = document.getElementById('progressLabel');

            progressBar.style.width = progressPercentage + '%';
            progressLabel.textContent = Math.round(progressPercentage) + '% Completado';
        }

        document.addEventListener('DOMContentLoaded', function() {
            initializeCards();
            updateProgressBar();
        });
