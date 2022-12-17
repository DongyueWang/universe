import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { changeToQueryDate } from '../../../Tools/tools'

const PikerDate = ({ setLoading, dateLabel, setDate, initDate, refDate }) => {
    const [year1, month1, day1] = initDate.split('-');
    let localKey = 'localDate' + dateLabel;
    const getlcDate = () => {
        try {
            const strdate = JSON.parse(localStorage.getItem(localKey));
            return strdate ? new Date(strdate) : new Date(year1, month1 - 1, day1);
        } catch (err) {
            return new Date(year1, month1 - 1, day1)
        }
    }

    const [localDate, setLocalDate] = useState(() => (getlcDate()) || new Date(year1, month1 - 1, day1));

    useEffect(() => {
        localStorage.setItem(localKey, JSON.stringify(localDate));
    }, [localDate, localKey]);

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
