import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
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
	onSubmit?: (params: ArticleStateType) => void;
	onReset?: (params: ArticleStateType) => void;
	onToggle?: (params: boolean) => void;
	isOpen: boolean;
};

export const ArticleParamsForm = (props: TArticleParamsForm) => {
	const { onSubmit, onReset, onToggle, isOpen } = props;

	const [element, setElement] = useState({
		fontFamilyOption: fontFamilyOptions[0],
		fontColor: fontColors[0],
		fontSizeOption: fontSizeOptions[0],
		backgroundColor: backgroundColors[0],
		contentWidth: contentWidthArr[0],
	});

	const newFontSize = (option: OptionType) => {
		setElement({ ...element, fontSizeOption: option });
	};

	const newBackgroundColor = (option: OptionType) => {
		setElement({ ...element, backgroundColor: option });
	};

	const newWidth = (option: OptionType) => {
		setElement({ ...element, contentWidth: option });
	};

	const newFontFamily = (option: OptionType) => {
		setElement({ ...element, fontFamilyOption: option });
	};

	const newColor = (option: OptionType) => {
		setElement({ ...element, fontColor: option });
	};

	const toggleForm = () => {
		onToggle?.(isOpen);
	};

	const stylesContainer = clsx({
		[styles.container]: true,
		[styles.container_open]: isOpen,
	});

	const submit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit?.(element);
	};

	const reset = () => {
		setElement(defaultArticleState);
		onReset?.(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleForm} />
			<aside className={stylesContainer} style={{ overflowX: 'hidden' }}>
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
						onChange={newFontFamily}
						title='Шрифт'
					/>

					<RadioGroup
						name={element.fontFamilyOption.className}
						options={fontSizeOptions}
						selected={element.fontSizeOption}
						onChange={newFontSize}
						title={'Размер шрифта'}
					/>

					<Select
						selected={element.fontColor}
						options={fontColors}
						onChange={newColor}
						title='Цвет шрифта'
					/>

					<Separator />

					<Select
						selected={element.backgroundColor}
						options={backgroundColors}
						onChange={newBackgroundColor}
						title='Цвет фона'
					/>

					<Select
						selected={element.contentWidth}
						options={contentWidthArr}
						onChange={newWidth}
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
