document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('productForm');
  const productList = document.getElementById('productList');
  const setupInitialButton = document.getElementById('setupInitial');

  function editProduct(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    if (products[index]) {
        const product = products[index];
        form.name.value = product.name;
        form.description.value = product.description;
        form.imageLink.value = product.imageLink;
        form.productCode.value = product.productCode;
        form.supplier.value = product.supplier;
        form.dataset.editIndex = index; 
    }
}

window.editProduct = editProduct;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const productData = {
        name: form.name.value,
        description: form.description.value,
        imageLink: form.imageLink.value,
        productCode: form.productCode.value,
        supplier: form.supplier.value,
    };

    if (form.dataset.editIndex) {
        updateProduct(productData, form.dataset.editIndex);
        delete form.dataset.editIndex; 
    } else {
        saveProduct(productData);
    }

    form.reset();
    displayProducts();
});

  setupInitialButton.addEventListener('click', () => {
      setInitialProducts();
  });

  function updateProduct(productData, index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products[index] = productData;
    localStorage.setItem('products', JSON.stringify(products));
}

  function setInitialProducts() {
      const initialProducts = [
          {
              name: "Карточка 1",
              description: "Описание 1",
              imageLink: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Eo_circle_red_number-1.svg/2048px-Eo_circle_red_number-1.svg.png",
              productCode: "1",
              supplier: "ssau"
          },
          {
              name: "Карточка 1",
              description: "Описание 2 ",
              imageLink: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Eo_circle_red_number-2.svg/512px-Eo_circle_red_number-2.svg.png",
              productCode: "2",
              supplier: "ssau"
          }
      ];
      localStorage.setItem('products', JSON.stringify(initialProducts));
      displayProducts();
  }

  function saveProduct(productData) {
      let products = JSON.parse(localStorage.getItem('products')) || [];
      products.push(productData);
      localStorage.setItem('products', JSON.stringify(products));
  }

  function displayProducts() {
      let products = JSON.parse(localStorage.getItem('products')) || [];
      productList.innerHTML = '';
      products.forEach((product, index) => {
          const card = document.createElement('div');
          card.className = 'product-card';
          card.innerHTML = `
              <p><strong>Имя:</strong> ${product.name}</p>
              <p><strong>Описание:</strong> ${product.description}</p>
              <img src="${product.imageLink}" alt="${product.name}">
              <p><strong>Код товара:</strong> ${product.productCode}</p>
              <p><strong>Поставщик:</strong> ${product.supplier}</p>
              <button onclick="deleteProduct(${index})">Удалить</button>
          `;
          const editButton = document.createElement('button');
          editButton.textContent = 'Редактировать';
          editButton.addEventListener('click', () => editProduct(index));
          card.appendChild(editButton);
          productList.appendChild(card);
      });
  }

  window.deleteProduct = (index) => {
      let products = JSON.parse(localStorage.getItem('products')) || [];
      products.splice(index, 1);
      localStorage.setItem('products', JSON.stringify(products));
      displayProducts();
  };
  displayProducts();
});