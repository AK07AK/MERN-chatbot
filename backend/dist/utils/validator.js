import { body, validationResult } from "express-validator";
const validate = (validations) => {
    return async (request, response, next) => {
        for (let validation of validations) {
            const result = await validation.run(request);
            if (!result.isEmpty) {
                break;
            }
        }
        const errors = validationResult(request);
        if (errors.isEmpty()) {
            return next();
        }
        return response.status(422).json({ errors: errors.array() });
    };
};
const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("password").trim().isLength({ min: 6 }).notEmpty().withMessage("Password should contain 6 characters"),
];
const loginValidator = [
    body("email").notEmpty().withMessage("Email is required"),
    body("password").trim().isLength({ min: 6 }).notEmpty().withMessage("Password should contain 6 characters"),
];
export { signupValidator, validate, loginValidator };
//# sourceMappingURL=validator.js.map