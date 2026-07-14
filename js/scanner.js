/* ==========================================
   SMART ATTENDANCE SYSTEM
   scanner.js
========================================== */

let scanner = null;

/**
 * Saat halaman selesai dimuat
 */
window.addEventListener("load", () => {

    startScanner();

});

/**
 * Menjalankan kamera
 */
function startScanner() {

    scanner = new Html5Qrcode("reader");

    scanner.start(

        {
            facingMode: "environment"
        },

        {

            fps: 10,

            qrbox: {

                width: 250,

                height: 250

            }

        },

        onScanSuccess,

        onScanFailure

    )

    .then(() => {

        console.log("Camera Started");

    })

    .catch(err => {

        console.error(err);

    });

}

/**
 * QR berhasil dibaca
 */
function onScanSuccess(decodedText) {

    console.clear();

    console.log("TOKEN:");

    console.log(decodedText);

}

/**
 * QR gagal dibaca
 */
function onScanFailure(error) {

    // sengaja dikosongkan
}