function printProductInCart(index, name, image, price, quantity, containerCart){
    containerCart.innerHTML += `
    <div id="${index+1}cp" class="cart-modal_details-container">
        <img class="image_product" src="${image}" alt="product ${index+1}">
        <div class="description_product_container">
            <p class="cart-modal_product">${name}</p>
            <p class="cart-modal_price">
                $${price} x ${quantity} 
                <span>$${parseInt(price)*parseInt(quantity)}</span>
            </p>
        </div>
        <img class="delete-botton-cart" src="./images/icon-delete.svg" alt="delete">
    </div>
    `;
}

function printProductInCheckout(index, name, image, price, quantity, containerCart){
    containerCart.innerHTML += `
    <div id="${index+1}cp" class="cart-modal_details-container">
        <img class="image_product" src="${image}" alt="product ${index+1}">
        <p class="cart-modal_product">${name}</p>
        <p class="cart-modal_price">
            $${price} x ${quantity} 
            <span>$${parseInt(price)*parseInt(quantity)}</span>
        </p>
    </div>
    <br>
    `;
}

export {printProductInCart,printProductInCheckout};