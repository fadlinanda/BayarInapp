/**
 * ============================================
 * BAYARIN - Aplikasi Pembayaran Tagihan & TopUp
 * ============================================
 * NIM Genap - Fokus Mobile
 * Teknologi: Vanilla JavaScript ES6+
 * Data disimpan di LocalStorage
 */

// ========================================
// 1. DATA DUMMY (Hardcoded)
// ========================================

const billData = {
    // ====== LISTRIK (PLN) ======
    pln: {
        "123456789012": { 
            name: "Ahmad Ramadhan", 
            address: "Jl. Merdeka No.10, Jakarta", 
            amount: 245000, 
            fine: 0, 
            due: "2026-07-15" 
        },
        "987654321098": { 
            name: "Siti Nurhaliza", 
            address: "Jl. Sudirman No.45, Bandung", 
            amount: 312500, 
            fine: 5000, 
            due: "2026-07-20" 
        },
        "456789123456": { 
            name: "Budi Santoso", 
            address: "Jl. Gatot Subroto No.8, Surabaya", 
            amount: 187000, 
            fine: 0, 
            due: "2026-07-12" 
        },
        "111222333444": { 
            name: "Dewi Lestari", 
            address: "Jl. Pajajaran No.22, Bogor", 
            amount: 423000, 
            fine: 10000, 
            due: "2026-07-25" 
        },
        "555666777888": { 
            name: "Rina Wijaya", 
            address: "Jl. Asia Afrika No.99, Bandung", 
            amount: 159000, 
            fine: 0, 
            due: "2026-07-18" 
        }
    },
    
    // ====== PDAM ======
    pdam: {
        "112233445566": { 
            name: "Teguh Prakoso", 
            address: "Jl. Ciumbuleuit No.12, Bandung", 
            amount: 89000, 
            fine: 0, 
            due: "2026-07-10" 
        },
        "223344556677": { 
            name: "Lina Marlina", 
            address: "Jl. Dago No.77, Bandung", 
            amount: 124000, 
            fine: 2000, 
            due: "2026-07-22" 
        },
        "334455667788": { 
            name: "Agus Hermawan", 
            address: "Jl. Setiabudi No.5, Bandung", 
            amount: 67000, 
            fine: 0, 
            due: "2026-07-14" 
        }
    },
    
    // ====== INTERNET ======
    internet: {
        "998877665544": { 
            name: "Cahya Kurniawan", 
            address: "Jl. Diponegoro No.3, Semarang", 
            amount: 210000, 
            fine: 0, 
            due: "2026-07-19" 
        },
        "887766554433": { 
            name: "Dani Ramdani", 
            address: "Jl. Kartini No.21, Yogyakarta", 
            amount: 335000, 
            fine: 15000, 
            due: "2026-07-27" 
        },
        "776655443322": { 
            name: "Eva Susanti", 
            address: "Jl. Halimun No.9, Jakarta", 
            amount: 175000, 
            fine: 0, 
            due: "2026-07-11" 
        }
    },
    
    // ====== SEMINAR / EVENT ======
    seminar: {
        "SEM2026A01": { 
            name: "Workshop AI & Machine Learning", 
            address: "Gedung Serbaguna, Jakarta", 
            amount: 750000, 
            fine: 0, 
            due: "2026-08-01" 
        },
        "SEM2026B02": { 
            name: "Seminar Startup & Digital Bisnis", 
            address: "Convention Hall, Bandung", 
            amount: 450000, 
            fine: 0, 
            due: "2026-08-05" 
        }
    },
    
    // ====== SPP / CICILAN KULIAH ======
    spp: {
        "202310001234": [
            { id: 1, desc: "SPP Ganjil 2025/26 - Cicilan ke-1", amount: 2500000, status: "unpaid" },
            { id: 2, desc: "SPP Ganjil 2025/26 - Cicilan ke-2", amount: 2500000, status: "unpaid" },
            { id: 3, desc: "SPP Ganjil 2025/26 - Cicilan ke-3", amount: 2500000, status: "paid" },
            { id: 4, desc: "SPP Ganjil 2025/26 - Cicilan ke-4", amount: 2500000, status: "unpaid" },
            { id: 5, desc: "SPP Ganjil 2025/26 - Cicilan ke-5", amount: 2500000, status: "unpaid" },
            { id: 6, desc: "SPP Ganjil 2025/26 - Cicilan ke-6", amount: 2500000, status: "unpaid" }
        ],
        "202310002345": [
            { id: 1, desc: "SPP Genap 2025/26 - Cicilan ke-1", amount: 2750000, status: "unpaid" },
            { id: 2, desc: "SPP Genap 2025/26 - Cicilan ke-2", amount: 2750000, status: "paid" },
            { id: 3, desc: "SPP Genap 2025/26 - Cicilan ke-3", amount: 2750000, status: "unpaid" },
            { id: 4, desc: "SPP Genap 2025/26 - Cicilan ke-4", amount: 2750000, status: "unpaid" },
            { id: 5, desc: "SPP Genap 2025/26 - Cicilan ke-5", amount: 2750000, status: "unpaid" },
            { id: 6, desc: "SPP Genap 2025/26 - Cicilan ke-6", amount: 2750000, status: "unpaid" }
        ],
        "202310003456": [
            { id: 1, desc: "SPP Ganjil 2025/26 - Cicilan ke-1", amount: 3200000, status: "paid" },
            { id: 2, desc: "SPP Ganjil 2025/26 - Cicilan ke-2", amount: 3200000, status: "paid" },
            { id: 3, desc: "SPP Ganjil 2025/26 - Cicilan ke-3", amount: 3200000, status: "unpaid" },
            { id: 4, desc: "SPP Ganjil 2025/26 - Cicilan ke-4", amount: 3200000, status: "unpaid" }
        ]
    }
};

