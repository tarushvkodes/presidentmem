document.addEventListener('DOMContentLoaded', function() {
    const rows = document.querySelectorAll('tbody tr');

    rows.forEach(row => {
        row.addEventListener('mouseover', function() {
            this.style.backgroundColor = '#e0e0e0';
        });

        row.addEventListener('mouseout', function() {
            this.style.backgroundColor = '';
        });

        row.addEventListener('click', function() {
            const number = this.cells[0].innerText;
            const name = this.cells[1].innerText;
            const party = this.cells[2].innerText;
            alert(`Number: ${number}\nName: ${name}\nParty: ${party}`);
        });
    });

    const filterSelect = document.createElement('select');
    filterSelect.innerHTML = `
        <option value="all">All</option>
        <option value="Republican">Republican</option>
        <option value="Democratic">Democratic</option>
    `;
    document.body.insertBefore(filterSelect, document.querySelector('table'));

    filterSelect.addEventListener('change', function() {
        const selectedParty = this.value;
        rows.forEach(row => {
            const party = row.cells[2].innerText;
            if (selectedParty === 'all' || party === selectedParty) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
});
