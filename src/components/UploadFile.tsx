import { SyntheticEvent, useEffect, useState } from "react"
import { API_URL } from "../constants";

function SvgImage({ url }) {
    const [src, setSrc] = useState("")

    useEffect(() => {
        if(url == null) return

        fetch(url)
            .then(res => res.text())
            .then(data => {
                const base64 = btoa(data)
                setSrc(`data:image/svg+xml;base64,${base64}`)
            })
    }, [url])

    return <img src={src} alt="" className="w-full h-full object-contain background-center"/>
}


export function UploadFile({ view = null, onFile = (file: File) => { }, onRemove = () => {}, height = 350 }) {
    let viewUrl = API_URL + "/resources/download/" + view
    // let viewSvg = view?.endsWith("svg") ? SvgImage({ url: viewUrl }) : null
    let [url, setUrl] = useState(view && view?.startsWith("http") ? view : view ? viewUrl : null)
    const [isDragging, setIsDragging] = useState(false);

    const fileHandler = (e: any) => {
        let file = e.target.files[0]
        if (file) {
            setUrl(URL.createObjectURL(file) as any)
            onFile(file)
        }
    }

    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();

        setIsDragging(false);

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setUrl(URL.createObjectURL(droppedFile) as any)
            onFile(droppedFile)
        }
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function handleDragEnter(e) {
        e.preventDefault();
        setIsDragging(true);
    }

    function handleDragLeave(e) {
        e.preventDefault();
        setIsDragging(false);
    }

    function cancel(e) {
        e.stopPropagation()
        setUrl(null)
        onFile(null)
        onRemove()
    }

    return (
        <section className={`relative h-[${height}px] rounded-[20px] transition ${isDragging ? 'bg-blue-300' : 'bg-blue-50'} border-2 border-gray-300 border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden bg-[#F4F4FC]`} >
            {url &&
                <div className="absolute top-[10px] right-[10px] hover:text-red-500 flex items-center z-20" onClick={cancel}>
                    <i className="fi fi-rr-cross-small flex text-2xl"></i>
                </div>
            }
            <input onDrop={handleDrop} onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} className="absolute top-0 left-0 w-full h-full opacity-0" type="file" name="" id="" onChange={fileHandler} />
            {url ?
                <img src={url} className="w-full h-full object-cover background-center"></img> :
                <div className="content flex flex-col items-center jutify-center text-[#191927]">
                    <i className="fi fi-rr-cloud-upload text-6xl "></i>
                    {isDragging ? <div> <p className="font-black text-xl"><span className="text-primaryBlue">Solte</span>&nbsp; Aqui</p></div> :
                        <div className="flex flex-col items-center jutify-center">
                            <p className="font-black text-xl">Arrastes & soute uma&nbsp;<span className="text-primaryBlue">imagem</span></p>
                            {/* <p className="text-sm mt-2">ou &nbsp;<span className="text-primaryBlue underline underline-offset-4">Selecione</span>&nbsp;uma de seu PC</p> */}
                            <button className="mt-0 p-2 rounded-[12px] text-gray-400 text-sm">ou <span className="text-primaryBlue">Selecione</span>&nbsp;uma de seu PC</button>
                        </div>
                    }
                </div>
            }
        </section>
    )
}

export function UploadFileSvg({ view = null, onFile = (file: File) => { }, onRemove = () => {}, height = 350 }){
    let [viewUrl, setViewUrl] = useState(API_URL + "/resources/download/" + view)
    let [url, setUrl] = useState(view && view?.endsWith("svg") ? viewUrl : null)
    const [isDragging, setIsDragging] = useState(false);

    const fileHandler = (e: any) => {
        let file = e.target.files[0]
        if (file) {
            let url = URL.createObjectURL(file) as any
            setUrl(url)
            onFile(file)
        }
    }

    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();

        setIsDragging(false);

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            let url = URL.createObjectURL(droppedFile) as any
            setUrl(url)
            onFile(droppedFile)
        }
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function handleDragEnter(e) {
        e.preventDefault();
        setIsDragging(true);
    }

    function handleDragLeave(e) {
        e.preventDefault();
        setIsDragging(false);
    }

    function cancel(e) {
        e.stopPropagation()
        setUrl(null)
        onFile(null)
        onRemove()
    }

    return (
        <section className={`relative h-[${height}px] rounded-[20px] transition ${isDragging ? 'bg-blue-300' : 'bg-blue-50'} border-2 border-gray-300 border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden bg-[#F4F4FC]`} >
            {url &&
                <div className="absolute top-[10px] right-[10px] hover:text-red-500 flex items-center z-20" onClick={cancel}>
                    <i className="fi fi-rr-cross-small flex text-2xl"></i>
                </div>
            }
            <input accept=".svg,image/svg+xml" onDrop={handleDrop} onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} className="absolute top-0 left-0 w-full h-full opacity-0" type="file" name="" id="" onChange={fileHandler} />
            {url ?
              <SvgImage url={url}></SvgImage>   :
                <div className="content flex flex-col items-center jutify-center text-[#191927]">
                    <i className="fi fi-rr-cloud-upload text-6xl "></i>
                    {isDragging ? <div> <p className="font-black text-xl"><span className="text-primaryBlue">Solte</span>&nbsp; Aqui</p></div> :
                        <div className="flex flex-col items-center jutify-center">
                            <p className="font-black text-xl">Arrastes & soute uma&nbsp;<span className="text-primaryBlue">imagem</span></p>
                            {/* <p className="text-sm mt-2">ou &nbsp;<span className="text-primaryBlue underline underline-offset-4">Selecione</span>&nbsp;uma de seu PC</p> */}
                            <button className="mt-0 p-2 rounded-[12px] text-gray-400 text-sm">ou <span className="text-primaryBlue">Selecione</span>&nbsp;uma de seu PC</button>
                        </div>
                    }
                </div>
            }
        </section>
    )
}