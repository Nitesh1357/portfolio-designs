document.addEventListener('DOMContentLoaded', () => {
            const form = document.getElementById('imcForm');
            const weightInput = document.getElementById('weight');
            const heightInput = document.getElementById('height');
            const resultArea = document.getElementById('resultArea');
            const imcValueSpan = document.getElementById('imcValue');
            const classificationSpan = document.getElementById('classification');

            function calculateIMC(weight, height) {
                return weight / (height * height);
            }

            function classifyIMC(imc) {
                let classification = '';
                let colorClass = 'text-gray-700'; 

                if (imc < 18.5) {
                    classification = 'Magreza';
                    colorClass = 'text-red-500';
                } else if (imc >= 18.5 && imc <= 24.9) {
                    classification = 'Normal';
                    colorClass = 'text-green-600';
                } else if (imc >= 25.0 && imc <= 29.9) {
                    classification = 'Sobrepeso';
                    colorClass = 'text-yellow-600';
                } else if (imc >= 30.0 && imc <= 39.9) {
                    classification = 'Obesidade';
                    colorClass = 'text-orange-600';
                } else {
                    classification = 'Obesidade Grave';
                    colorClass = 'text-red-700';
                }

                return { classification, colorClass };
            }

            form.addEventListener('submit', (e) => {
                e.preventDefault(); 

                const weight = parseFloat(weightInput.value);
                const height = parseFloat(heightInput.value);

                if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
                    imcValueSpan.textContent = 'Erro';
                    classificationSpan.textContent = 'Por favor, insira valores válidos e positivos.';
                    classificationSpan.className = 'font-semibold text-red-600';
                    resultArea.classList.remove('hidden');
                    console.error("Valores de entrada inválidos.");
                    return;
                }
                
                const imc = calculateIMC(weight, height);
                const imcRounded = imc.toFixed(2); // Arredonda para 2 casas decimais

                const { classification, colorClass } = classifyIMC(imc);

                imcValueSpan.textContent = imcRounded;
                classificationSpan.textContent = classification;
                
                classificationSpan.className = `font-semibold text-lg ${colorClass}`; 

                resultArea.classList.remove('hidden');
            });
        });