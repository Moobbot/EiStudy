import {
  phoneformat,
  emailformat,
  passwordformat,
  rePassword,
  fullnameFormat,
  textNull,
} from "./validate.js";
// console.log(phoneformat(4444));
// SaveAcc
export function saveAcc(id_form) {
  var user = {
    fullname: "",
    email: "",
    phone: "",
    password: "",
    re_password: "",
  };
  /*
  user = {
    fullname: 'Nguyễn Văn A',
    email: 'abc@gmail.com',
    phone: '0373456789',
    password: '1',
    re_password: '1'
  }
  */
  $(id_form)
    .find("input")
    .each(function () {
      var input = $(this); // This is the jquery object of the input, do what you will
      let name = input.attr("name");
      let val = input.val();
      Object.keys(user).forEach(function eachKey(key) {
        // console.log(key + '-' + user[key]); //key + value
        if (name == key) {
          user[key] = val;
        }
      });
    });
  //save data to localStorage
  localStorage.setItem("USER_INFO", JSON.stringify(user));
  return true;
}
/**
 * Thêm cảnh báo cho Thẻ input kiểm tra
 * @param {string} input - Thẻ input cần kiểm tra
 * @param {string} mess_warning - Tin cảnh báo.
 * @returns {boolean} - Giá trị boolean trả về
 * - false nếu có cảnh vào
 * - true nếu không có
 */
function add_warring(input, mess_warning) {
  input.parent().find(".error-mes").remove();
  if (mess_warning.length != 0) {
    if (!input.parent().hasClass("form-warning"))
      input.parent().addClass("form-warning");
    // input_repassword.parent().find(".error-mes").html(mess_warning2);
    input
      .parent()
      .append('<span class="error-mes">' + mess_warning + "</span>");
    return false;
  } else {
    input.parent().removeClass("form-warning");
    return true;
  }
}
/**
 * Kiểm tra các đầu vào của form
 * @param {string} id_form - Tên của form là id hoặc class
 * @param {string} input - Thẻ input cần kiểm tra
 * @param {string} name - Tên của đầu vào (Tên: 'fullname', 'email', 'password','re_password, ...).
 * @param {string} val - Giá trị đầu vào
 * @returns {boolean} - Giá trị boolean trả về
 */
export function test_input(id_form, input, name, val) {
  let mess_warning, mess_warning2;
  // input.parent().removeClass("form-warning");
  // input.parent().find(".error-mes").remove();
  switch (name) {
    case "email":
      // code block
      mess_warning = emailformat(val);
      return add_warring(input, mess_warning);
      break;
    //8-20 kí tự
    case "phoneNumber":
      mess_warning = phoneformat(val);
      return add_warring(input, mess_warning);
      break;

    case "password":
      // code block
      mess_warning = passwordformat(val);
      return add_warring(input, mess_warning);
      break;

    case "re_password":
      let input_password = input
        .parents(id_form)
        .find('input[name="password"]');
      mess_warning = rePassword(input_password.val(), val);
      return add_warring(input, mess_warning);
      break;
    case "fullname":
      mess_warning = fullnameFormat(val);
      return add_warring(input, mess_warning);
      break;
    // default:
    // code block
  }
  return true;
}
let number_err = 0;
// Check form submit
export function validateRegisterForm(e, id_form) {
  e.preventDefault(); // chặn hoạt động mặc định của form
  // xử lý form
  let checkForm = fail;
  console.clear();
  $(id_form)
    .find("input")
    .each(function () {
      let input = $(this);
      let type = input.attr("type");
      let name = input.attr("name");
      let val = input.val();
      number_err += test_input(id_form, input, name, val) == false ? 1 : 0;
      $(input).keyup(function (e) {
        val = input.val();
        console.clear();
        number_err = test_input(id_form, input, name, val) == false ? 1 : 0;
      });
    });
  checkForm = number_err != 0 ? fail : success;
  // console.log("checkForm = " + checkForm + "\n<=============>");
  if (checkForm == success) {
    $(id_form).find("input").removeClass("form-warning");
    if (saveAcc(id_form)) {
      alert("Tạo tài khoản thành công.");
      window.location.replace("login.html");
    } else alert("Có lỗi xảy ra. Vui lòng liên hệ tổng đài.");
  }
}

export function checkLogin(e, id_form) {
  e.preventDefault(); // chặn hoạt động mặc định của form
  // xử lý form
  let checkForm = fail;
  // console.clear();
  $(id_form)
    .find("input")
    .each(function () {
      let input = $(this);
      let type = input.attr("type");
      let name = input.attr("name");
      let val = input.val();
      checkForm = test_input(id_form, input, name, input.val()) == success ? success : fail;
      // console.log(name + "----" + val + "----");
      // console.log("checkForm = " + checkForm);
      // console.log("<=============>");
      $(input).keyup(function (e) {
        val = input.val();
        checkForm = test_input(id_form, input, name, input.val()) == success ? success : fail;
      });
    });

  if (checkForm == success) {
    let acc = $(id_form).find('input[id="formAccount"]');
    let acc_val = acc.val();
    let pass = $(id_form).find('input[id="formPassword"]');
    let pass_val = pass.val();

    //Get data from localStorage
    let data = JSON.parse(localStorage.getItem("USER_INFO"));
    if (acc_val == data["email"]) {
      if (pass_val == data["password"]) {
        //save data to localStorage
        sessionStorage.setItem("USER_INFO", JSON.stringify(data));
        window.location.replace("home.html");
      } else {
        pass.parent().addClass("form-warning");
        if (pass.parent().find(".error-mes").length)
          pass.parent().find(".error-mes").remove();
        pass
          .parent()
          .append('<span class="error-mes">Mật khẩu không chính xác!</span>');
      }
    } else {
      acc.parent().addClass("form-warning");
      if (acc.parent().find(".error-mes").length)
        acc.parent().find(".error-mes").remove();
      acc
        .parent()
        .append(
          '<span class="error-mes">Không tìm thấy tài khoản này!</span >'
        );
    }
  }
}
