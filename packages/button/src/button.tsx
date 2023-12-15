import React from 'react';
import { hello } from '@farmerui/shared';
interface ButtonProps {
	onClick?: () => void;
	size?: number,
	content?: string
}

const Button: React.FC<ButtonProps> = ({content}) => {
	return <button onClick={() => hello(content)}>{content}12313123</button>
}
export default Button