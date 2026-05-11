let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart(){

    const emptyCart = document.getElementById("empty-cart");

    const cartSection = document.getElementById("cart-section");

    const cartContainer = document.getElementById("cart-items");

    const totalText = document.getElementById("total-price");


    if(!cartContainer) return;


    if(cart.length === 0){

        if(emptyCart){
            emptyCart.style.display = "flex";
        }

        if(cartSection){
            cartSection.style.display = "none";
        }

    }

    else{

        if(emptyCart){
            emptyCart.style.display = "none";
        }

        if(cartSection){
            cartSection.style.display = "block";
        }

        let total = 0;

        cartContainer.innerHTML = "";

cart.forEach((item, index) => {

    total += item.price;

    const cartItem = document.createElement("div");

    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `

    <img src="${item.image}" class="cart-image">

    <div class="cart-details">

    <h3>${item.name}</h3>

    <p>₱ ${item.price}</p>

    <small>
        Drink: ${item.drink}
    </small>

    <br>

    <small>
        Flavor: ${item.flavor}
    </small>

</div>

    <button class="remove-btn">
        ✖
    </button>

`;

    const removeBtn = cartItem.querySelector(".remove-btn");

    removeBtn.addEventListener("click", () => {

        cart.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(cart));

        displayCart();

    });

    cartContainer.appendChild(cartItem);

});



        totalText.innerHTML = `Total: ₱ ${total}`;
        const totalItems =
    document.getElementById("total-items");

const grandTotal =
    document.getElementById("grand-total");

if(totalItems){
    totalItems.innerHTML = cart.length;
}

if(grandTotal){
    grandTotal.innerHTML = `₱${total + 40}`;
}
    }
}

displayCart();

function showToast(message){

    const toast = document.getElementById(
        "toast-notification"
    );

    toast.innerHTML = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);
}

function selectOptions(name, price, image){

    let size = "";

    if(name === "Small Fries"){
        size = "small";
    }

    else if(name === "Medium Fries"){
        size = "medium";
    }

    else if(name === "Jumbo Fries"){
        size = "jumbo";
    }

    else if(name === "Mega Fries"){
        size = "mega";
    }

    const drink = document.querySelector(
        `input[name="drink-${size}"]:checked`
    );

    const flavor = document.querySelector(
        `input[name="flavor-${size}"]:checked`
    );

    if(!drink || !flavor){

        alert("Please select drink and flavor.");

        return;
    }

    const product = {
        name: name,
        price: price,
        image: image,
        drink: drink.value,
        flavor: flavor.value
    };

    cart.push(product);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    showToast(name + " added to cart!");

    updateOrderSummary();
}
     
    function updateOrderSummary(){

    const summaryItems =
        document.getElementById("summary-items");

    const summaryTotal =
        document.getElementById("summary-total");

    if(!summaryItems || !summaryTotal) return;

    summaryItems.innerHTML = "";

    let total = 0;

  cart.forEach((item, index) => {

        total += item.price;

       summaryItems.innerHTML += `

<div class="summary-card">

    <button class="summary-remove"
    onclick="removeSummaryItem(${index})">
        ✖
    </button>

    <h4>${item.name}</h4>

    <p>${item.drink} • ${item.flavor}</p>

    <span>₱${item.price}</span>

</div>

`;
    });

    summaryTotal.innerHTML =
        `Total: ₱${total}`;
}



updateOrderSummary();

function removeSummaryItem(index){

    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateOrderSummary();

    displayCart();
}
function placeOrder(){

    const fullname =
        document.getElementById("fullname").value;

    const address =
        document.getElementById("address").value;

    const number =
        document.getElementById("number").value;

    if(fullname === "" || address === "" || number === ""){

        alert("Please complete checkout details.");

        return;
    }

    const customer = {
        fullname: fullname,
        address: address,
        number: number
    };

    localStorage.setItem(
        "customer",
        JSON.stringify(customer)
    );

    window.location.href = "success.html";
}
function loadCustomerDetails(){

    const customer = JSON.parse(localStorage.getItem("customer"));


    if(customer){

        const nameText = document.getElementById("customer-name");

        const addressText = document.getElementById("customer-address");

        const numberText = document.getElementById("customer-number");


        if(nameText){
            nameText.innerHTML = "👤 " + customer.fullname;
        }

        if(addressText){
            addressText.innerHTML = "📍 " + customer.address;
        }

        if(numberText){
            numberText.innerHTML = "📞 " + customer.number;
        }

    }
}

loadCustomerDetails();
function goToPage(page){

    document.body.classList.add("fade-out");

    setTimeout(() => {

        window.location.href = page;

    }, 500);
}
function goToPage(page){

    document.body.classList.add("fade-out");

    setTimeout(() => {

        window.location.href = page;

    }, 500);
}
function updateCheckoutTotal(){

    const totalItems =
        document.getElementById("total-items");

    const grandTotal =
        document.getElementById("grand-total");

    if(!totalItems || !grandTotal) return;

    let total = 0;

    cart.forEach(item => {
        total += item.price;
    });

    totalItems.innerHTML = cart.length;

    grandTotal.innerHTML = `₱${total + 40}`;
}

updateCheckoutTotal();
function loadSuccessSummary(){

    const summaryContainer =
        document.getElementById("success-summary");

    const totalText =
        document.getElementById("success-total");

    if(!summaryContainer || !totalText) return;

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    summaryContainer.innerHTML = "";

    cart.forEach((item) => {

        total += item.price;

        summaryContainer.innerHTML += `

        <div class="summary-item">

            <span>${item.name}</span>

            <span>₱${item.price}</span>

        </div>

        `;
    });

    totalText.innerHTML = `₱${total + 45}`;
}

loadSuccessSummary();

function finishOrder(){

    localStorage.removeItem("cart");

    goToPage('index.html');
}
