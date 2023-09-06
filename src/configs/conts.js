
export const customStylesError = {
    control: (base, state) => ({
        ...base,
        borderColor: "#ea5859",
        boxShadow: "0 0 0.2rem rgba(233, 105, 71, 0.25)",
    }),
};

export const customSearchStyles = {
    input: (styles) => ({ ...styles, height: '30px', display: 'flex', alignItems: "center", justifyContent: "center" }),
    indicatorSeparator: (base) => ({
        ...base,
        display: "none",
    }),
};

export const badgeStates = {
    danger: "light-danger",
    success: "light-success",
    primary: "light-primary",
    secondary: "light-secondary",
    warning: "light-warning",
};