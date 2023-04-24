// Validate lowercase lettersvar
export const lowerCaseLetters = (value) => {
  return /[a-z]/g.test(value);
};
// Validate Uppercase lettersvar
export const upperCaseLetters = (value) => {
  return /[A-Z]/g.test(value);
};
// Validate numbers
export const numbers = (value) => {
  return /[0-9]/g.test(value);
};
/**
 * Validate text
 * @param {text} value - Dữ liệu đầu vào
 * @returns {boolean}
 * - Trả về true nếu độ dài đầu vào bằng 0
 * - Trả về false nếu độ dài đầu vào khác 0
 */
export const textNull = (value) => {
  return value.length == 0;
};
// Special characters
export const specialCharacters = (value) => {
  return /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value);
};
// Validate email
export const emailformat = (value) => {
  if (textNull(value)) return "Vui lòng nhập Email!";
  else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    return "Email không đúng đinh dạng!";
  }

  return "";
  // return true;
};

// Validate phone
export const phoneformat = (value) => {
  if (textNull(value)) return "Vui lòng nhập số điện thoại của bạn!";
  else if (value.length < 8 || value.length > 20) {
    return "Số điện thoại không đúng đinh dạng! Số điện thoại có từ 8 đến 20 ký tự.";
  }

  return "";
  // return true;
  // return /(0[3|5|7|8|9])+([0-9]{8})|(\+84)+([0-9]{9})\b/.test(value);
};

// Validate password
export const passwordformat = (value) => {
  if (textNull(value)) return "Vui lòng nhập mật khẩu!";
  else if (
    value.length < 8 ||
    !lowerCaseLetters(value) ||
    !upperCaseLetters(value) ||
    !numbers(value) ||
    !specialCharacters(value)
  ) {
    return "Mật khẩu không đúng đinh dạng! Mật khẩu có ít nhất 8 kí tự, một chữ, một số, một chữ viết hoa và một kí tự đặc biệt.";
  }

  return "";
  // return true;

  // return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
};

/**
 * Kiểm tra mật khẩu xác nhận
 * @param {number} password -
 * @param {string} repassword -
 * @returns {boolean} - Return text hoặc ""
 */
export const rePassword = (password, repassword) => {
  if (repassword.length == 0) return "Vui lòng nhập xác nhận mật khẩu!";
  else if (repassword != password) {
    return "Mật khẩu xác nhận không giống!";
  }

  return "";
  // return true;
};

// Validate email
export const fullnameFormat = (value) => {
  if (textNull(value)) return "Vui lòng nhập tên của bạn!";

  return "";
  // return true;
};
