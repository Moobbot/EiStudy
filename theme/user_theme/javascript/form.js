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

// Test input
export function test_input(input, type, name, val) {
  let check_number = success;
  let text_return;
  // if (input.parent().hasClass('form-warning')) {
  input.parent().removeClass("form-warning");
  input.parent().find(".error-mes").remove();
  // }
  // console.log(type + '--' + name);
  switch (type) {
    case "email":
      // code block
      text_return = emailformat(val);
      if (text_return.length != 0) {
        check_number = fail;
        if (!input.parent().hasClass("form-warning"))
          input.parent().addClass("form-warning");
        input
          .parent()
          .append('<span class="error-mes">' + text_return + "</span>");
      }
      break;
    //8-20 kí tự
    case "tel":
      text_return = phoneformat(val);
      if (text_return.length != 0) {
        check_number = fail;
        if (!input.parent().hasClass("form-warning"))
          input.parent().addClass("form-warning");
        input
          .parent()
          .append('<span class="error-mes">' + text_return + "</span>");
      }
      break;
    case "password":
      // code block
      text_return = passwordformat(val);
      if (name == "password") {
        if (text_return.length != 0) {
          check_number = fail;
          if (!input.parent().hasClass("form-warning"))
            input.parent().addClass("form-warning");
          input
            .parent()
            .append('<span class="error-mes">' + text_return + "</span>");
        }
        let input_repassword = input
          .parents(".register-form")
          .find('input[name="re_password"]');
        let text_return2 = rePassword(input_repassword.val(), val);
        input_repassword.parent().find(".error-mes").remove();
        if (text_return2 != 0) {
          check_number = fail;
          input_repassword
            .parent()
            .append('<span class="error-mes">' + text_return2 + "</span>");
          if (!input_repassword.parent().hasClass("form-warning")) {
            input_repassword.parent().addClass("form-warning");
          }
        } else {
          input_repassword.parent().removeClass("form-warning");
        }
      }
      if (name == "re_password") {
        let val_password = input
          .parents(".register-form")
          .find('input[name="password"]')
          .val();
        text_return = rePassword(val_password, val);
        if ((name = "password")) {
          if (text_return.length != 0) {
            check_number = fail;
            if (!input.parent().hasClass("form-warning"))
              input.parent().addClass("form-warning");
            input
              .parent()
              .append('<span class="error-mes">' + text_return + "</span>");
          }
        }
      }
      break;
    case "text":
      if (name == "fullname") {
        text_return = fullnameFormat(val);
        if (text_return.length != 0) {
          check_number = fail;
          if (!input.parent().hasClass("form-warning"))
            input.parent().addClass("form-warning");
          input
            .parent()
            .append('<span class="error-mes">' + text_return + "</span>");
        }
      }
      break;
    // default:
    // code block
  }
  return check_number;
}
// Check form submit
export function validateForm(e, id_form) {
  e.preventDefault(); // chặn hoạt động mặc định của form
  // xử lý form
  let check_number = fail;
  $(id_form)
    .find("input")
    .each(function () {
      var input = $(this);
      let type = input.attr("type");
      let name = input.attr("name");
      let val = input.val();
      check_number = test_input(input, type, name, val);
      $(input).keyup(function (e) {
        check_number = test_input(input, type, name, input.val());
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

export function checkAcc(e, id_form) {
  e.preventDefault(); // chặn hoạt động mặc định của form
  // xử lý form
  let acc = $(id_form).find('input[id="formAccount"]');
  let acc_val = acc.val();
  let pass = $(id_form).find('input[id="formPassword"]');
  let pass_val = pass.val();
  if (acc_val.length == 0) {
    acc.parent().addClass("form-warning");
    if (acc.parent().find(".error-mes").length)
      acc.parent().find(".error-mes").remove();
    acc
      .parent()
      .append('<span class="error-mes">Vui lòng nhập tài khoản!</span>');
  } else if (pass_val.length == 0) {
    pass.parent().addClass("form-warning");
    if (acc.parent().find(".error-mes").length)
      acc.parent().find(".error-mes").remove();
    pass
      .parent()
      .append('<span class="error-mes">Vui lòng nhập mật khẩu!</span>');
  } else {
    //Get data from localStorage
    let data = JSON.parse(localStorage.getItem("USER_INFO"));
    if (acc_val == data["phone"] || acc_val == data["email"]) {
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
// acc.parent().removeClass('form-warning');
//     acc.parent().find('.error-mes').remove();
