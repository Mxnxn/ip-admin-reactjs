import React from "react";
import { Link } from "react-router-dom";

const SidebarLink = ({ Icon, text, isActive, url }) => {
	return (
		<Link to={url}>
			<div className={isActive ? "text-primaryx my-2 nav-link active cp bg-primary-fade" : " my-2 nav-link  cp"}>
				<span className="mr-2">
					<Icon size="18" style={{ verticalAlign: "text-bottom" }} />
				</span>
				<span className="nn-bb">{text}</span>
			</div>
		</Link>
	);
};

export default SidebarLink;
