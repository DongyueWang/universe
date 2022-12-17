import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';


const Pagination = ({ pageCount, pageNumber, setPageNumber }) => {
    /* let next = () => {
        setPageNumber(prevNum => prevNum + 1);
    };
    let prev = () => {
        pageNumber > 1 && setPageNumber(prevNum => prevNum - 1);
    };

    return (
        <div className='container d-flex justify-content-center gap-5 my-5'>
            <button onClick={prev} className="btn btn-primary">Prev</button>
            <button onClick={next} className="btn btn-primary">Next</button>
        </div>
    ) */
    useEffect(() => {
        document.querySelectorAll('.pagination li.btn.btn-primary a').forEach(a => a.style.color = "white");

    }, []);

    let [width, setWidth] = useState(window.innerWidth);
    console.log('width', width);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
        })

        return () => window.removeEventListener('resize', () => {
            setWidth(window.innerWidth);
        })

    }, []);

    return (
        <>
            <style jsx>
                {
                    `
                    @media (max-width: 768px){
                        .next, .prev{
                            display: none;
                        }
                    }
                    .pagination{
                        font-size: 14px;
                    }
                `
                }

            </style>
            <ReactPaginate
                className='pagination justify-content-center gap-4 my-4'
                forcePage={pageNumber === 1 ? 0 : pageNumber - 1}
                nextLabel="Next"
                previousLabel="Prev"
                nextClassName='btn btn-primary next'
                previousClassName='btn btn-primary prev'
                pageClassName='page-item'
                pageLinkClassName='page-link'
                marginPagesDisplayed={width < 576 ? 1 : 2}
                pageRangeDisplayed={width < 576 ? 1 : 2}
                activeClassName='active'
                onPageChange={(data) => { setPageNumber(data.selected + 1) }}
                pageCount={pageCount} />
        </>
    );
}

export default Pagination
