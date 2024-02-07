import cn from 'classnames'
import styles from './Heading.module.css'
import { IHeadingProps } from './Heading.props'

function Heading({ children, className, ...props }: IHeadingProps) {
	return (
		<h1 className={cn(styles.heading, className)} {...props}>
			{children}
		</h1>
	)
}

export default Heading
