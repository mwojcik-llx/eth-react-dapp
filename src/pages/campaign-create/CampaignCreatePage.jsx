import React from 'react';
import { Button, Modal } from "semantic-ui-react";


function CampaignCreatePage() {
    const [open, setOpen] = React.useState(false)

    return (
        <div>
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button>Basic Modal</Button>}>
                <Modal.Header>Upload image</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>Would you like to upload this image?</p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={() => setOpen(false)} positive>
                        Ok
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}

export default CampaignCreatePage;
