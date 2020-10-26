const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Это поле обязательное";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Неверный email";
  }
  if (!values.password) {
    errors.password = "Это поле обязательное";
  }
  if (!values.passwordFirst) {
    errors.passwordFirst = "Это поле обязательное";
  } else if(values.passwordFirst.length < 6) {
    errors.passwordFirst = "Пароль слишком короткий"
  }
  if(!values.passwordSecond) {
    errors.passwordSecond = "Это поле обязательное";
  } else if (values.passwordFirst !== values.passwordSecond) {
    errors.passwordSecond = "Пароли не совпадают"
  }
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

