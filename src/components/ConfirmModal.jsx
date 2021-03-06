import React from 'react';
import { Button, Confirm } from "semantic-ui-react";

/**
 * Component props:
 * - func - confirmCallback - required
 * - string - buttonText - required
 * - string - buttonColor - optional
 * - string - headerText - optional
 * - string - messageText - optional
 * - string - cancelButtonText - optional
 * - string - confirmButtonText - optional
 */
class ConfirmModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        }
    }

    openModal() {
        this.setState({
            isOpen: true,
        });
    }

    closeModal() {
        this.setState({
            isOpen: false,
        })
    }

    onConfirm() {
        this.props.confirmCallback().then(() => {
            this.closeModal();
        });
    }

    render() {
        return (
            <div>
                <Button color={this.props.buttonColor}
                        onClick={() => this.openModal()}>
                    {this.props.buttonText}
                </Button>

                <Confirm open={this.state.isOpen}
                         header={this.props.headerText}
                         content={this.props.messageText}
                         cancelButton={this.props.cancelButtonText}
                         confirmButton={this.props.confirmButtonText}
                         onCancel={() => this.closeModal()}
                         onConfirm={() => this.onConfirm()}
                />
            </div>
        );
    }
}

export default ConfirmModal;
