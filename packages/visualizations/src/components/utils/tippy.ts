import tippy, { Props } from 'tippy.js';
import 'tippy.js/dist/tippy.css';

export default function tippyAction(node: HTMLElement, initialProps: Partial<Props>) {
    const instance = tippy(node, initialProps);
    return {
        update: (props: Partial<Props>) => {
            instance.setProps(props);
        },
        destroy: () => {
            instance.destroy();
        },
    };
}
