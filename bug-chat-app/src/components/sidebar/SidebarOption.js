import React from 'react';
import './SidebarOption.css'

// I need to get the icon form the sidebar component and the title of that
// selection
function SidebarOption({Icon, title}) {
    return (
        <div className="sidebarOption">
            {/* renders a component only if an icon exists */}
            {Icon && <Icon className="sidebarOption_icon"/>}
            
            {/* if an icon is passed we render the title else we add a # to the title 
            to show the different channels */}
            {Icon ? (
                <h3>{title}</h3> ) : ( 
                <h3 className="sidebarOption_channel"> 
                    <span className="sidebarOption_hash">#</span> {title} 
                </h3>
            )}
            
        </div>
    )
}

export default SidebarOption;