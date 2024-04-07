import { calculators } from '../../constants'
import Link from 'next/link'
import React from 'react'

const NavItems = (props) => {
    return (
        <ul className="items-center justify-between flex w-full flex-col gap-5  text-sm md:px-20">
            <li className='text-2xl'>
                <Link href={'/'} onClick={() => props.setOpen(false)}>
                    HOME
                </Link>
            </li>
            {calculators.map((link) => {
                return (<li
                    key={link.value}
                    className={`flex-center white-space-nowrap `}
                >
                    <Link href={link.route} onClick={() => props.setOpen(false)}>
                        <span className="text-2xl">
                            {link.label}
                        </span>
                    </Link>
                </li>)
            })}
        </ul>
    )

}

export default NavItems