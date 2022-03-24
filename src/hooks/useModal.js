import { useState } from "react"

export const useModalSingle = (selector) => {

    const [singleModalIsOpen, setSingleIsOpen] = useState(false)

    const toggleSingleDialog = () => {
        setSingleIsOpen(!singleModalIsOpen)

        if (singleModalIsOpen) {
            document.querySelector(`${selector}`).removeAttribute("open")
        } else {
            document.querySelector(`${selector}`).setAttribute("open", true)
        }
    }

    return { toggleSingleDialog, singleModalIsOpen }
}

export const useModalAll = (selector) => {

    const [allModalIsOpen, setAllIsOpen] = useState(false)

    const toggleAllDialog = () => {
        setAllIsOpen(!allModalIsOpen)

        if (allModalIsOpen) {
            document.querySelector(`${selector}`).removeAttribute("open")
        } else {
            document.querySelector(`${selector}`).setAttribute("open", true)
        }
    }

    return { toggleAllDialog, allModalIsOpen }
}

export const useModalAccount = (selector) => {

    const [accountModalIsOpen, setAccountIsOpen] = useState(false)

    const toggleAccountDialog = () => {
        setAccountIsOpen(!accountModalIsOpen)

        if (accountModalIsOpen) {
            document.querySelector(`${selector}`).removeAttribute("open")
        } else {
            document.querySelector(`${selector}`).setAttribute("open", true)
        }
    }

    return { toggleAccountDialog, accountModalIsOpen }
}


