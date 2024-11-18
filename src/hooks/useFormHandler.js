import { useState } from "react"


function UseFormHandler(props) {
    const formData = new FormData()
    const [value, setValues] = useState(props.initialValues || {})
    const [error, setError] = useState([])
    const [proccessing, setProccessing] = useState(false)
    const required = props.required
    const handlerChange = name => text => {
        setValues(prevValue => ({ ...prevValue, [name]: text }))
    }

    const validator = async () => {
        let error = []
        for (const key in required) {
            if (value.hasOwnProperty(key) && value[key] === '') {
                error = [{ ...error[0], [key]: `${required[key]}` }]
            }
        }
        setError(error[0])
        return error
    }

    const submit = async (e) => {
        if (props.preProccess) {
            props.preProccess()
        }
        e?.preventDefault()
        let err = await validator()
        if (err.length <= 0) {
            setProccessing(true)
            await props.onSubmit(value)
            setProccessing(false)
            return;
        }
    }

    const reset = name => {
        setValues(prevValue => ({ ...prevValue, [name]: props.initialValues }))
    }

    return { value, setValues, handlerChange, submit, reset, error, proccessing, formData, setError }
}

export default UseFormHandler







// import React from "react"

// const useFormHandler = (props) => {
//     const [value, setValues] = React.useState(props.initialValues || {})
//     const [error, setError] = React.useState([])
//     const [proccessing, setProccessing] = React.useState(false)
//     const required = props.required
//     const handlerChange = name => text => {
//         setValues(prevValue => ({ ...prevValue, [name]: text }))
//     }

//     const validator = async () => {
//         let error = []
//         for (const key in required) {
//             if (value.hasOwnProperty(key) && value[key] === '') {
//                 error = [{ ...error[0], [key]: `${required[key]}` }]
//             }
//         }
//         setError(error[0])
//         return error
//     }

//     const submit = async () => {
//         let err = await validator()
//         if (err.length <= 0) {
//             setProccessing(true)
//             await formInfo()
//             await props.onSubmit(value)
//             setProccessing(false)
//             return;
//         }
//     }

//     const reset = name => {
//         setValues(prevValue => ({ ...prevValue, [name]: props.initialValues }))
//     }

//     return { value, setValues, handlerChange, submit, reset, error, proccessing }
// }

// export default useFormHandler

