import { NavLink } from "./NavLink"

export const Navbar = ()=>{

    return(
        <div className=" flex justify-center items-center">
            <div className=" flex flex-nowrap justify-between space-x-5 w-96 mt-20 mb-40">
                <NavLink link="/" content="Home"/>
                <NavLink link="/static-route" content="Static Route"/>
                <NavLink link="/interactive-route" content="Interactive Route"/>
            </div>
        </div>
    )
}