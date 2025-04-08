'use clients'

import { createPortal } from "react-dom"

const modalDiv = document.getElementById('modal') as HTMLDivElement

const ModalContainer = ({children} : {children: React.ReactNode}) => {
    return createPortal(children, modalDiv);
}

export default ModalContainer