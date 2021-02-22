import React from 'react';
import { Button, Form, Modal } from "semantic-ui-react";

/**
 * Required props:
 * - func - submitCallback - required
 * - string - inputLabel - required
 * - string - inputPlaceholder - optional
 * - string - triggerButtonText - required
 * - string - modalTitle - required
 * - string - cancelButtonText - optional
 * - string - submitButtonText - optional
 */
class PromptModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
            inputValue: '',
            isSubmitDisabled: true,
        }
    }

    openModal() {
        this.setState({
            isOpen: true,
        });
    }

    closeModal(){
        this.setState({
            isOpen: false,
            inputValue: '',
            isSubmitDisabled: true,
        })
    }

    onInputValueChange(ev) {
        const value = ev.target.value;
        this.setState({
            inputValue: value,
            isSubmitDisabled: !value
        });
    }

    onSubmit(){
        this.props.submitCallback(this.state.inputValue).then(() => {
            this.closeModal();
        });
    }

    render() {
        return (
            <div>
                <Modal
                    onClose={() => this.closeModal()}
                    onOpen={() => this.openModal()}
                    open={this.state.isOpen}
                    trigger={<Button>{this.props.triggerButtonText}</Button>}>
                    <Modal.Header>{this.props.modalTitle}</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field required>
                                <Form.Input label={this.props.inputLabel}
                                            placeholder={this.props.inputPlaceholder || this.props.inputLabel}
                                            value={this.state.inputValue}
                                            onChange={(ev) => this.onInputValueChange(ev)}/>
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => this.closeModal()}>
                            {this.props.cancelButtonText || 'Cancel'}
                        </Button>
                        <Button disabled={this.state.isSubmitDisabled} onClick={() => this.onSubmit()} positive>
                            {this.props.submitButtonText || 'Create'}
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default PromptModal;
