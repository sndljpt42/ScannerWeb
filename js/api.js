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
    "https://script.google.com/macros/s/AKfycbw5zwKqYr2CFWYmbGYDd1VJPrwrBURA2O1jSDDVV6ps8G4dzbPtCgVxd3psLYEt6SAn1A/exec";

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
async function sendAttendance(token) {

    // Data yang akan dikirim ke API
    const payload = {
        token: token
    };

    // Mengirim request POST
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    // Mengubah response menjadi JSON
    const result = await response.json();

    // Mengembalikan hasil
    return result;

}