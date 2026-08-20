let currentIndex = 0;
let currentList = [];

// Khởi chạy khi trang tải xong
document.addEventListener("DOMContentLoaded", () => {
  if (typeof VOCAB_DATA !== "undefined" && VOCAB_DATA.length > 0) {
    currentList = [...VOCAB_DATA];
    renderCard();
  } else {
    showEmptyState("Không tìm thấy dữ liệu từ vựng.");
  }
});

// Hiển thị nội dung thẻ hiện tại lên màn hình
function renderCard() {
  if (currentList.length === 0) {
    showEmptyState("Chưa có từ vựng cho bộ lọc này.");
    return;
  }

  const item = currentList[currentIndex];

  document.getElementById("card-tag").innerText = item.topic || "Academic Vocab";
  document.getElementById("card-band").innerText = `Target: Band ${item.band}`;
  document.getElementById("card-title").innerText = item.word;
  document.getElementById("card-type").innerText = item.type;
  document.getElementById("card-meaning").innerText = item.meaning;
  document.getElementById("card-collocation").innerText = item.collocation;
  document.getElementById("card-example").innerText = `"${item.example}"`;
  document.getElementById("card-counter").innerText = `${currentIndex + 1} / ${currentList.length}`;
}

// Chuyển thẻ Trước / Sau
function navigateCard(direction) {
  if (currentList.length <= 1) return;
  currentIndex = (currentIndex + direction + currentList.length) % currentList.length;
  renderCard();
}

// Lọc dữ liệu theo Band điểm
function setBandFilter(band) {
  // Cập nhật trạng thái active cho nút bấm
  const buttons = document.querySelectorAll(".band-btn");
  buttons.forEach(btn => {
    btn.className = "band-btn px-3 py-1.5 text-xs rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:border-indigo-500 font-medium";
  });

  const clickedBtn = event.target;
  clickedBtn.className = "band-btn px-3 py-1.5 text-xs rounded-lg border border-slate-700 bg-indigo-600 text-white font-medium";

  // Lọc mảng dữ liệu
  if (band === "all") {
    currentList = [...VOCAB_DATA];
  } else {
    currentList = VOCAB_DATA.filter(item => item.band === band);
  }

  currentIndex = 0;
  renderCard();
}

// Chuyển đổi giữa Module IELTS và Medical
function switchDomain(domain) {
  const ieltsSec = document.getElementById("ielts-section");
  const medSec = document.getElementById("med-section");
  const tabIelts = document.getElementById("tab-ielts");
  const tabMed = document.getElementById("tab-med");

  if (domain === "ielts") {
    ieltsSec.classList.remove("hidden");
    medSec.classList.add("hidden");
    tabIelts.className = "px-3.5 py-1.5 rounded-lg bg-indigo-600 text-white transition";
    tabMed.className = "px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-white transition flex items-center gap-1.5";
  } else {
    ieltsSec.classList.add("hidden");
    medSec.classList.remove("hidden");
    tabMed.className = "px-3.5 py-1.5 rounded-lg bg-cyan-600 text-white transition flex items-center gap-1.5";
    tabIelts.className = "px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-white transition";
  }
}

// Xử lý khi danh sách trống
function showEmptyState(msg) {
  document.getElementById("card-title").innerText = "Trống";
  document.getElementById("card-type").innerText = "-";
  document.getElementById("card-meaning").innerText = msg;
  document.getElementById("card-collocation").innerText = "-";
  document.getElementById("card-example").innerText = "-";
  document.getElementById("card-counter").innerText = "0 / 0";
}
