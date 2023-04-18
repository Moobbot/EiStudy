
// SaveAcc
function saveAcc(id_form) {
  var user = {
    fullname: '',
    email: '',
    phone: '',
    password: '',
    re_password: ''
  }
  $(id_form).find('input').each(function () {
    var input = $(this); // This is the jquery object of the input, do what you will
    let name = input.attr('name');
    let val = input.val();
    Object.keys(user)
      .forEach(function eachKey(key) {
        // console.log(key + '-' + user[key]); //key + value
        if (name == key) {
          user[key] = val;
        }
      });
  });
  //save data to localStorage
  localStorage.setItem('USER_INFO', JSON.stringify(user));
  return true;
}

// Check form submit
function validateForm(e, id_form) {
  e.preventDefault();// chặn hoạt động mặc định của form
  // xử lý form
  // Validate lowercase letters
  let lowerCaseLetters = /[a-z]/g;
  // Validate capital letters
  let upperCaseLetters = /[A-Z]/g;
  // Validate numbers
  var numbers = /[0-9]/g;
  // Validate phone
  var phoneformat = /(0[3|5|7|8|9])+([0-9]{8})|(\+84)+([0-9]{9})\b/;
  // Validate email
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let check_number = 0;
  $(id_form).find('input').each(function () {
    var input = $(this);
    let type = input.attr('type');
    let name = input.attr('name');
    let val = input.val();
    switch (type) {
      case 'email':
        // code block
        if (val.length == 0) {
          check_number = 1;
          input.parent().addClass('form-warning');
          input.val('');
          if (input.parent().find('.error-mes').length) {
            input.parent().find('.error-mes').remove();
          }
          input.parent().append('<span class="error-mes">Vui lòng nhập Email!</span>');
          // return false;
        }
        else if (!mailformat.test(val)) {
          check_number = 1;
          input.parent().addClass('form-warning');
          input.val('');
          if (input.parent().find('.error-mes').length) {
            input.parent().find('.error-mes').remove();
          }
          input.parent().append('<span class="error-mes">Email không đúng đinh dạnh!</span>');
          // return false;
        }
        break;
      case 'password':
        // code block
        if (name == 're_password') {
          if (val.length == 0) {
            check_number = 1;
            input.parent().addClass('form-warning');
            input.val('');
            if (input.parent().find('.error-mes').length) {
              input.parent().find('.error-mes').remove();
            }
            input.parent().append('<span class="error-mes">Vui lòng nhập xác nhận mật khẩu!</span>');
            // return false;
          }
          // Validate Password/RePassword
          else if (val == input.siblings('input[name="password"]').val()) {
            check_number = 1;
            input.parent().addClass('form-warning');
            input.val('');
            if (input.parent().find('.error-mes').length) {
              input.parent().find('.error-mes').remove();
            }
            input.parent().append('<span class="error-mes">Mật khẩu xác nhận không giống!</span>');
            // return false;
          }
        }
        else
          if (val.length == 0) {
            check_number = 1;
            input.parent().addClass('form-warning');
            input.val('');
            if (input.parent().find('.error-mes').length) {
              input.parent().find('.error-mes').remove();
            }
            input.parent().append('<span class="error-mes">Vui lòng nhập mật khẩu!</span>');
            // return false;
          }
        break;
      case 'text':
        if (name == 'fullname') {
          if (val.length == 0) {
            check_number = 1;
            input.parent().addClass('form-warning');
            input.val('');
            if (input.parent().find('.error-mes').length) {
              input.parent().find('.error-mes').remove();
            }
            input.parent().append('<span class="error-mes">Vui lòng nhập tên của bạn!</span>');
            // return false;
          }
        }
        break;
      case 'tel':
        if (val.length == 0) {
          check_number = 1;
          input.parent().addClass('form-warning');
          input.val('');
          if (input.parent().find('.error-mes').length) {
            input.parent().find('.error-mes').remove();
          }
          input.parent().append('<span class="error-mes">Vui lòng nhập số điện thoại của bạn!</span>');
          // return false;
        }
        else if (!phoneformat.test(val)) {
          check_number = 1;
          input.parent().addClass('form-warning');
          input.val('');
          if (input.parent().find('.error-mes').length) {
            input.parent().find('.error-mes').remove();
          }
          input.parent().append('<span class="error-mes">Số điện thoại không đúng đinh dạnh</span>');
          // return false;
        }
        break;
      // default:
      // code block
    }
  });
  if (check_number == 0) {
    $(id_form).find('input').removeClass('form-warning')
    if (saveAcc(id_form)) {
      alert('Tạo tài khoản thành công.');
      window.location.replace("login.html");
    } else {
      alert('Có lỗi xảy ra. Vui lòng liên hệ tổng đài.');
    }
  }
}

function checkAcc(e, id_form) {
  e.preventDefault();// chặn hoạt động mặc định của form
  // xử lý form
  let acc = $(id_form).find('input[id="formAccount"]');
  let acc_val = acc.val();
  let pass = $(id_form).find('input[id="formPassword"]');
  let pass_val = pass.val();
  if (acc_val.length == 0) {
    acc.parent().addClass('form-warning');
    if (acc.parent().find('.error-mes').length) {
      acc.parent().find('.error-mes').remove();
    }
    acc.parent().append('<span class="error-mes">Vui lòng nhập tài khoản!</span>');
  } else if (pass_val.length == 0) {
    pass.parent().addClass('form-warning');
    if (acc.parent().find('.error-mes').length) {
      acc.parent().find('.error-mes').remove();
    }
    pass.parent().append('<span class="error-mes">Vui lòng nhập mật khẩu!</span>');
  } else {
    //Get data from localStorage
    let data = JSON.parse(localStorage.getItem('USER_INFO'));
    if (acc_val == data['phone'] || acc_val == data['email']) {
      if (pass_val == data['password']) {
        //save data to localStorage
        sessionStorage.setItem('USER_INFO', JSON.stringify(data));
        window.location.replace("home.html");
      } else {
        pass.parent().addClass('form-warning');
        if (pass.parent().find('.error-mes').length) {
          pass.parent().find('.error-mes').remove();
        }
        pass.parent().append('<span class="error-mes">Mật khẩu không chính xác!</span>');
      }
    } else {
      acc.parent().addClass('form-warning');
      if (acc.parent().find('.error-mes').length) {
        acc.parent().find('.error-mes').remove();
      }
      acc.parent().append('<span class="error-mes">Không tìm thấy tài khoản này!</span >');
    }
  }
}
// acc.parent().removeClass('form-warning');
//     acc.parent().find('.error-mes').remove();
