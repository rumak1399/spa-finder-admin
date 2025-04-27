"use client";

import { GoogleMap, Marker } from "@react-google-maps/api";

export const defaultMapContainerStyle = {
	width: "100%",
	height: "410px",
	borderRadius: "15px",
};
const defaultMapCenter = {
	lat: 23.87146196927064,
	lng: 90.39398848550083,
};
const defaultMapZoom = 15;
const defaultMapOptions = {
	zoomControl: true,
	tilt: 0,
	gestureHandling: "auto",
	mapTypeId: "hybrid",
	label: true,
};
const MapComponent = () => {
	return (
		<div className='w-full'>
			<GoogleMap
				mapContainerStyle={defaultMapContainerStyle}
				center={defaultMapCenter}
				zoom={defaultMapZoom}
				options={defaultMapOptions}
			>
				<Marker position={defaultMapCenter} />
			</GoogleMap>
		</div>
	);
};

export { MapComponent };
