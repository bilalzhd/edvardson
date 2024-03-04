import Errors from "./Errors";
import Abbr from "./Abbr";

export default function InputField({
    handleOnChange,
    inputValue,
    name,
    type,
    label,
    errors,
    placeholder,
    required,
    containerClassNames,
    isShipping
}: any) {
    const inputId = `${name}-${isShipping ? 'shipping' : ''}`;
    return (
        <div className={containerClassNames}>
            <label className="leading-7 text-sm text-gray-700" htmlFor={inputId}>{label || ''}
                <Abbr required />
            </label>
            <input onChange={handleOnChange} value={inputValue} type={type} name={name} id={inputId} placeholder={placeholder} className="input_field" />
            <Errors errors={errors} fieldName={name} />
        </div>
    )
}
