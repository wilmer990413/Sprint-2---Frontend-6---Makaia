function alertErrorGeneral (e){
    Swal.fire({
        title: 'Error en Javascript',
        text:e.message,
        confirmButtonText: 'Refresh',
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload();
        }
    });
}
export {alertErrorGeneral};