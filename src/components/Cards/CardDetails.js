import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { changeToDate } from '../../Tools/tools'

const CardDetails = () => {
    let apiBase = `https://api.nasa.gov/planetary/apod/?api_key=M3QhqmdhPfnkgx0bXtrbGNj2CJ6LLhGqP7Wn15rL`;

    let { title, startDate, endDate } = useParams();

    let [result, setResult] = useState([]);

    const [isLoading, setLoading] = useState(true);

    let { date,
        media_type,
        thumbnail_url,
        hdurl,
        url,
        explanation,
        copyright,
        service_version

    } = result;
    useEffect(() => {
        (async function () {
            setLoading(true);
            let api = apiBase;

            let stD = changeToDate(startDate);
            let edD = changeToDate(endDate);
            if (stD > edD) {
                api += `&start_date=${endDate}&end_date=${startDate}&thumbs=true`;
            } else {
                api += `&start_date=${startDate}&end_date=${endDate}&thumbs=true`
            }
            let data = await fetch(api).then(res => {
                return res.json();
            });
            if (title && title.trim().length) {
                data = data.filter(x => x.title.toLowerCase().indexOf(title.toLowerCase()) >= 0);
                console.log('filtetData', data);
                if (data.length)
                    setResult(data[0]);
                else
                    setResult([]);
            } else {
                setResult(data);
            }
            setLoading(false);
        })()

    }, [apiBase, title, startDate, endDate]);

    const image = media_type === 'image' ? (hdurl ?? url) : thumbnail_url;

    const openInNewTab = (url) => {
        window.open(url, '_blank', 'noreferrer');
    };

    return (
        <div>
            <div id='spinner2' style={isLoading ? { display: 'block' } : { display: 'none' }} className="loader-container">
                <div className="loader"></div>
            </div>
            <div id='carddetaildiv' style={isLoading ? { display: 'none' } : { display: 'block' }} className='container d-flex justify-content-center'>
                <div className="d-flex flex-column gap-3">
                    <h1 className="text-center">{title}</h1>
                    <img src={image} alt="" className="img-fluid" />
                    <div className="content">
                        <div className="">
                            <span className="fw-bold">
                                Title :
                            </span>
                            {" "}   {title ?? "unknown"}
                        </div>
                        <div className="">
                            <span className="fw-bold">
                                Media type :
                            </span>
                            {" "}     {media_type ?? "unknown"}
                        </div>
                        {
                            (() => {
                                if (media_type === 'video')
                                    return (
                                        <div className="">
                                            <span className="fw-bold">
                                                Watch Video :
                                            </span>
                                            <button className='btn btn-link'
                                                role="link"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    openInNewTab(url)
                                                }}
                                            >
                                                Vidéo
                                            </button>
                                        </div>
                                    )
                            })()
                        }
                        <div className="">
                            <span className="fw-bold">
                                Explanation :
                            </span>
                            {" "}   {explanation ?? "unknown"}
                        </div>
                        <div className="">
                            <span className="fw-bold">
                                Copyright :
                            </span>
                            {" "}  {copyright ?? "unknown"}
                        </div>
                        <div className="">
                            <span className="fw-bold">
                                Service version :
                            </span>
                            {" "} {service_version ?? "unknown"}
                        </div>
                        <div className="">
                            <span className="fw-bold">
                                Date :
                            </span>
                            {" "} {date ?? "unknown"}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardDetails
