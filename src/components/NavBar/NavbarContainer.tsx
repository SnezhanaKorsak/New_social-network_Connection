import React from "react";
import {connect} from "react-redux";
import axios from "axios";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType, setUserProfile} from "../../redux/profileReducer";
import {Navbar} from "./Navbar";

class NavbarContainer extends React.Component<PropsType> {

    componentDidMount(): void {

        let userId = this.props.userId
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId, {withCredentials: true})
            .then(response => {
                this.props.setUserProfile(response.data)
            })
    }
    render(): React.ReactNode {
        return <Navbar userId={this.props.userId}/>
    }
}

type mapStatePropsType = {
    isAuth: boolean
    userId: string | null
}
type mapDispatchPropsType = {
    setUserProfile: (profile: ProfileType | null) => void
}
type PropsType = mapStatePropsType & mapDispatchPropsType


const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
        userId: state.auth.userId
    }
}


export default connect(mapStateToProps, {setUserProfile})(NavbarContainer)