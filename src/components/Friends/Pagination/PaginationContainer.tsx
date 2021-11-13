import {connect} from "react-redux";
import React from "react";
import axios from "axios";
import {AppStateType} from "../../../redux/redux-store";
import {FriendType, toggleIsFetching, setFriends} from "../../../redux/friendsReducer";
import {Pagination} from "./Pagination";
import {setCurrentPage, setTotalCount} from "../../../redux/paginationReducer";

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
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageLimit}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setFriends(response.data.items);
                this.props.setTotalCount(response.data.totalCount)
            })
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
        this.props.toggleIsFetching(true)
        if (typeof page === "number") {
            this.props.setCurrentPage(page)
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageLimit}`)
                .then(response => {
                    this.props.toggleIsFetching(false)
                    this.props.setFriends(response.data.items)
                })
        }
    }
    handleMoveLeft = () => {
        this.props.toggleIsFetching(true)
        const previousPage = this.props.currentPage - (this.props.pageNeighbours * 2) - 1
        this.props.setCurrentPage(previousPage)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${previousPage}&count=${this.props.pageLimit}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setFriends(response.data.items)
            })
    }
    handleMoveRight = () => {
        this.props.toggleIsFetching(true)
        const nextPage = this.props.currentPage + (this.props.pageNeighbours * 2) + 1
        this.props.setCurrentPage(nextPage)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${nextPage}&count=${this.props.pageLimit}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setFriends(response.data.items)
            })
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
    setCurrentPage: (page: number) => void
    setTotalCount: (totalCount: number) => void
    setFriends: (friends: Array<FriendType>) => void
    toggleIsFetching: (isFetching: boolean) => void
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

export default connect(mapStateToProps, {
    setFriends,
    setCurrentPage,
    setTotalCount,
    toggleIsFetching
})(PaginationContainer)
