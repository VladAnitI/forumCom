import cn from 'classnames';
import Heading from '../../components/Heading/Heading';
import styles from './NewCategory.module.css';
import { useState, ChangeEvent, useRef } from 'react';
import { IoBookOutline } from 'react-icons/io5';
import { FaComputer } from 'react-icons/fa6';
import { FaRegSmile } from 'react-icons/fa';
import { MdOutlineEmojiFoodBeverage } from 'react-icons/md';
import { FaRegMessage } from 'react-icons/fa6';
import { FileUploader } from 'react-drag-drop-files';
import { MdOutlineDone } from 'react-icons/md';

export function NewPage() {
	const fileTypes: string[] = ['JPG', 'PNG', 'JPEG'];

	const [recording, setRecording] = useState(false);
	const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
	const mediaRecorder = useRef<MediaRecorder | null>(null);
	const mediaStream = useRef<MediaStream | null>(null);
	const [mediaRecorded, setMediaRecorded] = useState<boolean>(false);
	const startRecording = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			mediaStream.current = stream;
			const recorder = new MediaRecorder(stream);
			recorder.addEventListener('dataavailable', (event) => {
				setAudioChunks((chunks) => [...chunks, event.data]);
			});
			recorder.start();
			setRecording(true);
			mediaRecorder.current = recorder;
		} catch (error) {
			console.error('Error accessing microphone:', error);
		}
	};

	const stopRecording = () => {
		if (mediaRecorder.current) {
			mediaRecorder.current.stop();
			mediaStream.current?.getTracks().forEach((track) => track.stop());
			setRecording(false);
		}
	};

	const cancelRecording = () => {
		if (mediaRecorder.current) {
			mediaRecorder.current.stop();
			mediaStream.current?.getTracks().forEach((track) => track.stop());
			setRecording(false);
			setAudioChunks([]);
		}
	};

	const handleSave = () => {
		const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
		setMediaRecorded(true);
		console.log(audioBlob);
	};

	const [chosenEmotion, setChosenEmotion] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [namePost, setNamePost] = useState<string>('');
	const [choosenFile, setChoosenFile] = useState<File | null>(null);
	const [choosenFilePost, setChoosenFilePost] = useState<File | null>(null);
	const emotionControl = (emotion: string) => {
		setChosenEmotion(emotion);
	};

	const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setName(value);
	};

	const handleNamePostChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setNamePost(value);
	};

	const handleChange = async (file: File) => {
		setChoosenFile(file);
	};

	const handleChangePostImage = async (file: File) => {
		setChoosenFilePost(file);
	};

	interface IError {
		[key: string]: boolean;
	}

	const initialErrors: IError[] = [
		{ emotion: false },
		{ imageAva: false },
		{ categoryName: false },
		{ firstPost: false }
	];

	const [errors, setErrors] = useState<IError[]>(initialErrors);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const newErrors = [...errors];
		newErrors[0]['emotion'] = chosenEmotion === '';
		newErrors[1]['imageAva'] = choosenFile === null;
		newErrors[2]['categoryName'] = name === '';
		newErrors[3]['firstPost'] = namePost === '' && choosenFilePost === null && !mediaRecorded;

		setErrors(newErrors);

		const readyForUpload = newErrors.every((error) => Object.values(error).every((value) => !value));

    if (readyForUpload) {
      alert("ok!");
    }
  };

	return (
		<>
			<div className={cn(styles['header'])}>
				<Heading>Create new category</Heading>
			</div>
			<div className={cn(styles['block'])}>
				<div className={cn(styles['emotionBlock'], errors[0]['emotion'] ? styles['error'] : null)}>
					<p className={cn(styles['choose'])}>Choose your emotion:</p>

					<div className={cn(styles['emotionCont'])}>
						<div
							className={cn(styles['emotion1'], chosenEmotion === 'book' ? styles['activeEmotion'] : null)}
							onClick={() => emotionControl('book')}
						>
							<IoBookOutline className={cn(styles['book'])} />
						</div>

						<div
							className={cn(styles['emotion2'], chosenEmotion === 'computer' ? styles['activeEmotion'] : null)}
							onClick={() => emotionControl('computer')}
						>
							<FaComputer className={cn(styles['computer'])} />
						</div>

						<div
							className={cn(styles['emotion3'], chosenEmotion === 'fun' ? styles['activeEmotion'] : null)}
							onClick={() => emotionControl('fun')}
						>
							<FaRegSmile className={cn(styles['smile'])} />
						</div>

						<div
							className={cn(styles['emotion4'], chosenEmotion === 'food' ? styles['activeEmotion'] : null)}
							onClick={() => emotionControl('food')}
						>
							<MdOutlineEmojiFoodBeverage className={cn(styles['food'])} />
						</div>
            <div
              className={cn(
                styles["emotion5"],
                chosenEmotion === "chatting" ? styles["activeEmotion"] : null
              )}
              onClick={() => emotionControl("chatting")}
            >
              <FaRegMessage className={cn(styles["message"])} />
            </div>
          </div>
        </div>
        <form className={cn(styles["form"])} onSubmit={handleSubmit}>
          <div className={cn(styles["inputs"])}>
            <span className={cn(styles["setText"])}>
              Set an image and a name:
            </span>
            <div className={cn(styles["inputs-file"])}>
              <FileUploader
                handleChange={handleChange}
                name="file"
                types={fileTypes}
                multiple={false}
                children={
                  <div
                    className={cn(
                      errors[1]["imageAva"] ? styles["errorFile"] : styles["input-file"]
                    )}
                  >
                    <span>
                      Drop
                      <br />
                      or
                      <br />
                      choose
                      <br />
                      image
                    </span>
                    {choosenFile ? (
                      <div className={cn(styles["circleChoose"])}>
                        <MdOutlineDone className={cn(styles["done"])} />
                      </div>
                    ) : null}
                  </div>
                }
              />
              <div className={cn(styles["and"])}>and</div>
              <input
                type="text"
                className={cn(
                  errors[2]["categoryName"] ? styles["errorText"] : styles["input-text"]
                )}
                value={name}
                onChange={handleNameChange}
                placeholder="Category name"
              ></input>
            </div>
          </div>
          <div
            className={cn(
              styles["firstPost"],
              errors[3]["firstPost"] ? styles["error"] : null
            )}
          >
            <span className={cn(styles["setText"])}>Write the first post:</span>
            {/* <div className={cn(styles["radioBlock"])}>
              <div
                className={cn(
                  styles["radio"],
                  radio === "text" ? styles["activeRadio"] : null
                )}
                onClick={() => {
                  handleRadio("text");
                }}
              >
                Text
              </div>
              <div
                className={cn(
                  styles["radio"],
                  radio === "image" ? styles["activeRadio"] : null
                )}
                onClick={() => {
                  handleRadio("image");
                }}
              >
                Image
              </div>
              <div
                className={cn(
                  styles["radio"],
                  radio === "voice" ? styles["activeRadio"] : null
                )}
                onClick={() => {
                  handleRadio("voice");
                }}
              >
                Voice
              </div>
            </div> */}
						<div className={cn(styles['blockInputPost'])}>
							<input
								type='text'
								className={cn(styles['input-textPost'])}
								value={namePost}
								onChange={handleNamePostChange}
								placeholder='Post'
							></input>
							{/* {radio === "text" ? (
                
              ) : null} */}
							<FileUploader
								handleChange={handleChangePostImage}
								name='file'
								types={fileTypes}
								multiple={false}
								children={
									<div className={cn(styles['input-filePost'])}>
										<span>
											Drop
											<br />
											or
											<br />
											choose
											<br />
											image
										</span>
										{choosenFilePost ? (
											<div className={cn(styles['circleChoose'])}>
												<MdOutlineDone className={cn(styles['done'])} />
											</div>
										) : null}
									</div>
								}
							/>
							{/* {radio === "image" ? (
                
              ) : null} */}
							<div>
								<div onClick={recording ? stopRecording : startRecording} className={cn(styles['startRecording'])}>
									{recording ? 'Stop Recording' : 'Start Recording'}
								</div>
								{recording && (
									<div onClick={cancelRecording} className={cn(styles['cancel'])}>
										Cancel
									</div>
								)}
								{!recording && audioChunks.length > 0 && (
									<div onClick={handleSave} className={cn(styles['cancel'])}>
										Save
									</div>
								)}
							</div>
							{/* {radio === "voice" ? (
                
              ) : null} */}
						</div>
					</div>
					<button type='submit' className={cn(styles['buttonSubmit'])}>
						Create new category
					</button>
				</form>
			</div>
		</>
	);
}
