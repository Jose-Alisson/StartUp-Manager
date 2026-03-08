
import ReactDom from 'react-dom'

export function Modal({ active = false, title = "", children, onClose = (e) => { } }) {
    return ReactDom.createPortal(
        <>
            {active &&
                <section className="absolute w-full h-full top-0 left-0 flex flex-col items-center p-4 overflow-auto z-50">
                    <div onClick={onClose} className="fade bg-black fixed w-full h-full top-0 left-0 opacity-40"></div>
                    <div className="modal p-4 bg-white border rounded-[10px] relative ">
                        <div className="modal-header flex justify-between items-center gap-8">
                            <p className="title font-black">{title}</p>
                            <div className="close hover:text-red-500" onClick={onClose}>
                                <i className="fi fi-rr-cross-small"></i>
                            </div>
                        </div>
                        <div className="modal-content">
                            {children}
                        </div>
                    </div>
                </section>
            }
        </>
        , document.body
    )
} 