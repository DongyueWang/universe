import React, { memo } from 'react'
import styles from './Cards.modules.scss';
import { Link } from 'react-router-dom';

const Cards = ({ page, results, endDate, startDate }) => {
    let display;
    if (results) {
        display = results.map(x => {
            const {
                date,
                media_type,
                thumbnail_url,
                hdurl,
                title,
                url } = x;

            const image = media_type === 'image' ? (hdurl ?? url) : thumbnail_url;

            return (
                <div
                    key={title}
                    className={`col-lg-4  col-md-6 col-12 mb-4 position-relative  text-dark`}>
                    <div

                        className={`${styles.cards} d-flex flex-column justify-content-center`}>
                        <img src={image} alt="" className={`img-fluid ${styles.img}`} />
                        <div style={{ padding: "10px" }} className="content">
                            <div className="fs-4 fw-bold mb-2">{title}</div>
                            <div className="" mb-2>
                                <div className="fs-6">Media Type</div>
                                <div className="fs-5">{media_type ?? "unknown"}</div>
                            </div>  <div className="">
                                <div className="fs-6">Date</div>
                                <div className="fs-5">{date ?? "unknown"}</div>
                            </div>

                            <Link to={`${page}${title}/${startDate}/${endDate}`}>Detail</Link>
                        </div>
                    </div>
                </div>
            )
        });
    }
    else {
        display = "No Characters Found :/"
    }
    return (
        <>{display}</>
    )
}

export default memo(Cards)
