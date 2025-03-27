import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [formState, setFormState] = useState(defaultArticleState);
	const [isOpen, setOpen] = useState(false);

	const toggler = () => setOpen(!isOpen);
	const submit = (props: ArticleStateType) => setFormState(props);

	const reset = (props: ArticleStateType) => setFormState(props);
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': formState.fontFamilyOption.value,
					'--font-size': formState.fontSizeOption.value,
					'--font-color': formState.fontColor.value,
					'--container-width': formState.contentWidth.value,
					'--bg-color': formState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onSubmit={submit}
				onReset={reset}
				onToggle={toggler}
				isOpen={isOpen}
			/>
			<Article onClick={() => setOpen(false)} />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
