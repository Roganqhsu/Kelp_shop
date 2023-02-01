import React, { useState } from 'react'
import styles from './Pagination.module.scss'
const Pagination = ({
    currentPage
    , setCurrentPage
    , productsPrePage
    , totalProduct
}) => {
    const pageNumber = [];
    // 點擊後更改頁面
    const clickProductPage = (page) => {
        setCurrentPage(page)
    }
    const [pageLimit] = useState(3)
    const [maxPageLimit, setMaxPageLimit] = useState(3);
    const [minPageLimit, setMinPageLimit] = useState(0);
    // 點擊後到下一頁
    const nextPage = () => {
        setCurrentPage(currentPage + 1)
        if (currentPage + 1 > maxPageLimit) {
            setMaxPageLimit(maxPageLimit + pageLimit);
            setMinPageLimit(minPageLimit + pageLimit)
        }
    }
    const prevPage = () => {
        setCurrentPage(currentPage - 1)
        if ((currentPage - 1) % pageLimit === 0) {
            setMaxPageLimit(maxPageLimit - pageLimit)
            setMinPageLimit(minPageLimit - pageLimit)
            console.log(maxPageLimit);
        }
        console.log(currentPage);
        // console.log(maxPageLimit);
        // console.log(minPageLimit);
    }
    for (let i = 1; i <= Math.ceil(totalProduct / productsPrePage); i++) {
        pageNumber.push(i)
    };
    return (
        <div className={styles.pagination}>
            <ul>
                <li
                    className={currentPage === pageNumber[0] ? `${styles.hidden}` : null}
                    onClick={() => {
                        prevPage();
                    }}
                >
                    prev
                </li>
                {pageNumber.map((number) => {
                    if (number < maxPageLimit + 1 && number > minPageLimit) {
                        return (
                            <li
                                className={number === currentPage ? `${styles.active}` : null}
                                onClick={() => { clickProductPage(number) }}
                            >
                                {number}
                            </li>
                        )
                    }
                })}
                <li
                    className={currentPage === pageNumber[pageNumber.length - 1] ? `${styles.hidden}` : null}
                    onClick={() => { nextPage() }}
                >
                    next
                </li>
            </ul>
        </div>
    )
}

export default Pagination