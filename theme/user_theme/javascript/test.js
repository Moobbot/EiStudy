if (name == "re_password") {
  let input_password = input
    .parents(".register-form")
    .find('input[name="password"]');
  let val_password = input
    .parents(".register-form")
    .find('input[name="password"]')
    .val();
  if (val.length === 0) {
    check_number = fail;
    if (!input.parent().hasClass("form-warning"))
      input.parent().addClass("form-warning");
    if (input.parent().find(".error-mes").length) {
    }
    input
      .parent()
      .append(
        '<span class="error-mes">Vui lòng nhập xác nhận mật khẩu!</span>'
      );
    // return false;
  }
  // Validate Password/RePassword
  else if (
    val != input.parents(".register-form").find('input[name="password"]').val()
  ) {
    check_number = fail;
    if (!input.parent().hasClass("form-warning"))
      input.parent().addClass("form-warning");
    if (input.parent().find(".error-mes").length) {
    }
    input
      .parent()
      .append('<span class="error-mes">Mật khẩu xác nhận không giống!</span>');
    // return false;
  }
}
