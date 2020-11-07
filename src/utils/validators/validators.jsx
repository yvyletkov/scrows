const validate = (values) => {
  let errors = {};
  const require = "Это поле обязательное";
  const fields = [
    "name",
    "last_name",
    "middle_name",
    "email",
    "password",
    "passwordFirst",
    "passwordSecond",
    "date_of_birth",
    "entity_type",
    "gender",
  ];
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Неверный email";
  }
  if (!/[^]{6,}/i.test(values.passwordFirst)) {
    errors.passwordFirst = "Пароль слишком короткий";
  }
  if (values.passwordFirst !== values.passwordSecond) {
    errors.passwordSecond = "Пароли не совпадают";
  }
  fields.forEach((field) => {
    if (!values.hasOwnProperty(field)) {
      errors[field] = require;
    }
  });

  return errors;
};

const warn = (values) => {
  const warnings = {};
  if (values.age < 19) {
    warnings.age = "Hmm, you seem a bit young...";
  }
  return warnings;
};

export { validate, warn };
