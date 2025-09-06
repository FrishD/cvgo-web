document.addEventListener('DOMContentLoaded', function () {
    // Text rotator logic
    const texts = document.querySelectorAll('.text-rotator-item');
    if (texts.length > 0) {
        let currentIndex = 0;

        function showNextText() {
            texts[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % texts.length;
            texts[currentIndex].classList.add('active');
        }

        setInterval(showNextText, 5000); // Change text every 5 seconds
    }

    // Drag and drop logic
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');

    if (dropZone && fileInput) {
        dropZone.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                handleFile(this.files[0]);
            }
        });

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('drag-over');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFile(files[0]);
            }
        });

        function handleFile(file) {
            console.log('File dropped:', file.name);
            alert('File "' + file.name + '" selected. Upload functionality is not yet implemented.');
            // TODO: Add endpoint logic here
            // const formData = new FormData();
            // formData.append('file', file);
            // fetch('/your-endpoint-url', {
            //     method: 'POST',
            //     body: formData
            // }).then(response => response.json()).then(data => {
            //     console.log('Success:', data);
            // }).catch(error => {
            //     console.error('Error:', error);
            // });
        }
    }
});
