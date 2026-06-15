// @jest-environment jsdom
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Link, LinkHref, LinkAction } from '@opendatasoft/visualizations';
import { LinksMenu, LINKS_MENU_CLASS } from 'src';

const hrefLink: LinkHref = {
    href: 'https://example.com/export.csv',
    label: 'Export by CSV',
    download: 'My Asset - My Chart.csv',
};

const actionLink: LinkAction = {
    onClick: () => {},
    label: 'Export by PNG',
};

// The trigger button carries aria-label="Links" (see LinksMenu.svelte).
const openMenu = async () => {
    await userEvent.click(screen.getByRole('button', { name: 'Links' }));
};

describe('LinksMenu (reactified Svelte component)', () => {
    describe('trigger + open/close', () => {
        it('renders the trigger button and keeps the menu closed by default', () => {
            const { container } = render(<LinksMenu links={[hrefLink]} />);
            expect(screen.getByRole('button', { name: 'Links' })).toBeInTheDocument();
            expect(container.querySelector('.dropdown')).toBeNull();
        });

        it('opens the menu on trigger click', async () => {
            const { container } = render(<LinksMenu links={[hrefLink]} />);
            await openMenu();
            expect(container.querySelector('.dropdown')).toBeInTheDocument();
        });

        it('closes the menu on a second trigger click', async () => {
            const { container } = render(<LinksMenu links={[hrefLink]} />);
            await openMenu();
            await openMenu();
            await waitFor(() => expect(container.querySelector('.dropdown')).toBeNull());
        });

        it('exposes the root wrapper under LINKS_MENU_CLASS (filtered out of PNG captures)', () => {
            const { container } = render(<LinksMenu links={[hrefLink]} />);
            // Guards the divergence risk between the exported constant and the hardcoded
            // class="links-menu" in the Svelte template (review point S2).
            expect(container.querySelector(`.${LINKS_MENU_CLASS}`)).toBeInTheDocument();
        });
    });

    describe('href items', () => {
        it('renders an anchor with href, target, rel and download', async () => {
            render(<LinksMenu links={[hrefLink]} />);
            await openMenu();
            const anchor = screen.getByRole('menuitem') as HTMLAnchorElement;
            expect(anchor.tagName).toBe('A');
            expect(anchor.getAttribute('href')).toBe('https://example.com/export.csv');
            expect(anchor.getAttribute('target')).toBe('_blank');
            expect(anchor.getAttribute('rel')).toContain('noopener');
            expect(anchor.getAttribute('download')).toBe('My Asset - My Chart.csv');
            expect(anchor).toHaveTextContent('Export by CSV');
        });
    });

    describe('action items', () => {
        it('renders a button, not an anchor', async () => {
            render(<LinksMenu links={[actionLink]} />);
            await openMenu();
            const item = screen.getByRole('menuitem');
            expect(item.tagName).toBe('BUTTON');
            expect(screen.queryByRole('menuitem', { name: 'Export by PNG' })?.tagName).toBe('BUTTON');
        });
    });

    describe('click behaviour', () => {
        it('calls onClick and closes the menu when a href item is clicked', async () => {
            const onClick = jest.fn();
            const { container } = render(<LinksMenu links={[{ ...hrefLink, onClick }]} />);
            await openMenu();
            await userEvent.click(screen.getByRole('menuitem'));
            expect(onClick).toHaveBeenCalledTimes(1);
            await waitFor(() => expect(container.querySelector('.dropdown')).toBeNull());
        });

        it('calls onClick and closes the menu when an action item is clicked', async () => {
            const onClick = jest.fn();
            const { container } = render(<LinksMenu links={[{ ...actionLink, onClick }]} />);
            await openMenu();
            await userEvent.click(screen.getByRole('menuitem'));
            expect(onClick).toHaveBeenCalledTimes(1);
            await waitFor(() => expect(container.querySelector('.dropdown')).toBeNull());
        });

        it('still closes the menu when an action onClick throws (try/finally — review S3)', async () => {
            const onClick = jest.fn(() => {
                throw new Error('simulated export failure');
            });
            const { container } = render(<LinksMenu links={[{ ...actionLink, onClick }]} />);
            await openMenu();
            // The handler wraps onClick in try/finally: closeMenu() always runs even though the
            // error is not swallowed (it re-throws after finally). jsdom surfaces that as a window
            // "error" event, so we trap and preventDefault it for this dispatch, then assert the
            // contract that matters: onClick ran and the menu closed despite the throw.
            const swallow = (event: ErrorEvent) => event.preventDefault();
            window.addEventListener('error', swallow);
            try {
                screen
                    .getByRole('menuitem')
                    .dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
            } finally {
                window.removeEventListener('error', swallow);
            }
            expect(onClick).toHaveBeenCalledTimes(1);
            await waitFor(() => expect(container.querySelector('.dropdown')).toBeNull());
        });
    });

    describe('dismissal', () => {
        it('closes when clicking outside the menu', async () => {
            const { container } = render(
                <div>
                    <button type="button" data-testid="outside">
                        outside
                    </button>
                    <LinksMenu links={[hrefLink]} />
                </div>,
            );
            await openMenu();
            expect(container.querySelector('.dropdown')).toBeInTheDocument();
            await userEvent.click(screen.getByTestId('outside'));
            await waitFor(() => expect(container.querySelector('.dropdown')).toBeNull());
        });

        it('closes on Escape', async () => {
            const { container } = render(<LinksMenu links={[hrefLink]} />);
            await openMenu();
            await userEvent.keyboard('{Escape}');
            await waitFor(() => expect(container.querySelector('.dropdown')).toBeNull());
        });
    });

    describe('mixed items', () => {
        it('renders both href and action items in order', async () => {
            const links: Link[] = [hrefLink, actionLink];
            render(<LinksMenu links={links} />);
            await openMenu();
            const items = screen.getAllByRole('menuitem');
            expect(items).toHaveLength(2);
            expect(items[0].tagName).toBe('A');
            expect(items[1].tagName).toBe('BUTTON');
        });
    });
});
