export const validateLogin = (formData) => {
  let phoneRegex = /^01/;
  let error;
  if (!formData.phoneNumber) {
    error = 'أدخل رقم الهاتف';
  } else if (
    formData.phoneNumber.length !== 11 ||
    !phoneRegex.test(formData.phoneNumber)
  ) {
    error = 'رقم هاتف غير صالح';
  }
  if (!formData.password) {
    error = 'أدخل الرقم السري';
  }
  return error;
};

export const validateUser = (formData) => {
  let phoneRegex = /^01/;
  const errors = [];

  if (!formData.accountName) {
    errors.push('ادخل اسم الحساب');
  }
  if (!formData.userName) {
    errors.push('ادخل اسم صاحب الحساب');
  }
  if (!formData.phoneNumber) {
    errors.push('ادخل رقم الهاتف');
  } else if (
    formData.phoneNumber.length !== 11 ||
    !phoneRegex.test(formData.phoneNumber)
  ) {
    errors.push(' رقم هاتف غير صالح');
  }
  if (!formData.address) {
    errors.push('ادخل  العنوان');
  }
  return errors[0];
};

export const validateAgent = (formData) => {
  let phoneRegex = /^01/;
  const errors = [];

  if (!formData.accountName) {
    errors.push('ادخل اسم الحساب');
  }
  if (!formData.userName) {
    errors.push('ادخل اسم صاحب الحساب');
  }
  if (!formData.accountNumber) {
    errors.push('ادخل رقم الحساب');
  }
  if (!formData.phoneNumber) {
    errors.push('ادخل رقم الهاتف');
  } else if (
    formData.phoneNumber.length !== 11 ||
    !phoneRegex.test(formData.phoneNumber)
  ) {
    errors.push(' رقم هاتف غير صالح');
  }
  if (!formData.nationalId) {
    errors.push('ادخل الرقم القومي ');
  }
  if (formData.nationalId.length !== 14) {
    errors.push('رقم قومي غير صالح');
  }

  return errors[0];
};

export const validateConfirmPassword = (password) => {
  let error;
  if (!password) {
    error = 'أدخل الرقم السري';
  }
  return error;
};

export const validateCategory = (formData) => {
  let error;
  if (!formData.name) {
    error = 'ادخل اسم الخدمة';
  }
  return error;
};

export const validateSegment = (formData) => {
  let error;
  if (!formData.title) {
    error = 'ادخل الشريحة';
  }
  if (!formData.serviceId) {
    error = 'اختر الخدمة';
  }
  if (!formData.start) {
    error = 'ادخل بداية الشريحة';
  }
  if (!formData.percentage) {
    error = 'ادخل النسبة';
  }

  return error;
};

export const validateCommission = (formData) => {
  let error;
  if (!formData.agentId) {
    error = 'اختر العميل';
  }
  if (!formData.serviceId) {
    error = 'اختر الخدمة';
  }
  if (!formData.amountTotal) {
    error = 'ادخل القيمة';
  }
  if (!formData.count) {
    error = 'ادخل عدد العمليات';
  }

  return error;
};

export const validatePassword = (password) => {
  let error;
  if (!password) {
    error = 'ادخل الرقم السري';
  }

  return error;
};

