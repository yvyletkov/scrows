const validate = (values) => {
    let errors = {};
    const require = "Это поле обязательное";
    const fields = [
        "name",
        "last_name",
        "middle_name",
        "email",
        "password",
        "passwordSecond",
        "date_of_birth",
        "entity_type",
        "gender",
        "phone",
        "entity_id",
        "entity_tin",
        "document_type",
        "entity_bank_account_data",
        "judical_type",
        "passport_data_created",
        "passport_data_number",
        "passport_data_code",
        "entity_name",
        "card_number",
        "participantEmail",
        'subject',
        "code"
    ];

    fields.forEach((field) => {
        if (!values[field]) return errors[field] = require
    })

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Неверный email";
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.participantEmail)) {
        errors.participantEmail = "Неверный email";
    }

    if (!/[^]{6,}/i.test(values.subject)) {
        errors.subject = "Название слишком короткое";
    }

    if (!/[^]{6,}/i.test(values.password)) {
        errors.password = "Пароль слишком короткий";
    }
    if (values.password !== values.passwordSecond) {
        errors.passwordSecond = "Пароли не совпадают";
    }

    return errors;
};

const warn = (values) => {
    const warnings = {};
    if (values.age < 18) {
        warnings.age = "Hmm, you seem a bit young...";
    }
    return warnings;
};

export {validate, warn};
