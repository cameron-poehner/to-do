import React, { useState } from 'react';
import { StyledOverlay, StyledModal, StyledFormTitleContainer, StyledForm } from './styles';
import Button from '../Button';

const Modal = () => {
    // const [showModal, setShowModal] = useState<boolean>(false);
    const mode: string = 'create';
    const editMode = mode === "edit" ? true : false

    const [data, setData] = useState<any>({
        user_email: "",
        title: "",
        progress: "",
        date: editMode ? "" : new Date(),
    })

    const handleChange = (event: any) => {
        console.log('onChange fired');
    }

    return (
        <StyledOverlay>
            <StyledModal>
                <StyledFormTitleContainer>
                    <h3>Let's {mode} your task!</h3>
                    <Button>X</Button>
                </StyledFormTitleContainer>
                <StyledForm>
                    <input
                        required
                        maxLength={30}
                        placeholder=" Your task goes here"
                        name="title"
                        value={""}
                        onChange={handleChange}
                    />

                    <input
                        required
                        type="range"
                        min="0"
                        max="100"
                        name="progress"
                        value={""}
                        onChange={handleChange}
                    />
                    <input type="submit" />
                </StyledForm>
            </StyledModal>
        </StyledOverlay>
    );
};

export default Modal;