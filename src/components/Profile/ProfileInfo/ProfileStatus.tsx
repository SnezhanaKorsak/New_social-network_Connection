import React, {ChangeEvent} from 'react';


type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

type StateType = {
    editMode: boolean
    status: string
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType, StateType> {
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidMount() {
        this.setState({
            status: this.props.status
        })
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusPropsType>, prevState: Readonly<StateType>): void {
        if(prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render(): React.ReactNode {
        return <div>
            {!this.state.editMode
                ? <span onDoubleClick={this.activateEditMode}>
                    {this.props.status ? this.props.status : 'no information'}
            </span>
                : <input value={this.state.status}
                         onBlur={this.deactivateEditMode}
                         onChange={this.onStatusChange}
                         autoFocus
                />
            }

        </div>
    }

}