// ====== MAPPING PREFIX PROVIDER ======
const providerMap = {
    "081": "Telkomsel", "082": "Telkomsel", "083": "Telkomsel",
    "085": "Indosat", "086": "Indosat",
    "087": "XL", "088": "XL",
    "089": "Tri", "0899": "Tri",
    "0813": "Smartfren", "0819": "Smartfren",
    "0838": "Axis", "0839": "Axis"
};

// ========================================
// 2. STATE MANAGEMENT
// ========================================

// Ambil data dari localStorage atau gunakan array kosong
let transactions = JSON.parse(localStorage.getItem('bayarin_transactions')) || [];
let saldo = 1250000; // Saldo awal simulasi

// State untuk Pulsa
let selectedProvider = 'Telkomsel';
let selectedNominal = 10000;

// ========================================
// 3. DOM REFERENCES
// ========================================

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const toastContainer = $('#toastContainer');
const modal = $('#modalBayar');
const modalBody = $('#modalBody');
const modalClose = $('#modalClose');
const saldoDisplay = $('#saldoDisplay');

// ========================================
// 4. UTILITY FUNCTIONS
// ========================================

/**
 * Menampilkan notifikasi toast
 * @param {string} msg - Pesan yang ditampilkan
 * @param {string} type - Tipe notifikasi: success, error, info, warning
 */
function showToast(msg, type = 'info') {
    const colors = {
        success: 'success',
        error: 'error',
        info: 'info',
        warning: 'warning'
    };
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };
    
    const toast = document.createElement('div');
    toast.className = `toast-item ${colors[type] || 'info'}`;
    toast.innerHTML = `<i class="fas ${icons[type] || 'fa-info-circle'}"></i> ${msg}`;
    
    toastContainer.appendChild(toast);
    
    // Auto remove setelah 3 detik
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Navigasi antar tab
 * @param {string} tab - Nama tab: dashboard, tagihan, spp, pulsa, riwayat
 */
function navigateTo(tab) {
    // Sembunyikan semua section
    $$('.tab-content').forEach(el => el.classList.add('hidden'));
    
    // Tampilkan section yang dipilih
    const target = document.getElementById(`section-${tab}`);
    if (target) target.classList.remove('hidden');
    
    // Update active tab
    $$('.tab-btn').forEach(btn => btn.classList.remove('tab-active'));
    const activeBtn = document.querySelector(`[data-tab="${tab}"]`);
    if (activeBtn) activeBtn.classList.add('tab-active');
    
    // Render riwayat jika tab riwayat
    if (tab === 'riwayat') renderRiwayat();
    
    // Update statistik di dashboard
    if (tab === 'dashboard') updateDashboardStats();
}

/**
 * Memformat angka ke format Rupiah
 */
