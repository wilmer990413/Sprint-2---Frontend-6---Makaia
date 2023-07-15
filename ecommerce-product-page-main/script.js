desplegarMenuBar = ()=>{
    document.querySelector('.modal-navbar_background').style.display = 'block';
}

cerrarMenuBar = ()=>{
    document.querySelector('.modal-navbar_background').style.display = 'none';
}

desplegarModalGallery= ()=>{
    document.querySelector('.modal-gallery_background').style.display = 'flex';
}

cerrarModalGallery= ()=>{ 
    document.querySelector('.modal-gallery_background').style.display = 'none';
}

asignarFuncion = () => {
    if (window.innerWidth > 900) {
        document.querySelector('.gallery_image-container').onclick = desplegarModalGallery;
    } else {
        document.querySelector('.gallery_image-container').onclick = function() {};
        document.querySelector('.modal-gallery_background').style.display = 'none';
    }
}

asignarFuncion();

window.addEventListener('resize', function() {
    asignarFuncion();
});