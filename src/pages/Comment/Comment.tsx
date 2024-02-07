import React, { useState, useCallback } from 'react';
import cn from 'classnames';
import styles from './Comment.module.css';

interface Comment {
	id: number;
	username: string;
	avatar: string;
	text: string;
}

interface CommentProps {
	title: string;
	comments: Comment[];
}

const Comment: React.FC<CommentProps> = ({ title, comments }) => {
	const [commentText, setCommentText] = useState('');

	const handleCommentTextChange = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			setCommentText(e.target.value);
		},
		[]
	);

	const handleCommentSubmit = useCallback(() => {
		if (commentText.trim() !== '') {
			const newComment: Comment = {
				id: comments.length + 1,
				username: 'имя пользователя',
				avatar: 'https://www.interfax.ru/ftproot/textphotos/2012/01/20/hit.jpg',
				text: commentText.trim()
			};
			setCommentText('');
			// Добавить новый комментарий в список комментариев
			comments.push(newComment);
			// Если вы используете состояние React для хранения списка комментариев, то необходимо обновить его с помощью setComments
			// setComments([...comments, newComment]);
		}
	}, [commentText, comments]);

	const handleKeyPress = (event: any) => {
		if (event.key == 'Enter') {
			handleCommentSubmit();
			setTimeout(() => {
				setCommentText('');
			}, 1);
		}
	};

	return (
		<div className={styles.post}>
			<div className={styles.postHeader}>
				<div className={styles.postTitleWrapper}>
					<h1 className={styles.postTitle}>{title}</h1>
					<div className={styles.headerRight}>
						<img
							src="https://www.interfax.ru/ftproot/textphotos/2012/01/20/hit.jpg"
							alt=""
							className={styles.avatar}
						/>
						<span className={styles.nickname}>имя и ава автора</span>
					</div>
				</div>
			</div>
			<div className={styles.comments}>
				{comments.map((comment) => (
					<div className={styles.comment} key={comment.id}>
						<div className={styles.commentLeft}>
							<img
								src={comment.avatar}
								alt=""
								className={styles.commentAvatar}
							/>
						</div>
						<div className={styles.commentRight}>
							<div className={styles.commentUsername}>
								<span>{comment.username}</span>
							</div>
							<div className={styles.commentText}>
								<p>{comment.text}</p>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className={styles.textarea}>
				<textarea
					className={cn(styles.commentTextarea, styles.textarea)}
					value={commentText}
					onChange={handleCommentTextChange}
					placeholder="Comment..."
					onKeyDown={handleKeyPress}
				/>
				<button className={styles.commentButton} onClick={handleCommentSubmit}>
					Send
				</button>
			</div>
		</div>
	);
};

export default Comment;

{
	/*  <div className={styles.comment}>
          <div className={styles.commentLeft}>
            <img src="https://www.interfax.ru/ftproot/textphotos/2012/01/20/hit.jpg" alt="" className={styles.commentAvatar} />
          </div>
          <div className={styles.commentRight}>
            <div className={styles.commentUsername}>
              <span>имя и ава автора</span>
            </div>
            <div className={styles.commentText}>
              <p>что то жарковато включаем вентиляторы 卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐</p>
            </div>
          </div>
      </div> */
}
