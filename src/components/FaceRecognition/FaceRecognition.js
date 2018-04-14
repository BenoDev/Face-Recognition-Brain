import React from 'react';
import './FaceRecognition.css'


const FaceRecognition = ({boxes,imageUrl})=>{


	const faceBoxGenerationHelper = ()=>{
		return boxes.map((box,i)=>{
			return(
				<div 
					key={box.id}
			 		className='bounding-box'
			 		style={{
			 		top:box.topRow,
			 		right:box.rightCol,
			 		bottom : box.bottomRow,
			 		left: box.leftCol
			 	}}></div>
				)
		})
	}

	return(
		<div className='center ma'>
		<div className='absolute mt2'>
			<img id="inputImage"src={imageUrl} alt="face" width='500px' height='auto'/>
			{faceBoxGenerationHelper()}
		</div>
		</div>
	)
}

export default FaceRecognition;