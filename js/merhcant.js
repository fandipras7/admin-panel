document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById("table-body");
    const form = document.getElementById('create-merchant');
    const menu = document.querySelectorAll(".menu a");
    const btnCreateMerchant = document.querySelector(".create-merchant")
    const modalCreateMerchant = document.querySelector(".modal")
    const modalWrapper = document.querySelector(".wrapper");
    const btnCloseModal = document.querySelector(".close-modal")
    const selectMerchantGroup = document.querySelector(".select-merchant-group")
    const groupOptionsContainer = document.querySelector(".group-options")
    const iconArrow = document.querySelector(".select-merchant-group .icon")
    const inputMerchantGroup = document.getElementById("merchant-group")
    const titleModal = document.querySelector(".title-modal");
    const textCreateMerchant = document.querySelector('.create-merchant-btn')
    const logoutBtn = document.querySelector(".logout-menu");
    const snackbar = document.querySelector(".snackbar");

    const exampleData = [
        { groupName: 'Group A', id: 1, name: "shopee", trxVol: 8 },
        { groupName: 'Group B', id: 2, name: "gopay", trxVol: 8 },
        { groupName: 'Group C', id: 3, name: "akulaku", trxVol: 8 },
        { groupName: 'Group D', id: 4, name: "easy", trxVol: 8 },
    ];

    localStorage.setItem('merchants', JSON.stringify(exampleData));

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

    const setTextModal = () => {
        const mode = localStorage.getItem("createMode").trim();
        if(mode === "update") {
            titleModal.textContent = "Update Merchant";
            textCreateMerchant.textContent = "Update"
        } else {
            titleModal.textContent = "Create Merchant";
            textCreateMerchant.textContent = "Create"
        }
    }

    const initializeTable = () => {
        tableBody.innerHTML = ''
        const merchants = JSON.parse(localStorage.getItem('merchants')) || [];

        if (merchants.length > 0) {
            merchants.forEach((item, index) => {
                const row = document.createElement('tr');
                const numberCell = document.createElement('td');
                const nameGroupCell = document.createElement('td');
                const nameCell = document.createElement('td');
                const trxVolumeCell = document.createElement('td');
                const actionCell = document.createElement('td');
                const updateButton = document.createElement('button');
                const deleteButton = document.createElement('button');

                actionCell.classList = "action-cell"
                updateButton.classList = "update-btn"
                deleteButton.classList = "delete-btn"
                numberCell.classList = "merchant-item"
                nameCell.classList = "merchant-item"
                nameGroupCell.classList = "merchant-item"
                trxVolumeCell.classList = "merchant-item"

                numberCell.textContent = index + 1;
                nameCell.textContent = item.name;
                nameGroupCell.textContent = item.groupName;
                trxVolumeCell.textContent = item.trxVol;
                updateButton.textContent = 'Update';
                deleteButton.textContent = 'Delete';

                row.appendChild(numberCell);
                row.appendChild(nameGroupCell);
                row.appendChild(nameCell);
                row.appendChild(trxVolumeCell);
                actionCell.appendChild(updateButton);
                actionCell.appendChild(deleteButton);
                row.appendChild(actionCell);
                tableBody.appendChild(row);

                // Add event listener for delete button
                deleteButton.addEventListener('click', () => {
                    merchants.splice(index, 1); // Remove item from array
                    localStorage.setItem('merchants', JSON.stringify(merchants));
                    initializeTable();
                });

                // Add event listener for update button
                updateButton.addEventListener('click', () => {
                    localStorage.setItem("createMode", "update")
                    setTextModal()
                    document.getElementById("merchant-name").value = item.name;
                    document.getElementById("merchant-id").value = item.id;
                    document.getElementById("merchant-group").value = item.groupName;
                    document.getElementById("merchant-max").value = item.trxVol;
                    modalCreateMerchant.classList.add("show")
                    modalWrapper.classList.add("show")
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

    const initializeOptions = () => {
        groupOptionsContainer.innerHTML = "";
        exampleData.forEach(item => {
            const list = document.createElement("li");
            list.textContent = item.groupName;
            const itemSelected = JSON.parse(localStorage.getItem("selectedOption")) || ""
            if(itemSelected.groupName === item.groupName) list.classList.add('actived');
            groupOptionsContainer.appendChild(list);
            
            list.addEventListener("click", () => {
                inputMerchantGroup.value = item.groupName
                localStorage.setItem('selectedOption', JSON.stringify(item));
                initializeOptions();
                groupOptionsContainer.classList.remove('open');
                iconArrow.classList.remove("open");
            })
        })

    }

    menu.forEach(link => {
        link.addEventListener('click', (event) =>  handleClick(event, link));
    })

    btnCreateMerchant.addEventListener("click", () => {
        document.getElementById("merchant-name").value = "";
        document.getElementById("merchant-id").value = "";
        document.getElementById("merchant-group").value = "";
        document.getElementById("merchant-max").value = "";
        localStorage.setItem("createMode", "create");
        setTextModal();
        modalCreateMerchant.classList.add("show")
        modalWrapper.classList.add("show")
    })

    btnCloseModal.addEventListener("click", () => {
        modalCreateMerchant.classList.remove("show")
        modalWrapper.classList.remove("show")
    })

    selectMerchantGroup.addEventListener("click", () => {
        if (groupOptionsContainer.classList.contains('open')) {
            groupOptionsContainer.classList.remove('open');
            iconArrow.classList.remove("open");
        } else {
            groupOptionsContainer.classList.add('open');
            iconArrow.classList.add("open");
        }
    })

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const inputName = document.getElementById("merchant-name").value.trim();
        const id = document.getElementById("merchant-id").value.trim();
        const groupName = document.getElementById("merchant-group").value.trim();
        const maxTrx = document.getElementById("merchant-max").value.trim();

        const data = {
            name: inputName,
            id,
            groupName,
            trxVol:maxTrx,
        }
        const assignData = () => {
            let items = JSON.parse(localStorage.getItem('merchants')) || [];
            if(localStorage.getItem('createMode').trim() === "update"){
                items = items.map((item) => {
                    if(item.id == data.id) return data
                    else return item
                })
            }else {
                items.push(data)
            }
            return items
        }
        if(inputName && id && groupName && maxTrx){
            const merchants = assignData()
            localStorage.setItem('merchants', JSON.stringify(merchants));
            initializeTable();
            modalCreateMerchant.classList.remove("show")
            modalWrapper.classList.remove("show")
        } else {
            snackbar.classList.add("show");
            setTimeout(() => {
                snackbar.classList.remove("show");
            }, 2000)
        }
    })

    logoutBtn.addEventListener("click", () => {
        localStorage.clear();
    })


    initializeTable();
    initializeOptions();
    checkActiveMenu();
})