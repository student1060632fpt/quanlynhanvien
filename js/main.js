/*
  - Thêm nhân viên (co HienThi)
  - Xoá nhân viên
  - Sửa nhân viên (Cập nhật)
  - Tìm kiếm nhân viên
  - Validation
  - Local Storage
*/

// Tao lop doi tuong NhanVien
function NhanVien(_maNV, _tenNV, _email, _matKhau, _ngayLam, _chucVu) {
  this.maNV = _maNV;
  this.tenNV = _tenNV;
  this.email = _email;
  this.matKhau = _matKhau;
  this.ngayLam = _ngayLam;
  this.chucVu = _chucVu;
  this.luongCoBan = 400;

  this.tinhTongLuong = function () {
    if (this.chucVu === "Sếp") {
      return this.luongCoBan * 3;
    } else if (this.chucVu === "Trưởng phòng") {
      return this.luongCoBan * 1.5;
    } else if (this.chucVu === "Nhân viên") {
      return this.luongCoBan * 1;
    }
  }

  this.tongLuong = this.tinhTongLuong();
}

var mangNhanVien = [];

function ThemNhanVien() {
  // B1: Lay thong tin
  var maNV = document.getElementById("msnv").value;
  var tenNV = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var matKhau = document.getElementById("password").value;
  var ngayLam = document.getElementById("datepicker").value;
  var chucVu = document.getElementById("chucvu").value;

  // B2: Tao doi tuong
  var nhanVien = new NhanVien(maNV, tenNV, email, matKhau, ngayLam, chucVu);

  // B3: Push vao mang
  mangNhanVien.push(nhanVien);

  // B4: HienThi
  HienThi();
}

function HienThi() {
  var content = "";
  var tableDanhSach = document.getElementById("tableDanhSach");
  for (var i = 0; i < mangNhanVien.length; i++) {
    var nhanVien = mangNhanVien[i];
    content += `
      <tr>
        <td>${nhanVien.maNV}</td>
        <td>${nhanVien.tenNV}</td>
        <td>${nhanVien.email}</td>
        <td>${nhanVien.ngayLam}</td>
        <td>${nhanVien.chucVu}</td>
        <td>${nhanVien.tongLuong}</td>
        <td>
          <button class="btn btn-danger" 
            data-id="${nhanVien.maNV}"
            onclick="XoaNhanVien(event)">Xoá</button>
        </td>
      </tr>
    `
  }
  tableDanhSach.innerHTML = content;
}

// Local Storage
function LuuLS() {
  // B1: Chuyen kieu du lieu --> JSON string
  var jsonData = JSON.stringify(mangNhanVien);
  // B2: Luu vao LS
  localStorage.setItem("DSNV", jsonData);
}

function LayDuLieuLS() {
  // B1: Lay tu LS
  var jsonData = localStorage.getItem("DSNV");
  // B2: Chuyen ve kieu du lieu ban dau
  mangNhanVien = JSON.parse(jsonData);
  HienThi();
}

function TimViTri(maNVXoa) {
  for (var i = 0; i < mangNhanVien.length; i++) {
    if (mangNhanVien[i].maNV === maNVXoa) {
      return i;
    }
  }
  return -1;
}

function XoaNhanVien(e) {
  // B1: Lay duoc maNV can xoa
  var btnXoa = e.target;
  var maNVXoa = btnXoa.getAttribute("data-id");
  // B2: Tim vi tri can xoa
  var index = TimViTri(maNVXoa);
  // B3: splice(index, deleteCount)
  mangNhanVien.splice(index, 1);
  HienThi();
}

// Lang nghe su kien
var btnThemNV = document.getElementById("btnThemNV");
btnThemNV.addEventListener("click", ThemNhanVien);
// callback function

var btnLuuLS = document.getElementById("btnLuuLS");
btnLuuLS.addEventListener("click", LuuLS);

var btnLayLS = document.getElementById("btnLayLS");
btnLayLS.addEventListener("click", LayDuLieuLS);