import React from 'react';
import { Modal } from "semantic-ui-react";

function CreateCampaignPage() {
    const [open, setOpen] = React.useState(false)

    return (
        <div>
            {/*<Button></Button> this creates bug  */}
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}>
                <Modal.Header>Upload image</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>Would you like to upload this image?</p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {/*<Button onClick={() => setOpen(false)}>Cancel</Button>*/}
                    {/*<Button onClick={() => setOpen(false)} positive>*/}
                    {/*    Ok*/}
                    {/*</Button>*/}
                </Modal.Actions>
            </Modal>
        </div>
    )
}


// class CreateCampaignPage extends Component {
//     state = {
//         isOpen: false
//     }
//
//     setOpen(isOpen) {
//         this.setState({
//             isOpen: isOpen
//         });
//     }
//
//     render() {
//         return (
//             <>
//                 <Button primary>Create Campaign</Button>
//                 <Modal
//                     onClose={() => this.setOpen(false)}
//                     onOpen={() => this.setOpen(true)}
//                     open={this.state.isOpen}>
//                     <Modal.Header>Upload image</Modal.Header>
//                     <Modal.Content image>
//                         <Modal.Description>
//                             <p>Would you like to upload this image?</p>
//                         </Modal.Description>
//                     </Modal.Content>
//                     <Modal.Actions>
//                         <Button onClick={() => this.setOpen(false)}>
//                             Cancel
//                         </Button>
//                         <Button onClick={() => this.setOpen(false)} positive>
//                             Ok
//                         </Button>
//                     </Modal.Actions>
//                 </Modal>
//             </>
//         )
//     }
//
//     // render() {
//     //     return (
//     //         <div>
//     //             <Form>
//     //                 <Form.Group widths='2'>
//     //                     <Form.Input fluid label='Campaign name' placeholder='Campaign Name' />
//     //                 </Form.Group>
//     //                 <Form.Field>
//     //                     <Form.Input fluid label='Campaign name' placeholder='Campaign Name' />
//     //                 </Form.Field>
//     //                 <Form.Button>Create Campaign</Form.Button>
//     //             </Form>
//     //         </div>
//     //     );
//     // }
// }

export default CreateCampaignPage;
