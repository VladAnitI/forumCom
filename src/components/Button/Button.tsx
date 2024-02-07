import cn from 'classnames'
import styles from './Button.module.css'
import { IButtonProps } from './Button.props'

// export const ButtonAlt: FC<IButtonProps> = ({
// 	children,
// 	className,
// 	...props
// }) => {
// 	return (
// 		<button className={cn(styles.button, className)} {...props}>
// 			{children}
// 		</button>
// 	)
// }

function Button({ children, className, ...props }: IButtonProps) {
	return (
		<button className={cn(styles.button, className)} {...props}>
			{children}
		</button>
	)
}

export default Button
