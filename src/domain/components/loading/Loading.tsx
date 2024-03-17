import { IonContent, IonLoading, IonText } from "@ionic/react";
import "./Loading.css";
import React, { useEffect, useState } from "react";
import { LoadingPropsModel } from "../../../core/models/loading.model";

const Loading: React.FC<LoadingPropsModel> = (props) => {
	return (
		<IonLoading
			mode="md"
			isOpen={true}
			message={props.message}
		/>
	);
};

Loading.defaultProps = {
	message: "Loading..."
};

export default Loading;
