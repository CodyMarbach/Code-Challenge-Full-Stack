import { useState } from 'react';

const FormHelper = (initialFieldValues, validate) => {
    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target;
        const fieldValue = { [name]: value }
        setValues({
            ...values,
            [name]: value
        });
        validate(fieldValue);
    }

    const resetForm = () => {
        setValues({
            ...initialFieldValues
        });
        setErrors({});
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    }
};

export default FormHelper;
