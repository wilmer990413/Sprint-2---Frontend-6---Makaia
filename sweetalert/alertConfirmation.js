export async function alertConfirmation(si,no){
    Swal.fire({
        title: '¿Esta seguro que quiere terminar de comprar?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        reverseButtons: true,
    }).then( async (result) => {
        if (result.isConfirmed) {
            await si();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            await no();
        }
    });
}

export async function alertConfirmationBuy(si,no){
    Swal.fire({
        title: '¿Esta seguro que quiere efectuar la compra?',
        text: 'Una vez efectuada la compra para cancelar el pedido comuniquese con soporte.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        reverseButtons: true,
    }).then( async (result) => {
        if (result.isConfirmed) {
            await si();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            await no();
        }
    });
}

export function alertNoCheckout (){
    Swal.fire({
        title: 'No tiene productos en el carrito',
        icon: 'info',
        confirmButtonText: 'Ok',
    }).then((result) => {
        if (result.isConfirmed) {

        }
    });
}