function formatRupiah(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

/**
 * Generate nomor Virtual Account simulasi
 */
function generateVA() {
    return '88' + Math.floor(1000000000 + Math.random() * 9000000000);
}

/**
 * Generate kode pembayaran untuk Teller
 */
function generateKodeBayar() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// ========================================
// 5. CORE FUNCTIONS
// ========================================

/**
 * Menyimpan transaksi ke localStorage dan update saldo
 */
function saveTransaction(desc, amount) {
    const transaction = {
        id: Date.now(),
        desc: desc,
        amount: amount,
        date: new Date().toISOString(),
        timestamp: Date.now()
    };
    
    transactions.push(transaction);
    localStorage.setItem('bayarin_transactions', JSON.stringify(transactions));
    
    // Update saldo (simulasi)
    saldo -= amount;
    updateSaldoDisplay();
    
    showToast(`✅ Pembayaran ${desc} berhasil!`, 'success');
}

/**
 * Update tampilan saldo
 */
function updateSaldoDisplay() {
    if (saldoDisplay) {
        saldoDisplay.textContent = formatRupiah(saldo);
    }
    const saldoStat = $('#saldoStat');
    if (saldoStat) {
        saldoStat.textContent = formatRupiah(saldo);
    }
}

/**
 * Update statistik di dashboard
 */
function updateDashboardStats() {
    const totalTransaksi = $('#totalTransaksi');
    if (totalTransaksi) {
        totalTransaksi.textContent = transactions.length;
    }
}

/**
 * Proses pembayaran dengan simulasi loading dan bukti
 */
function processPayment(desc, amount, metode = 'VA') {
    // Tampilkan loading
    const loadingHtml = `
        <div class="flex flex-col items-center py-8">
            <div class="spinner"></div>
            <p class="mt-4 text-gray-600 font-medium">Memproses pembayaran...</p>
            <p class="text-sm text-gray-400 mt-1">Mohon tunggu sebentar</p>
        </div>
    `;
    showModalBayar(loadingHtml);
    
    // Simulasi proses pembayaran
    setTimeout(() => {
        // Generate detail metode pembayaran
        let metodeDetail = '';
        let metodeIcon = '';
        
        if (metode === 'VA') {
            const va = generateVA();
            metodeIcon = 'fa-qrcode';
            metodeDetail = `
                <div class="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <div class="flex items-center gap-2 text-blue-700 font-semibold">
                        <i class="fas fa-university"></i>
                        Virtual Account
                    </div>
                    <p class="text-2xl font-bold text-blue-800 mt-2 tracking-wider">${va}</p>
                    <p class="text-xs text-gray-500 mt-1">Transfer ke rekening virtual di BCA / BNI / Mandiri</p>
                    <div class="mt-2 flex gap-2 text-xs">
                        <span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">BCA</span>
                        <span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">BNI</span>
                        <span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Mandiri</span>
                    </div>
                </div>
            `;
        } else if (metode === 'QRIS') {
            metodeIcon = 'fa-qr-code';
            metodeDetail = `
                <div class="bg-green-50 p-4 rounded-xl border border-green-200">
                    <div class="flex items-center gap-2 text-green-700 font-semibold">
                        <i class="fas fa-qrcode"></i>
                        QRIS
                    </div>
                    <div class="flex justify-center my-3">
                        <div id="qrisContainer" class="bg-white p-3 rounded-xl shadow-inner"></div>
                    </div>
                    <p class="text-xs text-center text-gray-500">Scan QRIS dengan aplikasi e-wallet atau mobile banking</p>
                    <p class="text-xs text-center text-red-500 mt-1">⏱️ Batas waktu 5 menit</p>
                </div>
            `;
        } else {
            const kode = generateKodeBayar();
            metodeIcon = 'fa-store';
            metodeDetail = `
                <div class="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                    <div class="flex items-center gap-2 text-yellow-700 font-semibold">
                        <i class="fas fa-store"></i>
                        Bayar di Teller
                    </div>
                    <p class="text-2xl font-bold text-yellow-800 mt-2 tracking-wider">${kode}</p>
                    <p class="text-xs text-gray-500 mt-1">Tunjukkan kode ini di kasir</p>
                    <div class="mt-2 text-xs text-gray-600">
                        <p><i class="fas fa-map-pin mr-1"></i> Lokasi:</p>
                        <ul class="list-disc list-inside text-gray-500">
                            <li>Kantor Pusat, Jl. Merdeka No.1</li>
                            <li>Cabang Sudirman, Jl. Sudirman No.45</li>
                        </ul>
                    </div>
                </div>
            `;
        }
        
        // Buat bukti pembayaran
        const content = `
            <div id="print-area">
                <div class="text-center border-b pb-4 mb-4">
                    <div class="flex items-center justify-center gap-2 text-teal-600">
                        <i class="fas fa-wallet text-2xl"></i>
                        <h3 class="text-2xl font-bold">BayarIn</h3>
                    </div>
                    <p class="text-sm text-gray-500">Bukti Pembayaran</p>
                </div>
                
                <div class="space-y-4">
                    <div class="bg-gray-50 p-4 rounded-xl">
                        <p class="text-sm text-gray-500">Deskripsi</p>
                        <p class="font-semibold text-gray-800">${desc}</p>
                    </div>
                    
                    <div class="bg-gray-50 p-4 rounded-xl">
                        <p class="text-sm text-gray-500">Jumlah Pembayaran</p>
                        <p class="text-2xl font-bold text-teal-600">${formatRupiah(amount)}</p>
                    </div>
                    
                    ${metodeDetail}
                    
                    <div class="bg-gray-50 p-4 rounded-xl text-center">
                        <p class="text-sm text-gray-500">Waktu Transaksi</p>
                        <p class="text-sm font-medium">${new Date().toLocaleString('id-ID', { 
                            weekday: 'long', 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</p>
                    </div>
                    
                    <div class="flex gap-3 no-print mt-4">
                        <button onclick="window.print()" class="flex-1 bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition active:scale-95 flex items-center justify-center gap-2">
                            <i class="fas fa-print"></i>
                            Cetak Struk
                        </button>
                        <button onclick="document.getElementById('modalBayar').classList.add('hidden')" class="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition active:scale-95 flex items-center justify-center gap-2">
                            <i class="fas fa-times"></i>
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        modalBody.innerHTML = content;
        
        // Generate QRIS jika metode QRIS
        if (metode === 'QRIS') {
            setTimeout(() => {
                const container = document.getElementById('qrisContainer');
                if (container && typeof QRCode !== 'undefined') {
                    try {
                        new QRCode(container, {
                            text: 'BAYARIN-' + Date.now() + '-' + Math.random().toString(36).substring(7),
                            width: 140,
                            height: 140,
                            colorDark: '#0d9488',
                            colorLight: '#ffffff',
                            correctLevel: QRCode.CorrectLevel.H
                        });
                    } catch (e) {
                        container.innerHTML = '<p class="text-sm text-gray-500">[QR Code Simulasi]</p>';
                    }
                }
            }, 200);
        }
        
        // Simpan transaksi
        saveTransaction(desc, amount);
        
    }, 1500); // Simulasi loading 1.5 detik
}

/**
 * Tampilkan modal dengan konten
 */
function showModalBayar(content) {
    modalBody.innerHTML = content;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// ========================================
// 6. RENDER FUNCTIONS
// ========================================

/**
 * Render riwayat transaksi
 */
function renderRiwayat() {
    const container = $('#riwayatContainer');
    if (!container) return;
    
    if (!transactions || transactions.length === 0) {
        container.innerHTML = `
            <div class="text-center py-10">
                <i class="fas fa-inbox text-4xl text-gray-300 mb-3"></i>
                <p class="text-gray-400">Belum ada transaksi</p>
                <p class="text-xs text-gray-300 mt-1">Mulai bayar tagihan sekarang!</p>
            </div>
        `;
        return;
    }
    
    // Urutkan dari yang terbaru
    const sorted = [...transactions].reverse();
    
    let html = `
        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead>
                    <tr class="border-b-2 border-gray-200">
                        <th class="text-left py-2 px-2 text-gray-500 font-medium">#</th>
                        <th class="text-left py-2 px-2 text-gray-500 font-medium">Deskripsi</th>
                        <th class="text-right py-2 px-2 text-gray-500 font-medium">Jumlah</th>
                        <th class="text-center py-2 px-2 text-gray-500 font-medium">Status</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    sorted.forEach((t, index) => {
        html += `
            <tr class="border-b border-gray-100 hover:bg-gray-50 transition">
                <td class="py-2.5 px-2 text-gray-400 text-xs">${index + 1}</td>
                <td class="py-2.5 px-2 font-medium text-gray-700">${t.desc || 'Tagihan'}</td>
                <td class="py-2.5 px-2 text-right font-semibold text-teal-600">${formatRupiah(t.amount || 0)}</td>
                <td class="py-2.5 px-2 text-center">
                    <span class="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                        <i class="fas fa-check-circle mr-0.5"></i> Lunas
                    </span>
                </td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
        <div class="mt-3 text-xs text-gray-400 text-center border-t pt-3">
            Total ${transactions.length} transaksi
        </div>
    `;
    
    container.innerHTML = html;
}

// ========================================
// 7. EVENT HANDLERS
// ========================================

// ====== 7.1 Navigasi Tab ======
$$('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const tab = this.dataset.tab;
        navigateTo(tab);
    });
});

// ====== 7.2 Modal Close ======
modalClose.addEventListener('click', () => {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
});

// ====== 7.3 Cek Tagihan ======
$('#btnCekTagihan').addEventListener('click', function() {
    const kategori = $('#kategoriTagihan').value;
    const nomor = $('#inputNomorTagihan').value.trim();
    
    // Validasi
    if (!nomor) {
        showToast('Masukkan nomor pelanggan', 'error');
        return;
    }
    
    if (!/^[A-Za-z0-9]{8,12}$/.test(nomor)) {
        showToast('Nomor harus 8-12 karakter alfanumerik', 'error');
        return;
    }
    
    // Cari data
    const data = billData[kategori];
    if (!data) {
        showToast('Kategori tidak valid', 'error');
        return;
    }
    
    const tagihan = data[nomor];
    if (!tagihan) {
        showToast('❌ Nomor pelanggan tidak ditemukan', 'error');
        return;
    }
    
    // Tampilkan hasil
    const total = tagihan.amount + (tagihan.fine || 0);
    const categoryNames = {
        pln: '⚡ Listrik',
        pdam: '💧 PDAM',
        internet: '🌐 Internet',
        seminar: '🎓 Seminar'
    };
    
    const html = `
        <div class="bg-teal-50 p-4 rounded-xl mt-4 border-2 border-teal-200">
            <div class="flex items-start gap-3">
                <div class="bg-teal-100 p-2 rounded-lg">
                    <i class="fas fa-user text-teal-600"></i>
                </div>
                <div class="flex-1">
                    <p class="font-bold text-gray-800">${tagihan.name}</p>
                    <p class="text-sm text-gray-600">${tagihan.address}</p>
                    <p class="text-xs text-gray-500 mt-1">${categoryNames[kategori] || kategori}</p>
                </div>
            </div>
            
            <div class="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div class="bg-white p-2 rounded-lg">
                    <p class="text-gray-500">Tagihan</p>
                    <p class="font-semibold">${formatRupiah(tagihan.amount)}</p>
                </div>
                <div class="bg-white p-2 rounded-lg">
                    <p class="text-gray-500">Denda</p>
                    <p class="font-semibold ${tagihan.fine > 0 ? 'text-red-600' : 'text-gray-400'}">${tagihan.fine > 0 ? formatRupiah(tagihan.fine) : 'Tidak ada'}</p>
                </div>
            </div>
            
            <div class="mt-2 bg-teal-100 p-3 rounded-lg">
                <div class="flex justify-between items-center">
                    <span class="text-sm font-medium text-gray-700">Total yang harus dibayar</span>
                    <span class="text-xl font-bold text-teal-700">${formatRupiah(total)}</span>
                </div>
                <p class="text-xs text-gray-500 mt-1">Jatuh tempo: ${tagihan.due}</p>
            </div>
            
            <p class="text-sm font-medium text-gray-700 mt-4">Pilih Metode Pembayaran</p>
            <div class="grid grid-cols-3 gap-2 mt-2">
                <button data-metode="VA" class="metode-btn bg-blue-100 p-2.5 rounded-xl text-xs font-medium hover:bg-blue-200 transition active:scale-95 ring-2 ring-blue-500">🏦 VA</button>
                <button data-metode="QRIS" class="metode-btn bg-green-100 p-2.5 rounded-xl text-xs font-medium hover:bg-green-200 transition active:scale-95">📱 QRIS</button>
                <button data-metode="Teller" class="metode-btn bg-yellow-100 p-2.5 rounded-xl text-xs font-medium hover:bg-yellow-200 transition active:scale-95">🏪 Teller</button>
            </div>
            
            <button id="btnBayarTagihan" class="mt-4 w-full bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition active:scale-95 flex items-center justify-center gap-2">
                <i class="fas fa-credit-card"></i>
                Bayar Sekarang
            </button>
        </div>
    `;
    
    $('#hasilTagihan').innerHTML = html;
    
    // Handler untuk metode pembayaran
    let selectedMetode = 'VA';
    $$('.metode-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            $$('.metode-btn').forEach(b => b.classList.remove('ring-2', 'ring-blue-500', 'ring-green-500', 'ring-yellow-500'));
            selectedMetode = this.dataset.metode;
            if (selectedMetode === 'VA') this.classList.add('ring-2', 'ring-blue-500');
            else if (selectedMetode === 'QRIS') this.classList.add('ring-2', 'ring-green-500');
            else this.classList.add('ring-2', 'ring-yellow-500');
        });
    });
    // Default VA
    document.querySelector('.metode-btn[data-metode="VA"]')?.classList.add('ring-2', 'ring-blue-500');
    
    // Handler bayar
    document.getElementById('btnBayarTagihan').addEventListener('click', function() {
        const desc = `${categoryNames[kategori]} - ${tagihan.name}`;
        processPayment(desc, total, selectedMetode);
    });
});

