import {
  phoneformat,
  emailformat,
  passwordformat,
  rePassword,
  fullnameFormat,
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
 * Kiểm tra input
 * @param {number} input - Thẻ input
 * @param {string} type - Input type
 * @param {string} name - Input name
 * @param {string} val - Input value
 * @returns {boolean} - Giá trị boolean trả về
 */
export function test_input(input, type, name, val) {
  // let count_err = "";
  let count_err = fail;
  let mess_warning;
  // if (input.parent().hasClass('form-warning')) {
  input.parent().removeClass("form-warning");
  input.parent().find(".error-mes").remove();
  // }
  switch (type) {
    case "email":
      // code block
      mess_warning = emailformat(val);
      if (mess_warning.length != 0) {
        // count_err += type + "<>";
        count_err = fail;
        if (!input.parent().hasClass("form-warning"))
          input.parent().addClass("form-warning");
        input
          .parent()
          .append('<span class="error-mes">' + mess_warning + "</span>");
      }
      break;
    //8-20 kí tự
    case "tel":
      mess_warning = phoneformat(val);
      if (mess_warning.length != 0) {
        // count_err += type + "<>";
        count_err = fail;
        if (!input.parent().hasClass("form-warning"))
          input.parent().addClass("form-warning");
        input
          .parent()
          .append('<span class="error-mes">' + mess_warning + "</span>");
      }
      break;
    case "password":
      // code block
      mess_warning = passwordformat(val);
      if (name == "password") {
        if (mess_warning.length != 0) {
          // count_err += type + "<>";
          count_err = fail;
          if (!input.parent().hasClass("form-warning"))
            input.parent().addClass("form-warning");
          input
            .parent()
            .append('<span class="error-mes">' + mess_warning + "</span>");
        }
        let input_repassword = input
          .parents(".register-form")
          .find('input[name="re_password"]');
        if (input_repassword.length == 0) {
          let mess_warning2 = rePassword(input_repassword.val(), val);
          input_repassword.parent().find(".error-mes").remove();
          if (mess_warning2.length == 0) {
            // count_err += type + "<>";
            count_err = fail;
            input_repassword
              .parent()
              .append('<span class="error-mes">' + mess_warning2 + "</span>");
            if (!input_repassword.parent().hasClass("form-warning")) {
              input_repassword.parent().addClass("form-warning");
            }
          } else {
            input_repassword.parent().removeClass("form-warning");
          }
        }
      }
      if (name == "re_password") {
        let val_password = input
          .parents(".register-form")
          .find('input[name="password"]')
          .val();
        mess_warning = rePassword(val_password, val);
        if ((name = "password")) {
          if (mess_warning.length != 0) {
            // count_err += type + "<>";
            count_err = fail;
            if (!input.parent().hasClass("form-warning"))
              input.parent().addClass("form-warning");
            input
              .parent()
              .append('<span class="error-mes">' + mess_warning + "</span>");
          }
        }
      }
      break;
    case "text":
      if (name == "fullname") {
        mess_warning = fullnameFormat(val);
        if (mess_warning.length != 0) {
          // count_err += type + "<>";
          count_err = fail;
          if (!input.parent().hasClass("form-warning"))
            input.parent().addClass("form-warning");
          input
            .parent()
            .append('<span class="error-mes">' + mess_warning + "</span>");
        }
      }
      break;
    // default:
    // code block
  }
  console.log("count_err = " + count_err);

  return count_err == 0 ? fail : success;
}
// Check form submit
export function validateForm(e, id_form) {
  e.preventDefault(); // chặn hoạt động mặc định của form
  // xử lý form
  let check_number = fail;
  console.clear();
  $(id_form)
    .find("input")
    .each(function () {
      var input = $(this);
      let type = input.attr("type");
      let name = input.attr("name");
      let val = input.val();
      if (test_input(input, type, name, val) == success) {
        check_number = success;
      }
      // console.log(name + "----" + val + "----\ncheck_number = " + check_number);
      // console.log("<=============>");
      $(input).keyup(function (e) {
        val = input.val();
        console.clear();
        if (test_input(input, type, name, val) == success) {
          check_number = success;
        }
        // console.log(
        //   name + "----" + val + "----\ncheck_number = " + check_number
        // );
        // console.log("<=============>");
      });
    });
  if (check_number == success) {
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
  let check_number = fail;
  console.clear();
  $(id_form)
    .find("input")
    .each(function () {
      let input = $(this);
      let type = input.attr("type");
      let name = input.attr("name");
      let val = input.val();
      if (test_input(input, type, name, val) == success) {
        check_number = success;
      }
      console.log(name + "----" + val + "----");
      console.log("check_number = " + check_number);
      console.log("<=============>");
      $(input).keyup(function (e) {
        val = input.val();
        console.clear();
        // check_number = test_input(input, type, name, input.val()) == success ? success : fail;
        if (test_input(input, type, name, val) == success) {
          check_number = success;
        }
        console.log(name + "----" + val + "----");
        console.log("check_number = " + check_number);
        console.log("<=============>");
      });
    });
  // console.log(check_number);

  if (check_number == success) {
    let acc = $(id_form).find('input[id="formAccount"]');
    let acc_val = acc.val();
    let pass = $(id_form).find('input[id="formPassword"]');
    let pass_val = pass.val();
    // console.log("acc = " + acc_val);
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
