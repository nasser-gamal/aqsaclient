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
  if (formData.start < 0) {
    error = 'ادخل بداية الشريحة';
  }
  if (!formData.end) {
    error = 'ادخل نهاية الشريحة';
  }
  if (formData.percentage < 0) {
    error = 'ادخل النسبة';
  }

  return error;
};

export const validateCommission = (formData) => {
  let error;
  if (!formData.month) {
    error = 'اختر الشهر';
  }
  if (!formData.agentId) {
    error = 'اختر العميل';
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

export const validateBank = (formData) => {
  let error;
  if (!formData.bankName) {
    error = 'اختر الشهر';
  }
  return error;
};

export const validateBankAccount = (formData) => {
  let error;
  if (!formData.bankId) {
    error = 'اختر البنك';
  }
  if (!formData.accountName) {
    error = 'ادخل اسم الحساب';
  }
  if (!formData.bankNumber) {
    error = 'ادخل رقم الحساب';
  }
  if (!formData.balance) {
    error = 'ادخل القيمة';
  }
  return error;
};



export const validateDeposite = (formData) => {
  let error;
  if (!formData.bankAccountId) {
    error = 'اختر الحساب';
  }
  if (!formData.number) {
    error = 'ادخل  الرقم';
  }
  if (!formData.amount) {
    error = 'ادخل القيمة';
  }
  if (!formData.providerFees) {
    error = 'ادخل رسوم المزود';
  }
  if (!formData.providerRevenue) {
    error = 'ادخل عائد المزود';
  }
  return error;
};
