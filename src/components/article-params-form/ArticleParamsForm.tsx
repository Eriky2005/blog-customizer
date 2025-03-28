import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

type TArticleParamsForm = {
	onFormChange: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: TArticleParamsForm) => {
	const { onFormChange } = props;

	const [isOpen, setOpen] = useState(false);
	const articleParamsFormRef = useRef<HTMLFormElement>(null);
	const [element, setElement] = useState(defaultArticleState);

	const handleClickOutside = (event: MouseEvent) => {
		if (
			articleParamsFormRef.current &&
			!articleParamsFormRef.current.contains(event.target as Node)
		) {
			setOpen(false);
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const updateElement = (key: keyof ArticleStateType, option: OptionType) => {
		setElement((prev) => ({ ...prev, [key]: option }));
	};

	const toggleForm = () => {
		setOpen((prev) => !prev);
	};

	const stylesContainer = clsx({
		[styles.container]: true,
		[styles.container_open]: isOpen,
	});

	const submit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onFormChange(element);
	};

	const reset = () => {
		setElement(defaultArticleState);
		onFormChange(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleForm} />
			<aside
				className={stylesContainer}
				style={{ overflowX: 'hidden' }}
				ref={articleParamsFormRef}>
				<form
					className={styles.form}
					style={{ display: 'flex', flexDirection: 'column', gap: 50 }}
					onSubmit={submit}
					onReset={reset}>
					<Text size={31} weight={800} uppercase>
						{'Задайте параметры'}
					</Text>

					<Select
						selected={element.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => updateElement('fontFamilyOption', option)}
						title='Шрифт'
					/>

					<RadioGroup
						name={element.fontFamilyOption.className}
						options={fontSizeOptions}
						selected={element.fontSizeOption}
						onChange={(option) => updateElement('fontSizeOption', option)}
						title={'Размер шрифта'}
					/>

					<Select
						selected={element.fontColor}
						options={fontColors}
						onChange={(option) => updateElement('fontColor', option)}
						title='Цвет шрифта'
					/>

					<Separator />

					<Select
						selected={element.backgroundColor}
						options={backgroundColors}
						onChange={(option) => updateElement('backgroundColor', option)}
						title='Цвет фона'
					/>

					<Select
						selected={element.contentWidth}
						options={contentWidthArr}
						onChange={(option) => updateElement('contentWidth', option)}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
