import React, {FC, MouseEventHandler, useState} from "react"
import style from "./Pagination.module.css"
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

type propsType = {
    totalItemsCount: number
    pageSize: number
    onPageChange: (pageNumber: number) => void
    currentPageNumber: number
}

const MyPagination: FC<propsType> = ({totalItemsCount, pageSize, onPageChange, currentPageNumber}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    // let pages = []
    // for (let i = 1; i <= pagesCount; i++) {
    //     pages.push(i)
    // }
    //
    // let portionCount = Math.ceil(pagesCount / portionSize)
    // let [portionNumber, setPotionNumber] = useState(1)
    // let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    // let rightPortionPageNumber = portionNumber * portionSize


    return <div className={style.paginationPage}>
        <Stack spacing={2}>
            <Pagination
                        count={pagesCount}
                        page={currentPageNumber}
                        onChange={((e, p) => onPageChange(p))}
                        showFirstButton
                        showLastButton
            />
        </Stack>

        {/*{portionNumber > 1 &&*/}
        {/*    <div>*/}
        {/*        <div onClick={() => {*/}
        {/*            setPotionNumber(portionNumber = 1)*/}
        {/*        }}>The first*/}
        {/*        </div>*/}
        {/*        <div onClick={() => {*/}
        {/*            setPotionNumber(portionNumber - 1)*/}
        {/*        }}>Previous*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*}*/}

        {/*<div className={style.pageNumbers}>*/}
        {/*    {pages*/}
        {/*        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)*/}
        {/*        .map(p => {*/}
        {/*            return <div key={p} className={currentPageNumber === p && style.selectedPage}*/}
        {/*                        onClick={(e) => onPageChange(p)}>{p}</div>*/}
        {/*        })*/}
        {/*    }*/}
        {/*</div>*/}

        {/*{portionCount > portionNumber &&*/}
        {/*    <div>*/}
        {/*        <div onClick={() => {*/}
        {/*            setPotionNumber(portionNumber + 1)*/}
        {/*        }}>Next*/}
        {/*        </div>*/}
        {/*        <div onClick={() => {*/}
        {/*            setPotionNumber(portionNumber = portionCount)*/}
        {/*        }}>The last*/}
        {/*        </div>*/}
        {/*    </div>}*/}

    </div>
}

export default MyPagination