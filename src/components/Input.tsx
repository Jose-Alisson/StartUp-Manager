import { useState, useCallback, useRef, useImperativeHandle, useEffect } from 'react'
import React from 'react'
import '../styles/auth.style.css'
import { useMask } from '../hooks/InputMask'
import { Error } from './Error'

export function DropOption({ label, value, onSelect = (label, value) => { } }) {
    return <li className={"p-1 rounded hover:bg-gray-200 transition"} onClick={() => onSelect(label, value)}><span>{label}</span></li>
}

export function Dropdown({ icon = null, initial = null, options = [], children, onChange = (value) => { } }) {
    const [active, setActive] = useState(false)
    const [label, setLabel] = useState(initial)
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActive(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);



    const childrenWithRefs = React.Children.map(children, (child, index) =>
        React.cloneElement(child as any, {
            onSelect: (label, value) => {
                setLabel(label)
                onChange(value)
                setActive(false)
            }
        })
    );

    const selectAndEmitValue = useCallback((option) => {
        setLabel(option.label)
        onChange(option.value)
    }, [])

    let content

    if (options.length > 0) {
        content =
            <ul>
                {options.map((option) => <li onClick={() => selectAndEmitValue(option)}>{option.label}</li>)}
            </ul>
    } else {
        content = childrenWithRefs
    }

    return (
        <section className="dropdown relative" ref={dropdownRef}>
            <div className="drop-header bg-[--color,transparent] p-[0.75rem] rounded-[10px] border flex gap-2 justify-between items-center" onClick={() => setActive(!active)}>
                <div className="flex gap-2 items-center">
                    {icon && icon}
                    <p className={`title  ${initial === label ? 'text-gray-400' : ''}`}>{label || ""}</p>
                </div>
                <i className={`fi fi-rr-angle-small-up flex transition transform transition-transform duration-300 ${active ? 'rotate-180' : 'rotate-0'}`}></i>
            </div>
            {active && <div className="bg-white rounded border absolute w-[100%] border mt-2 p-2 z-10">
                <ul>
                    {content}
                </ul>
            </div>}
        </section>
    )
}

export function SimpleInputField({label= null, inputMask = null, dropMask = false, icon = null, type = "text", placeholder, value = null, onChange, children, style = null, error = null }) {
    const mask = useMask(inputMask, null)

    const handlerWithMask = (e) => {
        if (dropMask) {
            onChange?.(mask.toRaw(e.target.value))
            return
        }
        onChange?.(e.target.value);
    }

    return (
        <div className={`${(error) ? 'error' : 'regular'} flex flex-col gap-2`} >
            {label && <span className="text-[var(--text-color,#4A5568)] text-sm">{label}</span>}
            {icon && icon}
            <div className={`simple-field bg-[var(--color,white)] border rounded-[12px] border-[color-mix(in_srgb,var(--color,white)_70%,#c9c9c9)] text-[var(--text-color,#1F2937)] relative flex-1 flex`}>
                <input type="text" value={mask.apply(value)} onChange={handlerWithMask} className={`outline-none bg-transparent ${icon ? "p-[0.75rem_0.75rem_0.75rem_2rem]" : "p-[0.75rem_0.75rem_0.75rem_0.75rem]"} flex-1`} placeholder={placeholder} />
            </div>
            {children}
        </div>
    )
}

export default function InputField({ label, type, placeholder, value = "", onChange, children = "", error = null }) {
    return (
        <div className={(error) ? 'error' : 'regular'}>
            <div className="field border-b border-b-gray-300">
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-appBg border-none py-2.5 pl-4 pr-4 text-sm transition-all placeholder:text-gray-400 outline-none"
                    required
                />
                <label htmlFor={label}>{label}</label>
            </div>
            {children}
        </div>
    )
}