import React from 'react';
import { hello } from '@farmerui/shared';
interface InputProps {
	onChange?: () => void;
	onBlur?: (string) => void;
	InputType?: 'text'
}
const Input: React.FC<InputProps> = ({onBlur, InputType}) => {
	return <>
		<input type={InputType} onBlur={(e) => onBlur(e.target.value)} onChange={(e) => hello(e.target.value)}></input>
	</>
}
export default Input