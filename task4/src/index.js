document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('productForm');
    const productList = document.getElementById('productList');
    const setupInitialButton = document.getElementById('setupInitial');

    async function editProduct(index) {
        const products = await fetch('http://localhost:3000/products').then((response) => response.json());
        const product = products.find(product => product.id === index);
        if (product) {
            form.name.value = product.name;
            form.description.value = product.description;
            form.imageLink.value = product.imageLink;
            form.productCode.value = product.id;
            form.supplier.value = product.supplier;
            form.dataset.editIndex = index;
        }
    }

    window.editProduct = editProduct;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const productData = {
            id: form.productCode.value,
            name: form.name.value,
            description: form.description.value,
            imageLink: form.imageLink.value,
            supplier: form.supplier.value,
        };

        if (form.dataset.editIndex) {
            updateProduct(productData);
            delete form.dataset.editIndex;
        } else {
            saveProduct(productData);
        }

        form.reset();
        loadProducts();
    });

    setupInitialButton.addEventListener('click', () => {
        setInitialProducts();
    });


    async function loadProducts() {
        document.getElementsByClassName("loader")[0].classList.remove("invisible");
        try {
            let products = await fetch('http://localhost:3000/products').then((response) => response.json());
            products = products ? products : [];
            let skeletons = document.getElementsByClassName('skeleton');
            for (let skeleton of skeletons) {
                skeleton.classList.add('invisible');
            }
            productList.innerHTML = '';
            for (let product of products) {
                displayProduct(product);
            }
        } catch (err) {
            alert("Ошибка при получении карточек с сервера");
        }
        document.getElementsByClassName("loader")[0].classList.add("invisible");
    }


    async function loadCreatorInfo() {
        let creatorInfo = await fetch('http://localhost:3000/creatorInfo').then((response) => response.json());
        document.getElementById('creatorInfo').textContent = `${creatorInfo.name} ${creatorInfo.group}`;
    }


    async function updateProduct(productData) {
        await fetch(`http://localhost:3000/products/${productData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(productData)
        });
    }

    async function setInitialProducts() {
        const initialProducts = [
            {
                id: "1",
                name: "Карточка 1",
                description: "Описание 1",
                imageLink: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Eo_circle_red_number-1.svg/2048px-Eo_circle_red_number-1.svg.png",
                supplier: "ssau"
            },
            {
                id: "2",
                name: "Карточка 1",
                description: "Описание 2 ",
                imageLink: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Eo_circle_red_number-2.svg/512px-Eo_circle_red_number-2.svg.png",
                supplier: "ssau"
            }
        ];
        const skeletons = document.getElementsByClassName('skeleton');
        for (let skeleton of skeletons) {
            skeleton.classList.remove('invisible');
        }

        const products = await fetch('http://localhost:3000/products').then(res => res.json());
        for (let product of products) {
            await fetch(`http://localhost:3000/products/${product.id}`, {
                method: 'DELETE'
            });
        }

        for (let product of initialProducts) {
            await fetch('http://localhost:3000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(product)
            });
        }

        loadProducts();
    }

    async function saveProduct(productData) {
        productList.innerHTML = '';
        document.getElementsByClassName("loader")[0].classList.remove("invisible");
        await fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(productData)
        });
        displayProduct(productData);
        document.getElementsByClassName("loader")[0].classList.add("invisible");
    }

    function displayProduct(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
              <p><strong>Имя:</strong> ${product.name}</p>
              <p><strong>Описание:</strong> ${product.description}</p>
              <img src="${product.imageLink}" alt="${product.name}">
              <p><strong>Код товара:</strong> ${product.id}</p>
              <p><strong>Поставщик:</strong> ${product.supplier}</p>
              <button onclick="deleteProduct(${product.id})">Удалить</button>
          `;
        const editButton = document.createElement('button');
        editButton.textContent = 'Редактировать';
        editButton.addEventListener('click', () => editProduct(product.id));
        card.appendChild(editButton);
        productList.appendChild(card);
    }

    window.deleteProduct = (index) => {
        fetch(`http://localhost:3000/products/${index}`, {
            method: 'DELETE'
        }).then(() => {
            loadProducts();
        });
    };

    loadProducts();
    loadCreatorInfo();
});