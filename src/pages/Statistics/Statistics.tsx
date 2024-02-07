import cn from 'classnames';
import Heading from '../../components/Heading/Heading';
import styles from './Statistics.module.css';

export function Statistics() {
	return (
		<>
			<div className={cn(styles['header'])}>
				<Heading>Statistics</Heading>
			</div>
		</>
	);
}
