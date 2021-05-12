import { MarkdownText as _MarkdownText, MarkdownTextOptions } from '@opendatasoft/visualizations';
import { FC } from 'react';
import { Props } from './Props';
import { wrap } from './ReactImpl';

// Explicit name and type are needed for storybook
const MarkdownText: FC<Props<string, MarkdownTextOptions>> = wrap(_MarkdownText);
export default MarkdownText;
