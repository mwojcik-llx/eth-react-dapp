import React from 'react';
import { Button, Form, Modal } from "semantic-ui-react";


class CampaignCreatePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
            campaignName: '',
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
            campaignName: '',
            isSubmitDisabled: true,
        })
    }

    onCampaignNameChange(ev) {
        const value = ev.target.value;
        this.setState({
            campaignName: value,
            isSubmitDisabled: !value
        });
    }

    onCampaignCreateSubmit(){
        this.props.createCampaign(this.state.campaignName).then(() => {
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
                    trigger={<Button>Create Campaign</Button>}>
                    <Modal.Header>Create Campaign</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field required>
                                <Form.Input label='Campaign name'
                                            placeholder='Campaign name'
                                            value={this.state.campaignName}
                                            onChange={(ev) => this.onCampaignNameChange(ev)}/>
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => this.closeModal()}>
                            Cancel
                        </Button>
                        <Button disabled={this.state.isSubmitDisabled} onClick={() => this.onCampaignCreateSubmit()} positive>
                            Create
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default CampaignCreatePage;
