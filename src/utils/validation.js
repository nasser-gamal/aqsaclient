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
  if (formData.providerFees < 0) {
    error = 'ادخل رسوم المزود';
  }
  if (formData.providerRevenue < 0) {
    error = 'ادخل عائد المزود';
  }
  return error;
};

export const validateWithDraw = (formData) => {
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
  if (formData.providerPercentage < 0) {
    error = 'ادخل عائد المزود';
  }

  return error;
};

export const validateTransfer = (formData) => {
  let error;
  if (!formData.senderId) {
    error = 'اختر الحساب المحول منه';
  }
  if (!formData.recipientId) {
    error = 'ادخل  الحساب المحول إليه';
  }
  if (formData.senderId == formData.recipientId) {
    error = 'لا يمكن التحويل ل نفس الحساب';
  }
  if (!formData.amountTotal) {
    error = 'ادخل القيمة';
  }
  if (formData.providerPercentage < 0) {
    error = 'ادخل عائد المزود';
  }

  return error;
};

export const validateReport = (formData) => {
  let error;
  if (!formData.bankAccountId) {
    error = 'اختر الحساب';
  }
  if (!formData.startDate) {
    error = 'اختر تاريخ البداية';
  }
  if (!formData.endDate) {
    error = 'اختر تاريخ النهاية';
  }
  return error;
};

export const validateEmployReport = (formData) => {
  let error;
  if (!formData.userId) {
    error = 'اختر الموظف';
  }
  if (!formData.startDate) {
    error = 'اختر تاريخ البداية';
  }
  if (!formData.endDate) {
    error = 'اختر تاريخ النهاية';
  }
  return error;
};

export const validateFee = (formData) => {
  let error;
  if (!formData.amount) {
    error = 'ادخل القيمة';
  }
  if (isNaN(formData.amount)) {
    error = 'القيمة يجب أن تكون رقمًا';
  }
  return error;
};

export const validateApp = (formData) => {
  let error;
  if (!formData.name) {
    error = 'ادخل اسم التطبيق';
  }
  if (!formData.img) {
    error = 'اختر صورة التطبيق';
  }
  if (formData.isLink === true) {
    if (!formData.link) {
      error = 'ادخل رابط التطبيق';
    }
  } else {
    if (!formData.apk) {
      error = 'حمل التطبيق';
    }
  }
  return error;
};
