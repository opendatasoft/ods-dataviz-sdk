function titleOnOverflow(el: HTMLElement) {
    function update() {
        const target = (el.firstElementChild as HTMLElement | null) ?? el;
        const overflows =
            target.scrollWidth > target.offsetWidth || target.scrollHeight > target.offsetHeight;
        // eslint-disable-next-line no-param-reassign
        el.title = overflows ? el.textContent ?? '' : '';
    }
    el.addEventListener('mouseenter', update);
    return { destroy: () => el.removeEventListener('mouseenter', update) };
}

export default titleOnOverflow;