// ====== 7.4 Cek SPP ======
$('#btnCekSpp').addEventListener('click', function() {
    const nim = $('#inputNim').value.trim();
    
    // Validasi NIM
    if (!/^\d{12}$/.test(nim)) {
        showToast('NIM harus 12 digit angka', 'error');
        return;
    }
    
    const data = billData.spp[nim];
    if (!data) {
        showToast('❌ NIM tidak terdaftar', 'error');
        return;
    }
    
    // Tampilkan daftar cicilan
    let html = `
        <div class="mt-4 bg-purple-50 p-4 rounded-xl border-2 border-purple-200">
            <div class="flex items-center gap-2 mb-3">
                <i class="fas fa-user-graduate text-purple-600"></i>
                <span class="font-semibold">NIM: ${nim}</span>
            </div>
            <p class="text-sm font-medium text-gray-700 mb-2">Pilih cicilan yang akan dibayar:</p>
            <div class="space-y-2 max-h-60 overflow-y-auto">
    `;
    
    data.forEach((item, idx) => {
        const isPaid = item.status === 'paid';
        const checked = !isPaid ? 'checked' : '';
        const disabled = isPaid ? 'disabled' : '';
        html += `
            <div class="flex items-center gap-2 bg-white p-2.5 rounded-lg ${isPaid ? 'opacity-60' : 'hover:bg-gray-50'}">
                <input type="checkbox" class="spp-check w-4 h-4 text-purple-600" data-idx="${idx}" ${checked} ${disabled}>
                <span class="flex-1 text-sm ${isPaid ? 'line-through text-gray-400' : 'text-gray-700'}">${item.desc}</span>
                <span class="text-sm font-medium ${isPaid ? 'text-gray-400' : 'text-gray-700'}">${formatRupiah(item.amount)}</span>
                <span class="text-xs ${isPaid ? 'text-green-600' : 'text-yellow-600'} font-medium">
                    ${isPaid ? '✅ Lunas' : '⏳ Belum'}
                </span>
            </div>
        `;
    });
    
    html += `
            </div>
            <div class="mt-3 bg-white p-3 rounded-lg flex justify-between items-center">
                <span class="text-sm font-medium text-gray-700">Total terpilih:</span>
                <span class="text-xl font-bold text-purple-700" id="sppTotal">Rp 0</span>
            </div>
            <button id="btnBayarSpp" class="mt-3 w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition active:scale-95 flex items-center justify-center gap-2">
                <i class="fas fa-credit-card"></i>
                Bayar Cicilan Terpilih
            </button>
        </div>
    `;
    
    $('#hasilSpp').innerHTML = html;
    
    // Fungsi update total
    function updateSppTotal() {
        let sum = 0;
        $$('.spp-check:checked:not(:disabled)').forEach(cb => {
            const idx = parseInt(cb.dataset.idx);
            if (!isNaN(idx) && data[idx]) {
                sum += data[idx].amount;
            }
        });
        const totalEl = document.getElementById('sppTotal');
        if (totalEl) totalEl.textContent = formatRupiah(sum);
        return sum;
    }
    
    // Event listener untuk checkbox
    $$('.spp-check').forEach(cb => {
        cb.addEventListener('change', updateSppTotal);
    });
    updateSppTotal();
    
    // Handler bayar SPP
    document.getElementById('btnBayarSpp').addEventListener('click', function() {
        const selected = [];
        let totalBayar = 0;
        
        $$('.spp-check:checked:not(:disabled)').forEach(cb => {
            const idx = parseInt(cb.dataset.idx);
            if (!isNaN(idx) && data[idx]) {
                selected.push(data[idx]);
                totalBayar += data[idx].amount;
            }
        });
        
        if (selected.length === 0) {
            showToast('Pilih minimal satu cicilan', 'warning');
            return;
        }
        
        const desc = `SPP (${selected.length} cicilan) - NIM ${nim}`;
        processPayment(desc, totalBayar, 'VA');
    });
});

