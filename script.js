document.addEventListener('DOMContentLoaded', function() {
    const presidents = [
        { number: 1, name: "George Washington", term: "1789-1797", party: "No Party" },
        { number: 2, name: "John Adams", term: "1797-1801", party: "Federalist" },
        { number: 3, name: "Thomas Jefferson", term: "1801-1809", party: "Democratic-Republican" },
        { number: 4, name: "James Madison", term: "1809-1817", party: "Democratic-Republican" },
        { number: 5, name: "James Monroe", term: "1817-1825", party: "Democratic-Republican" },
        { number: 6, name: "John Quincy Adams", term: "1825-1829", party: "Democratic-Republican" },
        { number: 7, name: "Andrew Jackson", term: "1829-1837", party: "Democratic" },
        { number: 8, name: "Martin Van Buren", term: "1837-1841", party: "Democratic" },
        { number: 9, name: "William Henry Harrison", term: "1841", party: "Whig" },
        { number: 10, name: "John Tyler", term: "1841-1845", party: "Whig" },
        { number: 11, name: "James K. Polk", term: "1845-1849", party: "Democratic" },
        { number: 12, name: "Zachary Taylor", term: "1849-1850", party: "Whig" },
        { number: 13, name: "Millard Fillmore", term: "1850-1853", party: "Whig" },
        { number: 14, name: "Franklin Pierce", term: "1853-1857", party: "Democratic" },
        { number: 15, name: "James Buchanan", term: "1857-1861", party: "Democratic" },
        { number: 16, name: "Abraham Lincoln", term: "1861-1865", party: "Republican" },
        { number: 17, name: "Andrew Johnson", term: "1865-1869", party: "Democratic" },
        { number: 18, name: "Ulysses S. Grant", term: "1869-1877", party: "Republican" },
        { number: 19, name: "Rutherford B. Hayes", term: "1877-1881", party: "Republican" },
        { number: 20, name: "James A. Garfield", term: "1881", party: "Republican" },
        { number: 21, name: "Chester A. Arthur", term: "1881-1885", party: "Republican" },
        { number: 22, name: "Grover Cleveland", term: "1885-1889", party: "Democratic" },
        { number: 23, name: "Benjamin Harrison", term: "1889-1893", party: "Republican" },
        { number: 24, name: "Grover Cleveland", term: "1893-1897", party: "Democratic" },
        { number: 25, name: "William McKinley", term: "1897-1901", party: "Republican" },
        { number: 26, name: "Theodore Roosevelt", term: "1901-1909", party: "Republican" },
        { number: 27, name: "William Howard Taft", term: "1909-1913", party: "Republican" },
        { number: 28, name: "Woodrow Wilson", term: "1913-1921", party: "Democratic" },
        { number: 29, name: "Warren G. Harding", term: "1921-1923", party: "Republican" },
        { number: 30, name: "Calvin Coolidge", term: "1923-1929", party: "Republican" },
        { number: 31, name: "Herbert Hoover", term: "1929-1933", party: "Republican" },
        { number: 32, name: "Franklin D. Roosevelt", term: "1933-1945", party: "Democratic" },
        { number: 33, name: "Harry S. Truman", term: "1945-1953", party: "Democratic" },
        { number: 34, name: "Dwight D. Eisenhower", term: "1953-1961", party: "Republican" },
        { number: 35, name: "John F. Kennedy", term: "1961-1963", party: "Democratic" },
        { number: 36, name: "Lyndon B. Johnson", term: "1963-1969", party: "Democratic" },
        { number: 37, name: "Richard Nixon", term: "1969-1974", party: "Republican" },
        { number: 38, name: "Gerald Ford", term: "1974-1977", party: "Republican" },
        { number: 39, name: "Jimmy Carter", term: "1977-1981", party: "Democratic" },
        { number: 40, name: "Ronald Reagan", term: "1981-1989", party: "Republican" },
        { number: 41, name: "George H. W. Bush", term: "1989-1993", party: "Republican" },
        { number: 42, name: "Bill Clinton", term: "1993-2001", party: "Democratic" },
        { number: 43, name: "George W. Bush", term: "2001-2009", party: "Republican" },
        { number: 44, name: "Barack Obama", term: "2009-2017", party: "Democratic" },
        { number: 45, name: "Donald Trump", term: "2017-2021", party: "Republican" },
        { number: 46, name: "Joe Biden", term: "2021-Present", party: "Democratic" },
    ];

    // Initialize range selection dropdowns
    function initializeRangeSelectors() {
        const startSelect = document.getElementById('start-president');
        const endSelect = document.getElementById('end-president');
        
        // Clear existing options
        startSelect.innerHTML = '';
        endSelect.innerHTML = '';
        
        // Add presidents to the select options
        presidents.forEach(president => {
            const startOption = document.createElement('option');
            startOption.value = president.number;
            startOption.textContent = `${president.number}. ${president.name}`;
            startSelect.appendChild(startOption);
            
            const endOption = document.createElement('option');
            endOption.value = president.number;
            endOption.textContent = `${president.number}. ${president.name}`;
            endSelect.appendChild(endOption);
        });
        
        // Set default values (all presidents)
        startSelect.value = '1';
        endSelect.value = presidents[presidents.length - 1].number.toString();
        
        // Add event listeners to highlight range in reference table
        startSelect.addEventListener('change', highlightSelectedRange);
        endSelect.addEventListener('change', highlightSelectedRange);
        
        // Initial highlighting
        highlightSelectedRange();
    }
    
    // Highlight the selected range in the reference table
    function highlightSelectedRange() {
        const startNumber = parseInt(document.getElementById('start-president').value);
        const endNumber = parseInt(document.getElementById('end-president').value);
        
        // Validate range
        if (startNumber > endNumber) {
            // Swap values if start is greater than end
            const temp = startNumber;
            document.getElementById('start-president').value = endNumber;
            document.getElementById('end-president').value = temp;
        }
        
        // Clear existing highlights
        const rows = document.querySelectorAll('#presidents-table tbody tr');
        rows.forEach(row => row.classList.remove('in-selected-range'));
        
        // Add highlights to selected range
        rows.forEach(row => {
            const presidentNumber = parseInt(row.cells[0].textContent);
            if (presidentNumber >= startNumber && presidentNumber <= endNumber) {
                row.classList.add('in-selected-range');
            }
        });
    }
    
    // Get the selected range of presidents for the quiz
    function getSelectedPresidents() {
        const startNumber = parseInt(document.getElementById('start-president').value);
        const endNumber = parseInt(document.getElementById('end-president').value);
        
        return presidents.filter(president => 
            president.number >= startNumber && president.number <= endNumber
        );
    }

    // Populate the presidents reference table
    function populatePresidentsTable() {
        const tableBody = document.querySelector('#presidents-table tbody');
        tableBody.innerHTML = ''; // Clear existing table content
        
        presidents.forEach(president => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${president.number}</td>
                <td>${president.name}</td>
                <td>${president.party}</td>
                <td>${president.term}</td>
            `;
            
            // Add party-based styling
            row.classList.add(getPartyClass(president.party));
            
            // Add hover and click events
            row.addEventListener('mouseover', function() {
                this.classList.add('hover');
            });
            
            row.addEventListener('mouseout', function() {
                this.classList.remove('hover');
            });
            
            row.addEventListener('click', function() {
                showPresidentDetail(president);
            });
            
            tableBody.appendChild(row);
        });
    }
    
    function showPresidentDetail(president) {
        const modal = document.createElement('div');
        modal.className = 'president-modal';
        modal.innerHTML = `
            <div class="modal-content ${getPartyClass(president.party)}">
                <span class="close-button">&times;</span>
                <h2>${president.name}</h2>
                <div class="president-details">
                    <p><strong>Number:</strong> ${president.number}</p>
                    <p><strong>Party:</strong> ${president.party}</p>
                    <p><strong>Term:</strong> ${president.term}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const closeButton = modal.querySelector('.close-button');
        closeButton.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // Close modal when clicking outside the content
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
    
    function getPartyClass(party) {
        switch(party) {
            case 'Republican': return 'party-republican';
            case 'Democratic': return 'party-democratic';
            case 'Whig': return 'party-whig';
            case 'Federalist': return 'party-federalist';
            case 'Democratic-Republican': return 'party-democratic-republican';
            default: return 'party-other';
        }
    }
    
    // Set up party filter functionality
    const partyFilter = document.getElementById('party-filter');
    partyFilter.addEventListener('change', function() {
        const selectedParty = this.value;
        const rows = document.querySelectorAll('#presidents-table tbody tr');
        
        rows.forEach(row => {
            const partyCell = row.cells[2].textContent;
            if (selectedParty === 'all' || partyCell === selectedParty) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
    
    // Initialize the presidents table
    populatePresidentsTable();
    // Initialize the range selectors
    initializeRangeSelectors();

    // Quiz functionality
    const quizContainer = document.getElementById("quiz-container");
    const startQuizButton = document.getElementById("start-quiz");

    let currentQuestionIndex = 0;
    let questionType = 'name'; // Can be 'name', 'number', or 'party'
    let quizPresidents = []; // Will hold the filtered list of presidents for the quiz

    function startQuiz() {
        currentQuestionIndex = 0;
        questionType = getRandomQuestionType();
        quizPresidents = getSelectedPresidents(); // Get presidents in the selected range
        
        if (quizPresidents.length === 0) {
            quizContainer.innerHTML = '<p>Please select a valid range of presidents.</p>';
            return;
        }
        
        showQuestion();
        startQuizButton.style.display = "none";
    }

    function getRandomQuestionType() {
        const types = ['name', 'number', 'party'];
        return types[Math.floor(Math.random() * types.length)];
    }

    function showQuestion() {
        if (currentQuestionIndex < quizPresidents.length) {
            const president = quizPresidents[currentQuestionIndex];
            let questionPrompt = '';
            let placeholderText = '';

            switch (questionType) {
                case 'name':
                    questionPrompt = `Who was the ${president.number}${getOrdinal(president.number)} president (${president.party})?`;
                    placeholderText = 'Enter president name';
                    break;
                case 'number':
                    questionPrompt = `What number president was ${president.name} (${president.party})?`;
                    placeholderText = 'Enter president number';
                    break;
                case 'party':
                    questionPrompt = `What political party was ${president.name}, the ${president.number}${getOrdinal(president.number)} president from?`;
                    placeholderText = 'Enter political party';
                    break;
            }

            quizContainer.innerHTML = `
                <p>${questionPrompt}</p>
                <input type="text" id="answer" placeholder="${placeholderText}">
                <button onclick="checkAnswer()">Submit</button>
                <div class="quiz-progress">Question ${currentQuestionIndex + 1} of ${quizPresidents.length}</div>
            `;

            // Make checkAnswer accessible from the global scope
            window.checkAnswer = function() {
                checkAnswer();
            };
        } else {
            quizContainer.innerHTML = `
                <p>Congratulations! You've completed the quiz.</p>
                <p>You've successfully memorized the presidents from ${quizPresidents[0].number} to ${quizPresidents[quizPresidents.length - 1].number}!</p>
            `;
            startQuizButton.style.display = "block";
            startQuizButton.textContent = "Restart Quiz";
        }
    }

    function getOrdinal(n) {
        const s = ['th', 'st', 'nd', 'rd'];
        const v = n % 100;
        if (v >= 11 && v <= 13) {
            return s[0]; // "th" for 11, 12, 13
        }
        return s[(n % 10)] || s[0];
    }

    function checkAnswer() {
        const answerInput = document.getElementById("answer").value.trim();
        const president = quizPresidents[currentQuestionIndex];
        let isCorrect = false;
        let correctAnswer = '';

        switch (questionType) {
            case 'name':
                isCorrect = answerInput.toLowerCase() === president.name.toLowerCase();
                correctAnswer = president.name;
                break;
            case 'number':
                isCorrect = Number(answerInput) === president.number;
                correctAnswer = president.number.toString();
                break;
            case 'party':
                isCorrect = answerInput.toLowerCase() === president.party.toLowerCase();
                correctAnswer = president.party;
                break;
        }

        if (isCorrect) {
            // Create feedback element
            const feedback = document.createElement('div');
            feedback.className = 'feedback correct';
            feedback.innerHTML = `
                <h3>Correct!</h3>
                <p>${president.name} was the ${president.number}${getOrdinal(president.number)} president from the ${president.party} party.</p>
            `;
            quizContainer.appendChild(feedback);
            
            // Move to next question after a delay
            setTimeout(() => {
                currentQuestionIndex++;
                questionType = getRandomQuestionType();
                showQuestion();
            }, 2000);
        } else {
            // Create feedback element for incorrect answer
            const feedback = document.createElement('div');
            feedback.className = 'feedback incorrect';
            feedback.innerHTML = `
                <h3>Incorrect</h3>
                <p>The correct answer was: ${correctAnswer}</p>
                <p>${president.name} was the ${president.number}${getOrdinal(president.number)} president from the ${president.party} party.</p>
            `;
            quizContainer.appendChild(feedback);
            
            // Move to next question after a delay
            setTimeout(() => {
                currentQuestionIndex++;
                questionType = getRandomQuestionType();
                showQuestion();
            }, 3000);
        }
    }

    startQuizButton.addEventListener("click", startQuiz);
});
