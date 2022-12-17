import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PikerDate = ({ setLoading, errorMessage, dateLabel, setDate, initDate, refDate, setErrorMessage }) => {

    const [
        year1, month1, day1] = initDate.split('-');
    const [localDate, setLocalDate] = useState(new Date(year1, month1 - 1, day1));

    return (

        <div className="form-group">
            <label >{dateLabel}</label>

            <DatePicker selected={localDate} onChange={(date) => {
                let today = new Date();
                if (date > today)
                    date = today;
                let year = date.getFullYear()
                let month = date.getMonth() + 1
                let day = date.getDate()
                console.log('refDate', refDate);


                if (dateLabel === 'Start') {
                    let [edY, edM, edD] = refDate.split('-');
                    let end = new Date(edY, parseInt(edM, 10) - 1, edD);
                    if (end < date) {
                        setErrorMessage('Start date should less than end date')
                        setLocalDate(date);
                    }
                    else {
                        setErrorMessage('')
                        setLocalDate(date)

                        setDate(`${year}-${month}-${day}`)
                    }
                } else {
                    setErrorMessage('')
                    setLocalDate(date);

                    setDate(`${year}-${month}-${day}`)
                }
            }} />
        </div>
    )
}

export default PikerDate
