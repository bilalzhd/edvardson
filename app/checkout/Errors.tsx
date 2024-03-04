export default function Errors({ errors, fieldName }: any) {

    return (
        errors && (errors.hasOwnProperty(fieldName)) ? (
            <div className="invalid-feedback d-block text-red-500">{errors[fieldName]}</div>
        ) : null
  )
}