// ====== 7.5 Pulsa ======

// Provider buttons
$$('.provider-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        $$('.provider-btn').forEach(b => b.classList.remove('ring-2', 'ring-teal-500', 'bg-teal-50'));
        this.classList.add('ring-2', 'ring-teal-500', 'bg-teal-50');
        selectedProvider = this.dataset.provider;
        document.getElementById('selectedProvider').value = selectedProvider;
    });
});

// Nominal buttons
$$('.nominal-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        $$('.nominal-btn').forEach(b => b.classList.remove('ring-2', 'ring-orange-400', 'bg-orange-50'));
        this.classList.add('ring-2', 'ring-orange-400', 'bg-orange-50');
        selectedNominal = parseInt(this.dataset.nominal);
        // Clear custom input
        const customInput = document.getElementById('customNominal');
        if (customInput) customInput.value = '';
    });
});

// Custom nominal input
document.getElementById('customNominal').addEventListener('input', function() {
    const val = parseInt(this.value);
    if (val > 0) {
        selectedNominal = val;
        $$('.nominal-btn').forEach(b => b.classList.remove('ring-2', 'ring-orange-400', 'bg-orange-50'));
    }
});

// Bayar Pulsa
$('#btnBayarPulsa').addEventListener('click', function() {
    const hp = document.getElementById('inputHp').value.trim();
    const provider = document.getElementById('selectedProvider').value;
    const nominal = selectedNominal;
    
    // Validasi HP
    if (!hp) {
        showToast('Masukkan nomor HP', 'error');
        return;
    }
    
    if (!/^08\d{8,11}$/.test(hp)) {
        showToast('Nomor HP harus 10-13 digit dan dimulai dengan 08', 'error');
        return;
    }
    
    // Validasi nominal
    if (!nominal || nominal <= 0) {
        showToast('Pilih nominal pulsa', 'warning');
        return;
    }
    
    // Auto detect provider dari prefix
    let detectedProvider = provider;
    for (const [prefix, prov] of Object.entries(providerMap)) {
        if (hp.startsWith(prefix)) {
            detectedProvider = prov;
            break;
        }
    }
    
    const desc = `Pulsa ${detectedProvider} - ${hp} (${formatRupiah(nominal)})`;
    processPayment(desc, nominal, 'VA');
});

