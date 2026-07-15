/**
 * ============================================================
 * SMART ATTENDANCE SYSTEM (SAS)
 * ============================================================
 * File : api.js
 * ------------------------------------------------------------
 * Fungsi :
 * Menghubungkan Scanner Web dengan
 * Google Apps Script API Attendance.
 *
 * Tugas :
 * - Mengirim Token QR.
 * - Mengirim Session.
 * - Menerima hasil absensi.
 * ============================================================
 */

// ============================================================
// URL API Attendance Google Apps Script
// Ganti dengan URL Web App Anda.
// ============================================================
const API_URL =
    "https://script.google.com/macros/s/AKfycby0hQ_ppZhyjVg2_ZIm4L9lbaecG6iAkgy8L6c0lfLQJB-TN-nIUavgVOgyneRZu5SQ3Q/exec";

/**
 * ============================================================
 * Mengirim hasil scan QR ke API Attendance.
 *
 * Parameter :
 * token   = Token hasil scan QR
 * session = Nama sesi absensi
 *
 * Return :
 * Object JSON dari API
 * ============================================================
 */
// async function sendAttendance(token) {

//     // Data yang akan dikirim ke API
//     const payload = {
//         token: token
//     };

//     // Mengirim request POST
//     const response = await fetch(API_URL, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(payload)
//     });

//     // Mengubah response menjadi JSON
//     const result = await response.json();

//     // Mengembalikan hasil
//     return result;

// }


async function sendAttendance(token){

    console.log("API:", API_URL);

    const payload = {
        token: token
    };

    console.log(payload);

    const response = await fetch(API_URL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(payload)
    });

    console.log("STATUS:",response.status);

    const text = await response.text();

    console.log(text);

    return JSON.parse(text);

}