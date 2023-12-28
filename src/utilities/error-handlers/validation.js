const validationErrorHandler = (error) => {
    if (error.code === 11000) {
        let errors = {};

        Object.keys(error.keyPattern).forEach((key)=>{
            const result = key.replace(/([A-Z])/g, ' $1');
            const parsedKey = result.charAt(0).toUpperCase() + result.slice(1);
            errors[key] = `${parsedKey} has to be unique`;
        })

        return errors;
    }

    if (error.name === "ValidationError") {
        let errors = {};

        Object.keys(error.errors).forEach((key) => {
            errors[key] = error.errors[key].message;
        });

        return errors;
    }

    return null;
}

export default validationErrorHandler;