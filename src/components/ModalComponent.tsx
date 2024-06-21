import React from 'react';
import { Modal, Backdrop, Fade, Button, Typography } from '@mui/material';

interface ModalComponentProps {
    open: boolean;
    onClose: () => void;
    message: string;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ open, onClose, message }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div
                    style={{
                        backgroundColor: '#fff',
                        padding: 20,
                        maxWidth: 400,
                        margin: 'auto',
                        textAlign: 'center',
                        borderRadius: 8,
                    }}
                >
                    <Typography variant="h6" id="modal-title" gutterBottom>
                        {message}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={onClose}>
                        Cerrar
                    </Button>
                </div>
            </Fade>
        </Modal>
    );
};

export default ModalComponent;
