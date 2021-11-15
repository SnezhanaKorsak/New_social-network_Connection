import {connect} from "react-redux";
import React from "react";
import {AppStateType} from "../../../redux/redux-store";
import {Pagination} from "./Pagination";
import {getUserTC} from "../../../redux/paginationReducer";



export const LEFT_PAGE = 'LEFT';
export const RIGHT_PAGE = 'RIGHT';

const range = (from: number | string, to: number, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        typeof i === "number" ? i += step : i = 0;
    }

    return range;
}

//https://www.digitalocean.com/community/tutorials/how-to-build-custom-pagination-with-react-ru

class PaginationContainer extends React.Component<PaginationContainerPropsType> {
    componentDidMount(): void {
        this.props.getUserTC(this.props.currentPage, this.props.pageLimit)
    }

    fetchPageNumbers = () => {
        const totalPages = Math.ceil(this.props.totalRecords / this.props.pageLimit);
        const currentPage = this.props.currentPage;
        const pageNeighbours = this.props.pageNeighbours;

        const totalNumbers = (pageNeighbours * 2) + 3;
        const totalBlocks = totalNumbers + 2;

        if (totalPages > totalBlocks) {
            const startPage = Math.max(2, currentPage - pageNeighbours);
            const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
            let pages = range(startPage, endPage);
            const hasLeftSpill = startPage > 2;
            const hasRightSpill = (totalPages - endPage) > 1;
            const spillOffset = totalNumbers - (pages.length + 1);

            switch (true) {
                // handle: (1) < {5 6} [7] {8 9} (10)
                case (hasLeftSpill && !hasRightSpill): {
                    const extraPages = range(startPage - spillOffset, startPage - 1);
                    pages = [LEFT_PAGE, ...extraPages, ...pages];
                    break;
                }

                // handle: (1) {2 3} [4] {5 6} > (10)
                case (!hasLeftSpill && hasRightSpill): {
                    const extraPages = range(endPage + 1, endPage + spillOffset);
                    pages = [...pages, ...extraPages, RIGHT_PAGE];
                    break;
                }

                // handle: (1) < {4 5} [6] {7 8} > (10)
                case (hasLeftSpill && hasRightSpill):
                default: {
                    pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
                    break;
                }
            }

            return [1, ...pages, totalPages];
        }

        return range(1, totalPages);
    }

    handleClick = (page: number | string) => {
        if (typeof page === "number") {
            this.props.getUserTC(page, this.props.pageLimit)
        }
    }
    handleMoveLeft = () => {
        const previousPage = this.props.currentPage - (this.props.pageNeighbours * 2) - 1
        this.props.getUserTC(previousPage, this.props.pageLimit)
    }
    handleMoveRight = () => {
        const nextPage = this.props.currentPage + (this.props.pageNeighbours * 2) + 1
        this.props.getUserTC(nextPage, this.props.pageLimit)
    }

    render(): React.ReactNode {
        return <Pagination pageLimit={this.props.pageLimit}
                           totalRecords={this.props.totalRecords}
                           currentPage={this.props.currentPage}
                           fetchPageNumbers={this.fetchPageNumbers}
                           handleClick={this.handleClick}
                           handleMoveLeft={this.handleMoveLeft}
                           handleMoveRight={this.handleMoveRight}
        />
    }
}


export type PaginationContainerPropsType = mapStatePropsType & mapDispatchPropsType

export type mapStatePropsType = {
    pageLimit: number
    totalRecords: number
    pageNeighbours: number
    currentPage: number

}
export type mapDispatchPropsType = {
    getUserTC: (currentPage: number, pageLimit: number) => void
}

const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        pageLimit: state.pagination.pageLimit,
        totalRecords: state.pagination.totalCount,
        pageNeighbours: state.pagination.pageNeighbours,
        currentPage: state.pagination.currentPage,

    }
}
/*const mapDispatchToProps = (dispatch: Dispatch): mapDispatchPropsType => {
    return {
        setFriends: (friends: Array<FriendType>) => {
            dispatch(setFriendsAC(friends))
        },
        setCurrentPage: (page: number) => {
            dispatch(setCurrentPageAC(page))
        },
        setTotalCount: (totalCount: number) => {
            dispatch(setTotalCountAC(totalCount))
        },
        isFetchingHandler: (isFetching: boolean) => {
            dispatch(isFetchingAC(isFetching))
        }
    }
}*/

export default connect(mapStateToProps, {getUserTC})(PaginationContainer)