// ====== 7.6 Hapus Riwayat ======
$('#btnHapusRiwayat').addEventListener('click', function() {
    if (transactions.length === 0) {
        showToast('Tidak ada riwayat untuk dihapus', 'info');
        return;
    }
    
    if (confirm('Yakin ingin menghapus semua riwayat transaksi?')) {
        transactions = [];
        localStorage.setItem('bayarin_transactions', JSON.stringify(transactions));
        renderRiwayat();
        updateDashboardStats();
        showToast('🗑️ Semua riwayat telah dihapus', 'info');
    }
});

// ========================================
// 8. INISIALISASI
// ========================================

/**
 * Inisialisasi aplikasi saat load
 */
function initApp() {
    // Update saldo
    updateSaldoDisplay();
    
    // Render riwayat
    renderRiwayat();
    
    // Update dashboard stats
    updateDashboardStats();
    
    // Set default tab (dashboard)
    navigateTo('dashboard');
    
    console.log('🚀 BayarIn siap digunakan!');
    console.log(`📊 ${transactions.length} transaksi tersimpan`);
}

// Jalankan inisialisasi
document.addEventListener('DOMContentLoaded', initApp);

// Export fungsi ke global scope untuk digunakan di HTML (onclick)
window.navigateTo = navigateTo;
window.formatRupiah = formatRupiah;
window.processPayment = processPayment;
window.showToast = showToast;
window.renderRiwayat = renderRiwayat;