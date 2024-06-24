import Link from "next/link"

export const NavLink = ({link, content}: {link:string, content:string})=>{
    return(
        <Link href={link} className=" border-2 border-gray-400 rounded-md p-2">{content}</Link>
    )
}