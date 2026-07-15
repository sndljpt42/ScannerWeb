/**
 * ============================================================
 * SMART ATTENDANCE SYSTEM (SAS)
 * ============================================================
 * File : app.js
 * ------------------------------------------------------------
 * Fungsi :
 * Menghubungkan Scanner dengan API Attendance.
 *
 * Tugas :
 * - Menerima Token hasil scan.
 * - Mengirim Token ke API.
 * - Menampilkan hasil absensi.
 * ============================================================
 */

// ============================================================
// Session aktif.
//
// Sementara dibuat statis.
// Nanti akan diambil dari menu Setting.
// ============================================================
const CURRENT_SESSION = "OPENING";

// ============================================================
// Mencegah QR yang sama terkirim berkali-kali
// ketika kamera masih mengarah ke QR.
// ============================================================
let isProcessing = false;

/**
 * ============================================================
 * Dipanggil setiap QR berhasil dibaca.
 *
 * Parameter :
 * token = isi QR
 * ============================================================
 */
async function processQRCode(token) {

    // Jika masih memproses scan sebelumnya,
    // abaikan scan berikutnya.
    if (isProcessing) {
        return;
    }

    // Mengunci proses.
    isProcessing = true;

    try {

        console.log("QR :", token);

        // Mengirim ke Google Apps Script.
        const result = await sendAttendance(
            token
        );

        showResult(result);

        // ====================================================
        // TODO
        // Nanti kita tampilkan popup sukses/gagal.
        // ====================================================

    } catch (error) {

        console.error(error);

        alert("Gagal terhubung ke server.");

    }

    // Memberi jeda 2,5 detik
    // agar QR yang sama tidak terbaca terus.
    setTimeout(() => {

        isProcessing = false;

    }, 2500);

}

/**
 * ==========================================
 * Menampilkan hasil scan
 * ==========================================
 */
function showResult(result){

    const card=document.getElementById("resultCard");

    const icon=document.getElementById("resultIcon");

    const title=document.getElementById("resultTitle");

    const nama=document.getElementById("participantName");

    const info=document.getElementById("participantInfo");

    card.className="result-card";

    if(result.success){

        card.classList.add("success");

        icon.innerHTML="✅";

        title.innerHTML="ABSENSI BERHASIL";

        nama.innerHTML = result.data.peserta.nama.toUpperCase();

        info.innerHTML=

        `
        <b>Sesi</b><br>
        ${result.data.session.nama}

        <br><br>

        <b>Status</b><br>

        ${result.data.attendanceStatus}

        <br><br>

        <b>Jam Scan</b><br>
        ${result.data.scanTime}
        
        `;

        playSuccessSound();

    }

    else{

        card.classList.add("error");

        icon.innerHTML="❌";

        title.innerHTML="ABSENSI DITOLAK";

        nama.innerHTML="";

        info.innerHTML=result.message;

        playErrorSound();

    }

    card.classList.remove("hidden");

    setTimeout(()=>{

        card.classList.add("hidden");

    },2500);

}

/**
 * Bunyi sukses
 */
function playSuccessSound(){

    const audio = new Audio(
        "assets/audio/success.mp3"
    );

    audio.play();

}

/**
 * Bunyi gagal
 */
function playErrorSound(){

    const audio = new Audio(
        "assets/audio/error.mp3"
    );

    audio.play();

}