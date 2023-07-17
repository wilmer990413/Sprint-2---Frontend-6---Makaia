function alertHTTPConextion (e){
    Swal.fire({
        text:e.message,
        confirmButtonText: 'Refresh',
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload();
        }
    });
}
export {alertHTTPConextion};