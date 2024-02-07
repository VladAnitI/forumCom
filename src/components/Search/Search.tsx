import cn from 'classnames'
import styles from './Search.module.css'
import { ISearchProps } from './Search.props'

function Input({ className, ...props }: ISearchProps) {
	return <input className={cn(styles.search, className)} {...props} />
}

export default Input
