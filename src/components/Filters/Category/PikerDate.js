import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { changeToQueryDate } from '../../../Tools/tools'

const PikerDate = ({ setLoading, dateLabel, setDate, initDate, refDate }) => {
    const [year1, month1, day1] = initDate.split('-');
    let localKey = 'localDate' + dateLabel;


    const [localDate, setLocalDate] = useState(new Date(year1, month1 - 1, day1));

    return (
        <div className="form-group">
            <label >{dateLabel}</label>
            <DatePicker selected={localDate} onChange={(date) => {
                let today = new Date();
                if (date > today)
                    date = today;
                let strDate = changeToQueryDate(date)
                setLocalDate(date);
                setDate(strDate)
            }} />
        </div>
    )
}

export default PikerDate
