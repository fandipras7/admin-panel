document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById("table-body");
    const form = document.getElementById('create-group');
    const groupNameInput = document.getElementById('group-name');
    const menu = document.querySelectorAll(".menu a");
    const snackbar = document.querySelector(".snackbar");
    const snackbarText = document.querySelector(".snackbar h1");
    const exampleData = [
        { groupName: 'Group A' },
        { groupName: 'Group B' },
        { groupName: 'Group C' },
        { groupName: 'Group D' }
    ];

    localStorage.setItem('merchant-groups', JSON.stringify(exampleData));

    const showSnackbar = (message, type) => {
        snackbar.classList.remove('success', 'error');
        snackbar.classList.add(type);
        snackbarText.textContent = message
        snackbar.classList.add("show");
        setTimeout(() => {
            snackbar.classList.remove("show");
        }, 2000)
    }

    const handleClick = (event, link) => {
        event.preventDefault();
        const textContent = event.target.textContent.trim();
        localStorage.setItem('selectedMenu', textContent);
        const route = link.getAttribute('href');
        window.location.href = route;
    }

    const checkActiveMenu = () => {
        const selectedMenu = localStorage.getItem('selectedMenu');
        if (selectedMenu) {
            menu.forEach(link => {
                if (link.textContent.trim() === selectedMenu.trim()) {
                    link.style.backgroundColor = "#068FFF";
                    link.style.color = 'white';
                }
            });
        }
    }

    const initializeTable = () => {
        tableBody.innerHTML = ''
        const groups = JSON.parse(localStorage.getItem('merchant-groups')) || [];

        if (groups.length > 0) {
            groups.forEach((item, index) => {
                const row = document.createElement('tr');
                const numberCell = document.createElement('td');
                const nameCell = document.createElement('td');
                const actionCell = document.createElement('td');
                const updateButton = document.createElement('button');
                const deleteButton = document.createElement('button');

                actionCell.classList = "action-cell"
                updateButton.classList = "update-btn"
                deleteButton.classList = "delete-btn"
                numberCell.classList = "merchant-item"
                nameCell.classList = "merchant-item"

                numberCell.textContent = index + 1;
                nameCell.textContent = item.groupName;
                updateButton.textContent = 'Update';
                deleteButton.textContent = 'Delete';

                row.appendChild(numberCell);
                row.appendChild(nameCell);
                actionCell.appendChild(updateButton);
                actionCell.appendChild(deleteButton);
                row.appendChild(actionCell);
                tableBody.appendChild(row);

                // Add event listener for delete button
                deleteButton.addEventListener('click', () => {
                    groups.splice(index, 1); // Remove item from array
                    localStorage.setItem('merchant-groups', JSON.stringify(groups));
                    initializeTable();
                });

                // Add event listener for update button
                updateButton.addEventListener('click', () => {
                    const updatedName = prompt('Enter updated group name:', item.groupName);
                    if (updatedName !== null && updatedName.trim() !== '') {
                        item.groupName = updatedName.trim();
                        localStorage.setItem('merchant-groups', JSON.stringify(groups));
                        initializeTable();
                    }
                });
            });
        } else {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.colSpan = 2;
            cell.textContent = 'No data available';
            row.appendChild(cell);
            tableBody.appendChild(row);
        }
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const groupName = groupNameInput.value.trim();
        if (groupName) {
            const groups = JSON.parse(localStorage.getItem('merchant-groups')) || [];
            groups.push({ groupName });
            localStorage.setItem('merchant-groups', JSON.stringify(groups));
            groupNameInput.value = '';
            showSnackbar("Successfully created data", "success")
            initializeTable();
        } else {
            showSnackbar("Form must be completed!", "error")
        }
    })

    menu.forEach(link => {
        link.addEventListener('click', (event) =>  handleClick(event, link));
    })
    initializeTable();
    checkActiveMenu();
})