// LACAK PAKET
document.getElementById("formResi").addEventListener("submit", function (event) {
  event.preventDefault();
  const inputResi = document.getElementById("inputResi").value;
  const dataResi = {
    123456: "Paket sedang dalam perjalanan.",
    654321: "Paket telah sampai di tujuan.",
    789012: "Paket sedang diproses.",
  };
  const result = dataResi[inputResi] || "Nomor resi tidak ditemukan.";

  document.getElementById("hasilCari").innerText = result;
  $("#ModalHasilCari").modal("show");
});

// CEK ONGKIR
const dataKota = ["Jakarta", "Bandung", "Surabaya", "Medan", "Semarang"];
const kotaAsalSelect = document.getElementById("kotaAsal");
const kotaTujuanSelect = document.getElementById("kotaTujuan");

dataKota.forEach((city) => {
  const option = document.createElement("option");
  option.value = city;
  option.textContent = city;
  kotaAsalSelect.appendChild(option);
  kotaTujuanSelect.appendChild(option.cloneNode(true));
});

const daftarOngkir = {
  Jakarta: {
    Bandung: 15000,
    Surabaya: 30000,
    Medan: 50000,
    Semarang: 20000,
  },
  Bandung: {
    Jakarta: 15000,
    Surabaya: 25000,
    Medan: 60000,
    Semarang: 30000,
  },
  Surabaya: {
    Jakarta: 30000,
    Bandung: 25000,
    Medan: 40000,
    Semarang: 35000,
  },
  Medan: {
    Jakarta: 50000,
    Bandung: 60000,
    Surabaya: 40000,
    Semarang: 70000,
  },
  Semarang: {
    Jakarta: 20000,
    Bandung: 30000,
    Surabaya: 35000,
    Medan: 70000,
  },
};

document.getElementById("formKota").addEventListener("submit", function (event) {
  event.preventDefault();
  const kotaAsal = document.getElementById("kotaAsal").value;
  const kotaTujuan = document.getElementById("kotaTujuan").value;
  const hasilOngkir = daftarOngkir[kotaAsal][kotaTujuan];
  const resultMessage = `Ongkos kirim dari ${kotaAsal} ke ${kotaTujuan} adalah Rp ${hasilOngkir}`;
  document.getElementById("hasilCari").textContent = resultMessage;
  const resultModal = new bootstrap.Modal(document.getElementById("ModalHasilCari"));
  resultModal.show();
});

// KONTAK
const scriptURL = "https://script.google.com/macros/s/AKfycbwXAqFVWE5s_C32PEww6ScxeK0LpGmKpuFF7KfQwy5bGrSwFuITIo-QvY0IzYuJYA/exec";
const form = document.forms["submit-to-google-sheet"];
const btnKirim = document.querySelector(".btn-kirim");
const btnLoading = document.querySelector(".btn-loading");
const myAlert = document.querySelector(".alert");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  btnLoading.classList.toggle("d-none");
  btnKirim.classList.toggle("d-none");
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      btnLoading.classList.toggle("d-none");
      btnKirim.classList.toggle("d-none");
      myAlert.classList.toggle("d-none");
      form.reset();
      console.log("Success!", response);
    })
    .catch((error) => console.error("Error!", error.message));
});
